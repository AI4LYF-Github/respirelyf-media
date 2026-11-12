"""Fits a rendered phone screen (an image sequence) onto the plain white phone screen in AI footage, frame by frame.
The white screen is found anew in every frame (no drift); anything on it that isn't white (her thumb) stays in front.
A slow push-in brings the phone up to a readable size, as the film's camera would.
  python fit-screen.py footage.mp4 screen-seq-dir out.mp4 [--debug 10,40,90]"""
import cv2, numpy as np, glob, sys, subprocess
src, seqdir, out = sys.argv[1:4]
debug = [int(x) for x in sys.argv[5].split(',')] if '--debug' in sys.argv else None
W, H = 1920, 1080  # output size: use 1080, 1920 for a 9:16 film
seq = sorted(glob.glob(f'{seqdir}/*.jp*g'))
cap = cv2.VideoCapture(src); frames = []
while True:
    ok, f = cap.read()
    if not ok: break
    frames.append(f)
n = len(frames); fh, fw = frames[0].shape[:2]

def white(f):
    hsv = cv2.cvtColor(f, cv2.COLOR_BGR2HSV)
    return ((hsv[..., 2] > 215) & (hsv[..., 1] < 45)).astype(np.uint8) * 255

def blob(f, prev):
    m = cv2.morphologyEx(white(f), cv2.MORPH_CLOSE, np.ones((5, 5), np.uint8))
    cs, _ = cv2.findContours(m, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_NONE)
    best = None
    for c in cs:
        if cv2.contourArea(c) < fw * fh * 0.01: continue
        x, y, w, h = cv2.boundingRect(c)
        if not (1.4 < h / max(w, 1) < 2.6): continue  # a portrait phone screen
        d = 0 if prev is None else np.linalg.norm(np.array([x + w / 2, y + h / 2]) - prev)
        if best is None or d < best[0]: best = (d, c)
    return None if best is None else best[1].reshape(-1, 2).astype(np.float64)

def edges(pts):
    """The screen's four straight edges, fitted to the outline away from the rounded corners; her thumb's dent in an
    edge is thrown out as an outlier. Returns centre, angle, width, height."""
    (cx, cy), (rw, rh), ang = cv2.minAreaRect(pts.astype(np.float32))
    if rw > rh: rw, rh, ang = rh, rw, ang - 90
    a = np.deg2rad(ang)
    if np.cos(a) < 0: a += np.pi  # keep the screen upright: width axis points right, height axis down
    a = (a + np.pi) % (2 * np.pi) - np.pi
    ux, vy = np.array([np.cos(a), np.sin(a)]), np.array([-np.sin(a), np.cos(a)])
    u, v = (pts - [cx, cy]) @ ux, (pts - [cx, cy]) @ vy
    def side(sel, along, across):
        o = across[sel]
        for _ in range(3):  # fit, drop what strays (the thumb), refit
            med = np.median(o); keep = np.abs(o - med) < 2.0
            o = o[keep] if keep.sum() > 8 else o
        return np.median(o)
    L = side((u < -rw * 0.35) & (np.abs(v) < rh * 0.3), v, u); R = side((u > rw * 0.35) & (np.abs(v) < rh * 0.3), v, u)
    T = side((v < -rh * 0.35) & (np.abs(u) > rw * 0.30) & (np.abs(u) < rw * 0.40), u, v); B = side((v > rh * 0.35) & (np.abs(u) < rw * 0.25), u, v)
    # the top edge is measured on the ears beside the notch, not under it
    c = np.array([cx, cy]) + ux * (L + R) / 2 + vy * (T + B) / 2
    return np.array([c[0], c[1], a, R - L, B - T])

P, prev = [], None
for f in frames:
    b = blob(f, prev)
    P.append(edges(b) if b is not None else P[-1]); prev = P[-1][:2]
