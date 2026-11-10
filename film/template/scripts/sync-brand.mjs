// Copies the brand icons and logo from @ai4lyf/respirelyf-media (pinned in package.json) into public/brand/, where the
// film reads them with brand() (src/film/brand.ts). public/brand/ is generated and gitignored: never edit it; change the
// brand repo, bump the tag in package.json and run `npm install`.
import { cpSync, existsSync, mkdirSync, readdirSync, rmSync } from 'node:fs';
import { join } from 'node:path';

const src = join('node_modules', '@ai4lyf', 'respirelyf-media', 'brand');
if (!existsSync(src)) {
  console.error('sync-brand: @ai4lyf/respirelyf-media is not installed; run npm install');
  process.exit(1);
}
const out = join('public', 'brand');
rmSync(out, { recursive: true, force: true }); // a clean copy, so an icon removed upstream doesn't linger
mkdirSync(join(out, 'icons'), { recursive: true });
mkdirSync(join(out, 'logo'), { recursive: true });
let n = 0;
for (const group of ['determinants', 'indicators']) {
  for (const f of readdirSync(join(src, 'icons', group))) {
    if (!f.endsWith('.png')) continue;
    cpSync(join(src, 'icons', group, f), join(out, 'icons', f));
    n++;
  }
}
cpSync(join(src, 'logo'), join(out, 'logo'), { recursive: true });
console.log(`sync-brand: ${n} icons and the logo copied into public/brand/`);
