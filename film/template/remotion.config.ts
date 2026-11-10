import { Config } from '@remotion/cli/config';

// Frames are rendered as PNG so gradients, blur and fine type stay crisp before encoding.
Config.setVideoImageFormat('png');
Config.setOverwriteOutput(true);
// WebGL (3D devices, canvas effects) renders on the GPU through ANGLE, not the software renderer.
Config.setChromiumOpenGlRenderer('angle');
Config.setConcurrency(4);
Config.setDelayRenderTimeoutInMilliseconds(120000);