P = np.array(P)
def smooth(x, sig):
    k = np.exp(-0.5 * (np.arange(-3 * sig, 3 * sig + 1) / sig) ** 2); k /= k.sum()
    xp = np.pad(x, (len(k) // 2, len(k) // 2), mode='edge'); return np.convolve(xp, k, mode='valid')
cx, cy, ang = smooth(P[:, 0], 1.5), smooth(P[:, 1], 1.5), smooth(np.unwrap(P[:, 2]), 2.5)
sw = np.full(n, np.median(P[:, 3])) * smooth(P[:, 3] / np.median(P[:, 3]), 10)  # size barely changes: smooth it hard
sh_ = np.full(n, np.median(P[:, 4])) * smooth(P[:, 4] / np.median(P[:, 4]), 10)
def quad(i):
    ux, vy = np.array([np.cos(ang[i]), np.sin(ang[i])]), np.array([-np.sin(ang[i]), np.cos(ang[i])])
    c = np.array([cx[i], cy[i]]); hw, hh = sw[i] / 2 * 1.012, sh_[i] / 2 * 1.006  # tuck the edge under the bezel
    return np.float32([c - ux * hw - vy * hh, c + ux * hw - vy * hh, c + ux * hw + vy * hh, c - ux * hw + vy * hh])
Qs = np.array([quad(i) for i in range(n)])
AIM = Qs.mean(axis=(0, 1))  # the push-in heads for where the phone is on average, so the camera doesn't chase her hands

def push(i):  # the camera's slow push-in onto the phone
    u = min(1, max(0, (i / 24 - 0.4) / 3.6)); u = u * u * (3 - 2 * u)
    z = 1 + 0.45 * u; c = AIM * u + np.array([fw / 2, fh / 2]) * (1 - u)
    s = W / fw * z
    return np.float32([[s, 0, W / 2 - c[0] * s], [0, s, H / 2 - c[1] * s]])

sh = cv2.imread(seq[0]).shape
rect = np.float32([[0, 0], [sh[1], 0], [sh[1], sh[0]], [0, sh[0]]])
r = 120; am = np.zeros(sh[:2], np.float32)
cv2.rectangle(am, (r, 0), (sh[1] - r, sh[0]), 1, -1); cv2.rectangle(am, (0, r), (sh[1], sh[0] - r), 1, -1)
for c in ((r, r), (sh[1] - r, r), (r, sh[0] - r), (sh[1] - r, sh[0] - r)): cv2.circle(am, c, r, 1, -1, cv2.LINE_AA)
enc = None if debug else subprocess.Popen(['/opt/homebrew/bin/ffmpeg', '-y', '-v', 'error', '-f', 'rawvideo', '-pix_fmt', 'bgr24', '-s', f'{W}x{H}', '-r', '24', '-i', '-',
    '-c:v', 'libx264', '-crf', '17', '-preset', 'slow', '-pix_fmt', 'yuv420p', out], stdin=subprocess.PIPE)
shots = []
for i, f in enumerate(frames):
    if debug and i not in debug: continue
    A = push(i)
    big = cv2.warpAffine(f, A, (W, H), flags=cv2.INTER_LANCZOS4).astype(np.float32)
    q = cv2.transform(Qs[i].reshape(-1, 1, 2), A).reshape(-1, 2)
    scr = cv2.imread(seq[min(i, len(seq) - 1)]).astype(np.float32)
    M = cv2.getPerspectiveTransform(rect, q)
    ws = cv2.warpPerspective(scr, M, (W, H), flags=cv2.INTER_AREA)
    a = cv2.warpPerspective(am, M, (W, H))
    # her thumb: whatever on the screen isn't white stays in front
    wm = cv2.warpAffine(white(f), A, (W, H)).astype(np.float32) / 255
    wm = cv2.GaussianBlur(cv2.dilate(wm, np.ones((3, 3), np.uint8)), (0, 0), 1.5)
    a = (a * np.maximum(wm, cv2.erode(a, np.ones((25, 25), np.uint8)) * 0))[..., None]
    ws = cv2.GaussianBlur(ws, (0, 0), 1.1) * 0.93 + 9  # the camera's softness; a screen in sunlight reads a little washed
    # glass: a soft diagonal sheen that slides as the phone tilts
    yy, xx = np.mgrid[0:H, 0:W].astype(np.float32)
    cxy = q.mean(0); diag = ((xx - cxy[0]) * 0.8 + (yy - cxy[1]) * 0.6) / max(1.0, np.linalg.norm(q[2] - q[0])) - (ang[i] - ang.mean()) * 3
    sheen = np.exp(-((diag + 0.15) / 0.18) ** 2) * 22 + np.exp(-((diag - 0.35) / 0.06) ** 2) * 8
    ws = ws + sheen[..., None]
    # any of the footage's white screen left just outside ours takes our screen's edge colour, so none peeks through
    qm = np.zeros((H, W), np.uint8); cv2.fillConvexPoly(qm, q.astype(np.int32), 255)
    ring = (cv2.dilate(qm, np.ones((9, 9), np.uint8)) > 0) & (qm == 0)
    a2 = (ring * wm)[..., None].astype(np.float32)
    k = (0, 0); num = cv2.GaussianBlur(ws * a, k, 4); den = cv2.GaussianBlur(a, k, 4)[..., None] + 1e-4
    edge = num / den
    big = big * (1 - a) + ws * a
    big = big * (1 - a2) + edge * a2
    g = np.random.default_rng(i).normal(0, 3.2, (H, W, 1)).astype(np.float32)  # sensor grain, everywhere
    big = np.clip(big + g, 0, 255).astype(np.uint8)
    if debug: shots.append(cv2.resize(big, (960, 540)))
    else: enc.stdin.write(big.tobytes())
if debug: cv2.imwrite(out, np.vstack([np.hstack(shots[j:j + 2]) for j in range(0, len(shots), 2)]))
else: enc.stdin.close(); enc.wait()
print('frames', n, 'size jitter px', np.ptp(sw).round(2), np.ptp(sh_).round(2))
