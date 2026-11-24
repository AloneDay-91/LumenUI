export type ShaderEngine =
  | "prism-shafts"
  | "astral-lobe"
  | "velvet-fold"
  | "hero-dome"
  | "crescent-arc"
  | "ecliptic"
  | "cubic"
  | "flare"
  | "cloudscape"
  | "horizon"
  | "orbital"
  | "cumulus"
  | "mesh"
  | "aura"
  | "dither"
  | "godrays"
  | "glass"
  | "cosmic"
  | "waves"
  | "fluted"
  | "halftone"
  | "ascii"
  | "holographic"
  | "prism"
  | "glitch"
  | "custom"

export type ShaderCategory =
  | "landscapes"
  | "smooth-blends"
  | "noisy-grainy"
  | "dither"
  | "halftone"
  | "ascii-glitch"
  | "glass-light"
  | "cosmic"

export type ShaderConfig = {
  engine: ShaderEngine
  colors: [string, string, string, string]
  speed: number
  scale: number
  distortion: number
  grain: number
  dither: number
  aberration?: number
  blur?: number
  brightness: number
  contrast: number
  vignette: number
  angle: number
  seed: number
  animated: boolean
  customGlsl?: string
}

export type ShaderItem = {
  id: string
  name: string
  description: string
  category: ShaderCategory
  featured?: boolean
  isCustom?: boolean
  createdAt?: number
  config: ShaderConfig
}

export const SHADER_CATEGORIES: {
  id: ShaderCategory | "all" | "custom"
  label: string
}[] = [
  { id: "all", label: "All Shaders" },
  { id: "landscapes", label: "Landscapes & Sky" },
  { id: "glass-light", label: "Glass & Light" },
  { id: "smooth-blends", label: "Smooth Blends" },
  { id: "noisy-grainy", label: "Noisy / Grainy" },
  { id: "halftone", label: "Halftone" },
  { id: "dither", label: "Dither" },
  { id: "ascii-glitch", label: "ASCII & Glitch" },
  { id: "cosmic", label: "Cosmic" },
  { id: "custom", label: "My Shaders" },
]

export const SHADER_ENGINES: {
  id: ShaderEngine
  label: string
  hint: string
}[] = [
  { id: "prism-shafts", label: "Prism Shafts", hint: "Diagonal prism godrays" },
  { id: "astral-lobe", label: "Astral Lobes", hint: "Silky multi-lobe blend" },
  { id: "velvet-fold", label: "Velvet Fold", hint: "Pleated hero curtains" },
  { id: "hero-dome", label: "Hero Dome", hint: "Dark-UI arch & dome glow" },
  { id: "crescent-arc", label: "Crescent Arc", hint: "Planetary horizon rim" },
  { id: "ecliptic", label: "Ecliptic Ring", hint: "Luminous orbital ring" },
  { id: "cubic", label: "Cubic Glass", hint: "Frosted glass grid" },
  { id: "flare", label: "Horizon Flare", hint: "Diagonal light cut" },
  { id: "fluted", label: "Fluted Glass", hint: "Ribbed optical glass" },
  { id: "cloudscape", label: "Oil Cloudscape", hint: "Richter blurred sky" },
  { id: "horizon", label: "Ocean Horizon", hint: "Minimalist misty sea" },
  { id: "orbital", label: "Orbital Limb", hint: "Planetary atmosphere" },
  { id: "cumulus", label: "Cobalt Cumulus", hint: "Sunlit volumetric clouds" },
  { id: "mesh", label: "Astral Mesh", hint: "Organic silk folds" },
  { id: "halftone", label: "Halftone Print", hint: "Dot screen mosaic" },
  { id: "ascii", label: "ASCII Matrix", hint: "Live glyph terminal" },
  { id: "holographic", label: "Holographic", hint: "Iridescent sheen" },
  { id: "prism", label: "Prism Sweep", hint: "Conic light flare" },
  { id: "glitch", label: "Signal Glitch", hint: "Scanlines & RGB split" },
  { id: "aura", label: "Temporal Aura", hint: "Orbital halo mist" },
  { id: "dither", label: "Bayer Dither", hint: "Ordered pixel grain" },
  { id: "godrays", label: "Godrays", hint: "Volumetric light beams" },
  { id: "glass", label: "Liquid Glass", hint: "Refractive 3D caustics" },
  { id: "cosmic", label: "Cosmic Warp", hint: "Nebula turbulence" },
  { id: "waves", label: "Silk Waves", hint: "Interference ribbons" },
  { id: "custom", label: "Custom GLSL", hint: "Write raw fragment code" },
]

export const CURATED_PALETTES: {
  name: string
  colors: [string, string, string, string]
}[] = [
  { name: "Ink Facet", colors: ["#050208", "#2d0a3e", "#d91df5", "#ff9ff3"] },
  { name: "Pewter Fade", colors: ["#2b3c57", "#6f8fb8", "#d97343", "#f1ece6"] },
  { name: "Astral", colors: ["#a8e6ff", "#b59dff", "#ff77c8", "#ffe08a"] },
  { name: "Temporal", colors: ["#0b1320", "#1f6f8b", "#ff7a2f", "#fff1dc"] },
  { name: "Sakura", colors: ["#170c14", "#8a3060", "#f48fb1", "#fff1f5"] },
  { name: "Caustic", colors: ["#04070c", "#0e3b4c", "#38d9e8", "#e8fbff"] },
  { name: "Hologram", colors: ["#0b0c18", "#5b6cf9", "#f472b6", "#67e8f9"] },
  { name: "Solar", colors: ["#18080c", "#b91c1c", "#f97316", "#fef08a"] },
]

export const DEFAULT_CUSTOM_GLSL = `precision highp float;

uniform float u_time;
uniform vec2 u_resolution;
uniform vec3 u_color1;
uniform vec3 u_color2;
uniform vec3 u_color3;
uniform vec3 u_color4;
uniform float u_speed;
uniform float u_scale;
uniform float u_distortion;
uniform float u_grain;
uniform float u_aberration;
uniform float u_brightness;
uniform float u_contrast;
uniform float u_vignette;
uniform float u_angle;
uniform float u_seed;

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;
  vec2 p = (uv - 0.5) * u_scale;
  float t = u_time * u_speed * 0.6 + u_seed;

  float w1 = sin(p.x * 2.4 + t + cos(p.y * 2.1 - t * 0.7) * u_distortion);
  float w2 = cos(p.y * 2.6 - t * 0.8 + sin(p.x * 1.9 + t * 0.5) * u_distortion);
  float blend = clamp(0.5 + 0.5 * (w1 * 0.6 + w2 * 0.4), 0.0, 1.0);

  vec3 col = mix(u_color1, u_color2, smoothstep(0.0, 0.45, blend));
  col = mix(col, u_color3, smoothstep(0.35, 0.78, blend));
  col = mix(col, u_color4, smoothstep(0.68, 1.0, blend));

  float g = (hash(gl_FragCoord.xy + fract(u_time)) - 0.5) * u_grain * 0.28;
  col = (col - 0.5) * u_contrast + 0.5;
  col *= u_brightness;
  col += g;

  float dist = length(uv - 0.5);
  col *= 1.0 - smoothstep(0.35, 1.05, dist) * u_vignette * 0.85;

  gl_FragColor = vec4(clamp(col, 0.0, 1.0), 1.0);
}
`

const GLSL_SHARED_HEADER = `precision highp float;

uniform float u_time;
uniform vec2 u_resolution;
uniform vec3 u_color1;
uniform vec3 u_color2;
uniform vec3 u_color3;
uniform vec3 u_color4;
uniform float u_speed;
uniform float u_scale;
uniform float u_distortion;
uniform float u_grain;
uniform float u_dither;
uniform float u_aberration;
uniform float u_brightness;
uniform float u_contrast;
uniform float u_vignette;
uniform float u_angle;
uniform float u_seed;

mat2 rot2d(float a) {
  float c = cos(a);
  float s = sin(a);
  return mat2(c, -s, s, c);
}

float hash21(vec2 p) {
  p = fract(p * vec2(234.34, 435.345));
  p += dot(p, p + 34.23);
  return fract(p.x * p.y);
}

float vnoise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  float a = hash21(i);
  float b = hash21(i + vec2(1.0, 0.0));
  float c = hash21(i + vec2(0.0, 1.0));
  float d = hash21(i + vec2(1.0, 1.0));
  return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
}

float fbm(vec2 p) {
  float v = 0.0;
  float amp = 0.5;
  mat2 m = mat2(0.8, 0.6, -0.6, 0.8);
  for (int i = 0; i < 5; i++) {
    v += amp * vnoise(p);
    p = m * p * 2.02 + vec2(1.7, 9.2);
    amp *= 0.5;
  }
  return v;
}

float bayer4(vec2 pos) {
  vec2 p = mod(floor(pos), 4.0);
  int x = int(p.x);
  int y = int(p.y);
  int idx = y * 4 + x;
  if (idx == 0) return 0.0 / 16.0;
  if (idx == 1) return 8.0 / 16.0;
  if (idx == 2) return 2.0 / 16.0;
  if (idx == 3) return 10.0 / 16.0;
  if (idx == 4) return 12.0 / 16.0;
  if (idx == 5) return 4.0 / 16.0;
  if (idx == 6) return 14.0 / 16.0;
  if (idx == 7) return 6.0 / 16.0;
  if (idx == 8) return 3.0 / 16.0;
  if (idx == 9) return 11.0 / 16.0;
  if (idx == 10) return 1.0 / 16.0;
  if (idx == 11) return 9.0 / 16.0;
  if (idx == 12) return 15.0 / 16.0;
  if (idx == 13) return 7.0 / 16.0;
  if (idx == 14) return 13.0 / 16.0;
  return 5.0 / 16.0;
}

vec3 palette4(float t) {
  float x = clamp(t, 0.0, 1.0);
  vec3 c = mix(u_color1, u_color2, smoothstep(0.0, 0.38, x));
  c = mix(c, u_color3, smoothstep(0.32, 0.72, x));
  c = mix(c, u_color4, smoothstep(0.66, 1.0, x));
  return c;
}

vec3 finishColor(vec3 col, vec2 uv) {
  if (u_dither > 0.001) {
    float scalePx = mix(1.0, 4.0, u_dither);
    float b = bayer4(gl_FragCoord.xy / scalePx) - 0.5;
    float levels = mix(18.0, 4.0, u_dither);
    vec3 q = floor((col + b / levels) * levels + 0.5) / levels;
    col = mix(col, q, smoothstep(0.0, 0.25, u_dither));
  }

  col = (col - 0.5) * u_contrast + 0.5;
  col *= u_brightness;

  if (u_grain > 0.001) {
    float n = hash21(gl_FragCoord.xy + vec2(fract(u_time * 13.37) * 97.0, u_seed * 19.0)) - 0.5;
    col += n * u_grain * 0.26;
  }

  float dist = length(uv - 0.5);
  col *= 1.0 - smoothstep(0.32, 1.02, dist) * u_vignette * 0.85;
  return clamp(col, 0.0, 1.0);
}
`

const ENGINE_MAIN_BODIES: Record<Exclude<ShaderEngine, "custom">, string> = {
  mesh: `
void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;
  float aspect = u_resolution.x / max(u_resolution.y, 1.0);
  vec2 p = (uv - 0.5) * vec2(aspect, 1.0);
  p = rot2d(u_angle) * p * u_scale;

  float t = u_time * u_speed * 0.28 + u_seed * 2.17;
  vec2 q = vec2(
    fbm(p * 1.15 + vec2(0.0, t * 0.55)),
    fbm(p * 1.15 + vec2(5.2, -t * 0.48))
  );
  vec2 r = vec2(
    fbm(p * 1.35 + u_distortion * 1.55 * (q - 0.5) + vec2(1.7, 9.2) + t * 0.3),
    fbm(p * 1.35 + u_distortion * 1.55 * (q - 0.5) + vec2(8.3, 2.8) - t * 0.24)
  );
  float f = fbm(p * 1.1 + u_distortion * 1.45 * (r - 0.5));

  vec2 w = uv + (r - 0.5) * 0.65 * u_distortion;
  float w1 = smoothstep(0.15, 0.85, w.x * 0.7 + f * 0.55);
  float w2 = smoothstep(0.18, 0.88, w.y * 0.65 + (1.0 - w.x) * 0.35 + (q.x - 0.5) * 0.7);
  float w3 = smoothstep(0.32, 0.92, (1.0 - w.y) * 0.55 + r.y * 0.65);

  vec3 col = mix(u_color1, u_color2, w1);
  col = mix(col, u_color3, w2 * 0.75);
  col = mix(col, u_color4, w3 * 0.68);

  if (u_aberration > 0.001) {
    float shift = u_aberration * 0.08;
    float fR = fbm((p + vec2(shift, 0.0)) * 1.1 + u_distortion * 1.45 * (r - 0.5));
    float fB = fbm((p - vec2(shift, 0.0)) * 1.1 + u_distortion * 1.45 * (r - 0.5));
    col.r = mix(col.r, mix(u_color1.r, u_color4.r, smoothstep(0.2, 0.85, fR)), u_aberration * 0.45);
    col.b = mix(col.b, mix(u_color1.b, u_color3.b, smoothstep(0.2, 0.85, fB)), u_aberration * 0.45);
  }

  gl_FragColor = vec4(finishColor(col, uv), 1.0);
}
`,

  fluted: `
vec3 sampleFlutedLight(vec2 p, float t) {
  vec2 q = vec2(
    fbm(p * 1.2 + vec2(t * 0.25, -t * 0.18)),
    fbm(p * 1.2 + vec2(4.1, 2.7) + vec2(-t * 0.22, t * 0.24))
  );
  float dist = length(p * vec2(0.95, 1.15) + (q - 0.5) * 0.55 * u_distortion);
  float beam = exp(-dist * dist * 3.4);
  float crossGlow = exp(-pow(p.y + (q.x - 0.5) * 0.45, 2.0) * 5.2) * exp(-abs(p.x) * 1.4);
  float vertGlow = exp(-pow(p.x + (q.y - 0.5) * 0.4, 2.0) * 5.5) * exp(-abs(p.y) * 1.2);
  float halo = clamp(beam * 0.85 + crossGlow * 0.6 + vertGlow * 0.55 + q.x * 0.22, 0.0, 1.0);

  vec3 col = mix(u_color1, u_color2, smoothstep(0.04, 0.45, halo));
  col = mix(col, u_color3, smoothstep(0.32, 0.78, halo));
  col = mix(col, u_color4, smoothstep(0.68, 1.05, halo));
  return col;
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;
  float aspect = u_resolution.x / max(u_resolution.y, 1.0);
  vec2 p = (uv - 0.5) * vec2(aspect, 1.0);
  vec2 rp = rot2d(u_angle) * p;

  float t = u_time * u_speed * 0.4 + u_seed * 2.3;
  float ribCount = clamp(16.0 * u_scale, 8.0, 64.0);
  float ribPhase = rp.x * ribCount;
  float ribLocal = fract(ribPhase) - 0.5;

  // Cylindrical glass refraction offset per rib
  float refractAmt = sin(ribLocal * 6.2831853) * (0.045 * u_distortion);
  float lensCurve = cos(ribLocal * 3.1415926);
  float edgeLine = pow(1.0 - clamp(lensCurve, 0.0, 1.0), 3.0);
  float specSheen = pow(clamp(sin((ribLocal + 0.22) * 3.1415926), 0.0, 1.0), 8.0);

  vec2 refracted = rp + vec2(refractAmt, refractAmt * 0.18);
  float ab = max(u_aberration, 0.18) * 0.032;

  vec3 colR = sampleFlutedLight(refracted + vec2(ab, 0.0), t);
  vec3 colG = sampleFlutedLight(refracted, t);
  vec3 colB = sampleFlutedLight(refracted - vec2(ab, 0.0), t);
  vec3 col = vec3(colR.r, colG.g, colB.b);

  // Subtle architectural groove shadow + specular highlight along each flute
  col *= 1.0 - edgeLine * 0.32;
  col += u_color4 * specSheen * (0.1 + 0.16 * length(col));

  gl_FragColor = vec4(finishColor(col, uv), 1.0);
}
`,

  halftone: `
float halftoneField(vec2 p, float t) {
  vec2 q = vec2(
    fbm(p * 1.15 + vec2(t * 0.24, -t * 0.2)),
    fbm(p * 1.15 + vec2(3.7, 8.1) - vec2(t * 0.2, t * 0.18))
  );
  float n = fbm(p * 1.3 + (q - 0.5) * 1.55 * u_distortion);
  float radial = 1.0 - smoothstep(0.08, 0.95, length(p * 0.85 + (q - 0.5) * 0.45));
  return clamp(n * 0.62 + radial * 0.52, 0.0, 1.0);
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;
  float aspect = u_resolution.x / max(u_resolution.y, 1.0);
  vec2 p = (uv - 0.5) * vec2(aspect, 1.0);
  float t = u_time * u_speed * 0.35 + u_seed * 2.9;

  // Rotated print halftone grid
  float gridAngle = u_angle + 0.35;
  float density = clamp(32.0 * u_scale, 14.0, 96.0);
  vec2 gUv = rot2d(gridAngle) * p * density;
  vec2 cellId = floor(gUv);
  vec2 cellLocal = fract(gUv) - 0.5;
  vec2 cellCenter = rot2d(-gridAngle) * ((cellId + 0.5) / density);

  float field = halftoneField(cellCenter * 1.25, t);
  float ab = u_aberration * 0.05;

  float fieldR = halftoneField((cellCenter + vec2(ab, 0.0)) * 1.25, t);
  float fieldB = halftoneField((cellCenter - vec2(ab, 0.0)) * 1.25, t);

  float distDot = length(cellLocal);
  float aa = 0.055;
  float radiusG = clamp(sqrt(field) * 0.54, 0.04, 0.52);
  float radiusR = clamp(sqrt(fieldR) * 0.54, 0.04, 0.52);
  float radiusB = clamp(sqrt(fieldB) * 0.54, 0.04, 0.52);

  float dotR = 1.0 - smoothstep(radiusR - aa, radiusR + aa, distDot);
  float dotG = 1.0 - smoothstep(radiusG - aa, radiusG + aa, distDot);
  float dotB = 1.0 - smoothstep(radiusB - aa, radiusB + aa, distDot);

  vec3 fg = mix(u_color2, u_color3, smoothstep(0.15, 0.72, field));
  fg = mix(fg, u_color4, smoothstep(0.58, 0.96, field));

  vec3 bg = mix(u_color1, u_color2 * 0.38, smoothstep(0.25, 0.95, field));
  vec3 dotMask = vec3(dotR, dotG, dotB);
  vec3 col = mix(bg, fg, dotMask);

  gl_FragColor = vec4(finishColor(col, uv), 1.0);
}
`,

  ascii: `
float asciiGlyph(vec2 local, float level) {
  // 5x5 glyph inside a 6x6 cell (1 unit margin between characters)
  vec2 g = floor(local * 6.0);
  if (g.x >= 5.0 || g.y >= 5.0) return 0.0;
  float x = g.x;
  float y = g.y;

  if (level < 0.14) return 0.0;
  // '.'
  if (level < 0.27) {
    return (x == 2.0 && y == 1.0) ? 1.0 : 0.0;
  }
  // ':'
  if (level < 0.40) {
    return (x == 2.0 && (y == 1.0 || y == 3.0)) ? 1.0 : 0.0;
  }
  // '-'
  if (level < 0.53) {
    return (y == 2.0 && x >= 1.0 && x <= 3.0) ? 1.0 : 0.0;
  }
  // '+'
  if (level < 0.66) {
    return ((y == 2.0 && x >= 1.0 && x <= 3.0) || (x == 2.0 && y >= 1.0 && y <= 3.0)) ? 1.0 : 0.0;
  }
  // 'x'
  if (level < 0.79) {
    return ((abs(x - y) < 0.5 || abs(x + y - 4.0) < 0.5) && x >= 1.0 && x <= 3.0) ? 1.0 : 0.0;
  }
  // '#'
  if (level < 0.91) {
    return (x == 1.0 || x == 3.0 || y == 1.0 || y == 3.0) ? 1.0 : 0.0;
  }
  // '@'
  bool border = (x == 0.0 || x == 4.0 || y == 0.0 || y == 4.0);
  bool core = (x == 2.0 && y == 2.0);
  return (border || core) ? 1.0 : 0.0;
}

float causticField(vec2 p, float t) {
  vec2 w1 = p * 2.2 + vec2(sin(p.y * 2.5 + t), cos(p.x * 2.3 - t * 0.8)) * 0.45 * u_distortion;
  float c1 = 1.0 - abs(fbm(w1 + vec2(t * 0.28, -t * 0.22)) * 2.0 - 1.0);
  float c2 = 1.0 - abs(fbm(w1 * 1.45 - vec2(t * 0.2, t * 0.31) + 4.3) * 2.0 - 1.0);
  float caustic = pow(clamp(c1 * 0.6 + c2 * 0.55, 0.0, 1.0), 1.85);
  float wave = 0.5 + 0.5 * sin(p.x * 3.0 + p.y * 2.2 - t * 1.1 + fbm(p * 1.5) * 3.0 * u_distortion);
  return clamp(caustic * 0.8 + wave * 0.35, 0.0, 1.0);
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;
  float aspect = u_resolution.x / max(u_resolution.y, 1.0);
  float t = u_time * u_speed * 0.55 + u_seed * 3.4;

  float cols = clamp(44.0 * u_scale, 22.0, 108.0);
  vec2 grid = vec2(cols * aspect, cols);
  vec2 cell = floor(uv * grid);
  vec2 local = fract(uv * grid);

  vec2 sampleUv = (cell + 0.5) / grid;
  vec2 p = rot2d(u_angle) * ((sampleUv - 0.5) * vec2(aspect, 1.0));

  float ab = max(u_aberration, 0.12) * 0.035;
  float lumR = causticField(p + vec2(ab, 0.0), t);
  float lumG = causticField(p, t);
  float lumB = causticField(p - vec2(ab, 0.0), t);

  float gR = asciiGlyph(local, lumR);
  float gG = asciiGlyph(local, lumG);
  float gB = asciiGlyph(local, lumB);

  vec3 tint = mix(u_color2, u_color3, smoothstep(0.18, 0.72, lumG));
  tint = mix(tint, u_color4, smoothstep(0.65, 1.0, lumG));

  vec3 bg = mix(u_color1, u_color2 * 0.24, lumG * 0.8);
  vec3 glyphCol = vec3(gR, gG, gB) * tint * (0.65 + 0.65 * lumG);

  // Subtle terminal scanline shimmer
  float scan = 0.92 + 0.08 * sin(gl_FragCoord.y * 1.8);
  vec3 col = (bg + glyphCol) * scan;

  gl_FragColor = vec4(finishColor(col, uv), 1.0);
}
`,

  holographic: `
void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;
  float aspect = u_resolution.x / max(u_resolution.y, 1.0);
  vec2 p = (uv - 0.5) * vec2(aspect, 1.0);
  p = rot2d(u_angle) * p * u_scale * 1.15;

  float t = u_time * u_speed * 0.36 + u_seed * 2.1;
  vec2 q = vec2(
    fbm(p * 1.2 + vec2(t * 0.28, -t * 0.22)),
    fbm(p * 1.2 + vec2(6.3, 1.9) + vec2(-t * 0.25, t * 0.3))
  );
  vec2 r = vec2(
    fbm(p * 1.5 + (q - 0.5) * 2.0 * u_distortion + vec2(t * 0.18, 2.4)),
    fbm(p * 1.5 + (q - 0.5) * 2.0 * u_distortion + vec2(5.1, -t * 0.16))
  );

  float phase = (r.x * 2.8 + r.y * 2.1 + p.x * 0.65 - p.y * 0.55) * 3.14159;
  // Thin-film spectral interference rings
  vec3 irid = 0.5 + 0.5 * cos(phase + vec3(0.0, 2.094, 4.188) + u_aberration * 1.8);
  float contour = pow(0.5 + 0.5 * sin(phase * 1.5), 4.0);

  vec3 base = palette4(clamp(r.x * 0.55 + q.y * 0.45, 0.0, 1.0));
  vec3 sheen = mix(u_color3, u_color4, irid.r) * 0.55 + mix(u_color2, u_color4, irid.b) * 0.45;

  vec3 col = mix(base, sheen, 0.58 + 0.22 * irid.g);
  col += u_color4 * contour * 0.22;

  gl_FragColor = vec4(finishColor(col, uv), 1.0);
}
`,

  prism: `
vec3 samplePrism(vec2 p, float t) {
  float rad = length(p);
  float ang = atan(p.y, p.x);

  float twist = ang + (0.9 - smoothstep(0.0, 1.25, rad)) * u_distortion * 1.35 + t * 0.45;
  float conic = fract(twist / 6.2831853 + 0.5);
  float sweep = smoothstep(0.0, 0.55, conic) * (1.0 - smoothstep(0.72, 1.0, conic));

  float n = fbm(vec2(cos(twist), sin(twist)) * (1.4 * u_scale) + rad * 1.5 - t * 0.25);
  float flare = exp(-rad * rad * (14.0 / max(u_scale, 0.45)));
  float streak = exp(-abs(p.y) * 9.0) * exp(-abs(p.x) * 1.6) * 0.65;

  vec3 col = mix(u_color1, u_color2, clamp(sweep * 0.9 + n * 0.25, 0.0, 1.0));
  col = mix(col, u_color3, smoothstep(0.32, 0.92, sweep * (0.75 + 0.45 * n)));
  col += u_color4 * clamp(flare * 1.1 + streak * 0.75, 0.0, 1.2);
  return col;
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;
  float aspect = u_resolution.x / max(u_resolution.y, 1.0);
  vec2 p = (uv - 0.5) * vec2(aspect, 1.0);
  p = rot2d(u_angle) * p;

  float t = u_time * u_speed * 0.42 + u_seed * 2.5;
  float ab = max(u_aberration, 0.16) * 0.045;
  vec2 dir = normalize(p + vec2(0.0001));

  vec3 cR = samplePrism(p + dir * ab, t);
  vec3 cG = samplePrism(p, t);
  vec3 cB = samplePrism(p - dir * ab, t);
  vec3 col = vec3(cR.r, cG.g, cB.b);

  gl_FragColor = vec4(finishColor(col, uv), 1.0);
}
`,

  glitch: `
vec3 sampleSignal(vec2 uv, float t) {
  float barId = floor(uv.x * (10.0 * u_scale));
  float barNoise = hash21(vec2(barId, floor(t * 2.0) + u_seed));
  float wave = fbm(uv * vec2(3.5, 1.8) * u_scale + vec2(t * 0.4, -t * 0.2));
  float glow = smoothstep(0.15, 0.85, wave * 0.65 + barNoise * 0.45);
  float band = smoothstep(0.2, 0.85, sin(uv.x * 14.0 * u_scale + t * 1.2 + wave * 3.0) * 0.5 + 0.5);

  vec3 col = mix(u_color1, u_color2, glow);
  col = mix(col, u_color3, band * glow * 0.9);
  col = mix(col, u_color4, smoothstep(0.74, 0.98, glow * band + barNoise * 0.25));
  return col;
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;
  float t = u_time * u_speed * 0.9 + u_seed * 4.1;

  // Stepped horizontal glitch slices
  float slice = floor(uv.y * (26.0 * u_scale));
  float sliceTick = floor(t * 5.0);
  float rnd = hash21(vec2(slice, sliceTick));
  float glitchTrigger = step(0.76 - 0.14 * clamp(u_distortion, 0.0, 2.0), rnd);
  float tear = (hash21(vec2(slice + 19.3, sliceTick)) - 0.5) * 0.18 * u_distortion * glitchTrigger;

  vec2 guv = vec2(fract(uv.x + tear), uv.y);
  float ab = (0.012 + max(u_aberration, 0.25) * 0.025) * (1.0 + glitchTrigger * 1.8);

  vec3 cR = sampleSignal(guv + vec2(ab, 0.0), t);
  vec3 cG = sampleSignal(guv, t);
  vec3 cB = sampleSignal(guv - vec2(ab, 0.0), t);
  vec3 col = vec3(cR.r, cG.g, cB.b);

  // Fine CRT scanlines + subtle vertical sync flicker
  float scan = 0.88 + 0.12 * sin(gl_FragCoord.y * 2.2);
  col *= scan;

  gl_FragColor = vec4(finishColor(col, uv), 1.0);
}
`,

  aura: `
void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;
  float aspect = u_resolution.x / max(u_resolution.y, 1.0);
  vec2 p = (uv - 0.5) * vec2(aspect, 1.0);
  p = rot2d(u_angle) * p;

  float t = u_time * u_speed * 0.38 + u_seed * 3.1;
  float rad = length(p);
  float ang = atan(p.y, p.x);

  float swirl = ang + (1.1 - smoothstep(0.0, 1.0, rad)) * u_distortion * 1.45 + t * 0.5;
  vec2 warped = vec2(cos(swirl), sin(swirl)) * rad * u_scale;

  float haloNoise = fbm(warped * 1.4 + vec2(t * 0.25, -t * 0.2));
  float ring = exp(-pow((rad - 0.32 - (haloNoise - 0.5) * 0.14) * 3.4, 2.0));
  float core = exp(-rad * rad * (11.0 / max(u_scale, 0.4)));
  float topArc = smoothstep(-0.35, 0.65, sin(ang - 0.8 + t * 0.35 + (haloNoise - 0.5) * 2.0));
  float bottomArc = 1.0 - topArc;
  float outer = smoothstep(0.88, 0.18, rad + (haloNoise - 0.5) * 0.28);

  vec3 col = u_color1;
  col = mix(col, u_color2, outer * (0.45 + 0.55 * bottomArc));
  col = mix(col, u_color3, clamp(ring * (0.35 + 0.9 * topArc), 0.0, 1.0));
  col = mix(col, u_color4, clamp(core * 0.85, 0.0, 1.0));

  gl_FragColor = vec4(finishColor(col, uv), 1.0);
}
`,

  dither: `
void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;
  float aspect = u_resolution.x / max(u_resolution.y, 1.0);
  vec2 p = (uv - 0.5) * vec2(aspect, 1.0);
  p = rot2d(u_angle) * p * u_scale;

  float t = u_time * u_speed * 0.32 + u_seed * 1.9;
  float n1 = fbm(p * 0.9 + vec2(t * 0.3, -t * 0.25));
  float n2 = fbm(p * 1.6 + vec2(n1 * u_distortion * 1.4, t * 0.2));
  float field = clamp(uv.y * 0.55 + n2 * 0.65 + sin(p.x * 1.4 + t) * 0.12 * u_distortion, 0.0, 1.0);

  vec3 col = mix(u_color1, u_color2, smoothstep(0.0, 0.38, field));
  col = mix(col, u_color3, smoothstep(0.32, 0.72, field));
  col = mix(col, u_color4, smoothstep(0.65, 1.0, field));

  float dStrength = max(u_dither, 0.42);
  float px = mix(2.0, 5.0, dStrength);
  float b = bayer4(gl_FragCoord.xy / px) - 0.5;
  float steps = mix(9.0, 3.0, dStrength);
  vec3 dithered = floor((col + b / steps) * steps + 0.5) / steps;
  col = mix(col, dithered, 0.88);

  col = (col - 0.5) * u_contrast + 0.5;
  col *= u_brightness;
  if (u_grain > 0.001) {
    float g = hash21(gl_FragCoord.xy + vec2(fract(u_time * 11.1) * 73.0, u_seed)) - 0.5;
    col += g * u_grain * 0.22;
  }
  float dist = length(uv - 0.5);
  col *= 1.0 - smoothstep(0.38, 1.05, dist) * u_vignette * 0.75;

  gl_FragColor = vec4(clamp(col, 0.0, 1.0), 1.0);
}
`,

  godrays: `
void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;
  float aspect = u_resolution.x / max(u_resolution.y, 1.0);
  vec2 p = (uv - 0.5) * vec2(aspect, 1.0);
  vec2 rp = rot2d(u_angle + 0.38) * p;

  float t = u_time * u_speed * 0.35 + u_seed * 4.2;
  vec2 origin = vec2(0.0, 0.82);
  vec2 toP = rp - origin;
  float rayAngle = atan(toP.x, -toP.y);
  float rayDist = length(toP);

  float beam1 = fbm(vec2(rayAngle * 4.5 * u_scale, rayDist * 0.6 - t * 0.4));
  float beam2 = fbm(vec2(rayAngle * 8.5 * u_scale + 3.1, rayDist * 0.9 - t * 0.65));
  float shafts = pow(clamp(beam1 * 0.65 + beam2 * 0.55, 0.0, 1.0), 1.65);

  float shift = 0.06 * (u_distortion + u_aberration);
  float shaftsWarm = pow(clamp(fbm(vec2((rayAngle + shift) * 4.8 * u_scale, rayDist * 0.65 - t * 0.42)), 0.0, 1.0), 1.5);
  float falloff = exp(-rayDist * 1.15);

  vec3 col = mix(u_color1, u_color2, clamp(falloff * 1.1 + shafts * 0.35, 0.0, 1.0));
  col = mix(col, u_color3, clamp(shafts * falloff * 1.55, 0.0, 1.0));
  col += u_color4 * pow(clamp(shaftsWarm * falloff * 1.25, 0.0, 1.0), 1.4) * 0.85;

  gl_FragColor = vec4(finishColor(col, uv), 1.0);
}
`,

  glass: `
float glassHeight(vec2 p, float t) {
  vec2 w = vec2(
    fbm(p * 1.1 + vec2(t * 0.25, -t * 0.2)),
    fbm(p * 1.1 + vec2(-t * 0.22, t * 0.27) + vec2(4.2, 1.9))
  );
  float h = fbm(p * 1.25 + w * u_distortion * 1.35);
  h += 0.22 * sin(p.x * 2.8 + w.y * 4.0 + t);
  return h;
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;
  float aspect = u_resolution.x / max(u_resolution.y, 1.0);
  vec2 p = (uv - 0.5) * vec2(aspect, 1.0);
  p = rot2d(u_angle) * p * u_scale * 1.25;

  float t = u_time * u_speed * 0.42 + u_seed * 2.7;
  float eps = 0.018;
  float h = glassHeight(p, t);
  float hx = glassHeight(p + vec2(eps, 0.0), t);
  float hy = glassHeight(p + vec2(0.0, eps), t);

  vec3 normal = normalize(vec3((h - hx) * 7.5, (h - hy) * 7.5, 1.0));
  vec3 lightDir1 = normalize(vec3(0.55, 0.72, 0.65));
  vec3 lightDir2 = normalize(vec3(-0.65, -0.35, 0.55));
  vec3 viewDir = vec3(0.0, 0.0, 1.0);

  float diff1 = max(dot(normal, lightDir1), 0.0);
  float diff2 = max(dot(normal, lightDir2), 0.0);
  float spec = pow(max(dot(reflect(-lightDir1, normal), viewDir), 0.0), 26.0);
  float fresnel = pow(1.0 - max(dot(normal, viewDir), 0.0), 2.4);

  vec3 refracted = mix(u_color1, u_color2, smoothstep(0.15, 0.85, h + normal.x * 0.35));
  refracted = mix(refracted, u_color3, smoothstep(0.25, 0.9, diff1 * 0.7 + normal.y * 0.45));
  refracted = mix(refracted, u_color4, clamp(fresnel * 0.8 + diff2 * 0.35, 0.0, 1.0));
  vec3 col = refracted + u_color4 * spec * 0.85;

  gl_FragColor = vec4(finishColor(col, uv), 1.0);
}
`,

  cosmic: `
void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;
  float aspect = u_resolution.x / max(u_resolution.y, 1.0);
  vec2 p = (uv - 0.5) * vec2(aspect, 1.0);
  p = rot2d(u_angle) * p * u_scale * 1.15;

  float t = u_time * u_speed * 0.24 + u_seed * 5.3;
  vec2 q = vec2(fbm(p + t * 0.2), fbm(p + vec2(3.4, 7.1) - t * 0.18));
  float turb = fbm(p * 1.8 + q * (1.8 * u_distortion));
  float ridge = 1.0 - abs(turb * 2.0 - 1.0);
  float filament = pow(clamp(ridge, 0.0, 1.0), 3.2);

  float nebula = smoothstep(0.22, 0.85, turb);
  vec3 col = mix(u_color1, u_color2, nebula);
  col = mix(col, u_color3, clamp(filament * 1.15, 0.0, 1.0));
  col += u_color4 * pow(filament, 2.2) * 0.9;

  vec2 starGrid = floor(gl_FragCoord.xy * 0.35);
  float starVal = hash21(starGrid + u_seed);
  float twinkle = 0.5 + 0.5 * sin(u_time * (1.5 + starVal * 3.0) + starVal * 40.0);
  float star = smoothstep(0.9965, 1.0, starVal) * twinkle * 0.75;
  col += u_color4 * star;

  gl_FragColor = vec4(finishColor(col, uv), 1.0);
}
`,

  waves: `
void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;
  float aspect = u_resolution.x / max(u_resolution.y, 1.0);
  vec2 p = (uv - 0.5) * vec2(aspect, 1.0);
  p = rot2d(u_angle) * p * u_scale;

  float t = u_time * u_speed * 0.55 + u_seed * 2.4;
  float y = p.y;
  float acc = 0.0;
  for (int i = 1; i <= 5; i++) {
    float fi = float(i);
    float wave = sin(p.x * (1.6 + fi * 0.65) + t * (0.45 + fi * 0.14) + fbm(p * 0.9 + fi) * u_distortion * 1.8);
    y += wave * (0.14 / fi) * u_distortion;
    acc += smoothstep(0.18, 0.0, abs(y - (fi - 3.0) * 0.16)) * (0.35 + 0.12 * fi);
  }

  float grad = clamp(y * 0.65 + 0.5, 0.0, 1.0);
  vec3 col = mix(u_color1, u_color2, smoothstep(0.0, 0.5, grad));
  col = mix(col, u_color3, smoothstep(0.45, 0.92, grad));
  col = mix(col, u_color4, clamp(acc * 0.72, 0.0, 1.0));

  gl_FragColor = vec4(finishColor(col, uv), 1.0);
}
`,

  cloudscape: `
float softCloud(vec2 p, float t) {
  vec2 q = vec2(
    fbm(p * vec2(0.95, 1.85) + vec2(t * 0.14, 0.0)),
    fbm(p * vec2(0.95, 1.85) + vec2(4.2 - t * 0.1, 2.7))
  );
  return fbm(p * vec2(1.1, 2.05) + (q - 0.5) * 1.15 * u_distortion + vec2(t * 0.08, 0.0));
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;
  float aspect = u_resolution.x / max(u_resolution.y, 1.0);
  vec2 p = (uv - 0.5) * vec2(aspect, 1.0) * u_scale;
  p = rot2d(u_angle * 0.2) * p;
  float t = u_time * u_speed * 0.25 + u_seed * 2.13;

  // Painterly horizontal sfumato stroke offset
  float stroke = (fbm(vec2(uv.x * 5.0 + u_seed, uv.y * 58.0)) - 0.5) * 0.018 * u_distortion;
  vec2 sp = p + vec2(stroke * 2.2, stroke * 0.4);

  // Soft sky gradient fading into misty rose/pearl horizon
  float horizonY = 0.14;
  float skyHeight = smoothstep(horizonY, 0.92, uv.y);
  vec3 sky = mix(u_color3, u_color2, pow(skyHeight, 0.7));

  // Layered soft blurred clouds (Richter oil style)
  float c1 = softCloud(sp + vec2(0.0, 0.35), t);
  float c2 = softCloud(sp + vec2(0.07, 0.29), t);
  float cloudMask = smoothstep(0.38, 0.76, c1) * smoothstep(horizonY + 0.04, 0.42, uv.y);
  float sunlit = clamp((c1 - c2) * 3.4 + 0.55, 0.0, 1.0);
  vec3 cloudCol = mix(u_color3, u_color4, sunlit);
  vec3 col = mix(sky, cloudCol, cloudMask * 0.88);

  // Warm atmospheric mist band right above the horizon
  float mistBand = exp(-pow((uv.y - (horizonY + 0.06)) * 6.5, 2.0));
  col = mix(col, mix(u_color3, u_color4, 0.45), mistBand * 0.55);

  // Blurred muted olive/sage ground or calm sea strip at the bottom
  float groundWave = (fbm(vec2(uv.x * 3.2 + u_seed, uv.y * 18.0)) - 0.5) * 0.035;
  float groundMask = 1.0 - smoothstep(horizonY - 0.06, horizonY + 0.05, uv.y + groundWave);
  vec3 groundCol = mix(u_color1 * 0.82, u_color1 * 1.15, fbm(vec2(uv.x * 4.5 + t * 0.05, uv.y * 28.0 + u_seed)));
  col = mix(col, groundCol, groundMask);

  // Subtle fine canvas weave + horizontal oil brush sheen
  float brush = (fbm(vec2(uv.x * 9.0, uv.y * 95.0 + u_seed)) - 0.5) * 0.045;
  float weave = (sin(gl_FragCoord.x * 1.3) * sin(gl_FragCoord.y * 1.3)) * 0.012;
  col += brush + weave;

  gl_FragColor = vec4(finishColor(col, uv), 1.0);
}
`,

  horizon: `
void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;
  float aspect = u_resolution.x / max(u_resolution.y, 1.0);
  float t = u_time * u_speed * 0.35 + u_seed * 1.7;
  float horizonY = 0.34 + sin(u_angle) * 0.08;

  // Serene sky with soft off-center daylight glow fading into misty horizon
  float skyT = clamp((uv.y - horizonY) / max(1.0 - horizonY, 0.001), 0.0, 1.0);
  vec3 skyBase = mix(u_color4, u_color3, smoothstep(0.0, 0.48, skyT));
  skyBase = mix(skyBase, u_color2, smoothstep(0.28, 1.0, skyT * 0.85 + uv.x * 0.42));

  // Soft sunlit atmospheric haze on the left
  float sunGlow = exp(-length((uv - vec2(0.18, horizonY + 0.14)) * vec2(aspect * 0.75, 1.25)) * 1.9);
  skyBase = mix(skyBase, u_color4, sunGlow * 0.42);

  // True 2.5D perspective ocean plane below horizon
  float seaDepth = max(horizonY - uv.y, 0.0005);
  float z = 0.16 / (seaDepth + 0.014);
  vec2 waterUv = vec2((uv.x - 0.5) * aspect * z * 1.45 * u_scale, z * 1.35 * u_scale);

  float w1 = fbm(waterUv * vec2(1.4, 2.2) + vec2(t * 0.22, -t * 0.55));
  float w2 = fbm(waterUv * vec2(2.8, 4.4) + vec2(-t * 0.18, -t * 0.8) + vec2(3.1, 7.4));
  float ripple = (w1 * 0.65 + w2 * 0.35) - 0.5;

  float seaGrad = smoothstep(0.0, horizonY, horizonY - uv.y);
  vec3 seaCol = mix(u_color3 * 0.92, u_color1, pow(seaGrad, 0.58));
  // Subtle perspective shimmer + side daylight gradient
  seaCol += ripple * (0.11 * u_distortion) * smoothstep(0.0, 0.16, seaDepth) * mix(u_color4, u_color3, 0.5);
  seaCol = mix(seaCol, u_color4, (1.0 - seaGrad) * 0.55 * (1.0 - uv.x * 0.45));

  // Atmospheric mist softening the exact horizon seam
  float above = smoothstep(horizonY - 0.006, horizonY + 0.006, uv.y);
  vec3 col = mix(seaCol, skyBase, above);
  float seamMist = exp(-pow((uv.y - horizonY) * 14.0, 2.0));
  col = mix(col, u_color4, seamMist * 0.48);

  gl_FragColor = vec4(finishColor(col, uv), 1.0);
}
`,

  orbital: `
vec3 sampleOrbital(vec2 rp, float t) {
  // Giant planetary curvature centered off bottom-left
  float radius = 2.05 / max(u_scale * 0.72, 0.45);
  vec2 center = vec2(-radius - 0.06, -0.18);
  vec2 delta = rp - center;
  float dist = length(delta);
  float alt = dist - radius;
  float arcAng = atan(delta.y, delta.x);

  // Subtle cloud-top turbulence along the orange troposphere
  float clouds = fbm(vec2(arcAng * 22.0 + t * 0.12, alt * 26.0 + u_seed));
  float wisps = fbm(vec2(arcAng * 44.0 - t * 0.08, alt * 48.0 + u_seed * 2.0));

  // Earth shadow below limb
  float abovePlanet = smoothstep(-0.012, 0.014, alt);

  // Fiery burnt-orange troposphere band hugging the curved limb
  float orangeBand = exp(-pow((alt - 0.022) * 34.0, 2.0)) * (0.78 + 0.42 * clouds);
  float orangeInner = exp(-pow((alt - 0.044) * 26.0, 2.0)) * (0.65 + 0.35 * wisps);

  // Blinding white Rayleigh scatter horizon peak
  float whitePeak = exp(-pow((alt - 0.072) * 20.0, 2.0));

  // Deep cobalt atmosphere decaying smoothly into pitch black space
  float blueAtmo = smoothstep(0.035, 0.12, alt) * exp(-max(alt - 0.09, 0.0) * (5.2 / max(u_distortion, 0.45)));
  float outerHalo = smoothstep(0.06, 0.22, alt) * exp(-max(alt - 0.12, 0.0) * 3.1);

  vec3 col = u_color1;
  col += u_color3 * (blueAtmo * 1.15 + outerHalo * 0.38);
  col = mix(col, u_color2, clamp(orangeBand * 1.15 + orangeInner * 0.55, 0.0, 1.0));
  col += u_color4 * clamp(whitePeak * 1.25 + orangeInner * 0.25, 0.0, 1.35);

  // Crisp night-side planetary eclipse mask
  col *= abovePlanet;
  // Soft radial lens falloff into deep space at outer corners
  float spaceFade = 1.0 - smoothstep(0.32, 0.92, length(rp - vec2(-0.04, 0.04)));
  col *= mix(1.0, spaceFade, 0.72);
  return col;
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;
  float aspect = u_resolution.x / max(u_resolution.y, 1.0);
  vec2 p = (uv - 0.5) * vec2(aspect, 1.0);
  vec2 rp = rot2d(u_angle) * p;
  float t = u_time * u_speed * 0.3 + u_seed * 1.9;

  float ab = u_aberration * 0.016;
  vec3 col;
  if (ab > 0.0005) {
    col.r = sampleOrbital(rp + vec2(ab, 0.0), t).r;
    col.g = sampleOrbital(rp, t).g;
    col.b = sampleOrbital(rp - vec2(ab, 0.0), t).b;
  } else {
    col = sampleOrbital(rp, t);
  }

  gl_FragColor = vec4(finishColor(col, uv), 1.0);
}
`,

  cumulus: `
float cumulusDensity(vec2 p, float t) {
  vec2 q = p * vec2(1.45, 1.75) * u_scale + vec2(t * 0.16, 0.0);
  float base = fbm(q + vec2(u_seed, u_seed * 0.5));
  float puffs = 1.0 - abs(fbm(q * 2.15 + vec2(3.7, 1.9) - vec2(t * 0.09, 0.0)) * 2.0 - 1.0);
  float fine = fbm(q * 4.4 + vec2(7.1, 4.3));
  return base * 0.62 + puffs * 0.28 + fine * 0.16;
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;
  float aspect = u_resolution.x / max(u_resolution.y, 1.0);
  vec2 p = (uv - 0.5) * vec2(aspect, 1.0);
  vec2 rp = rot2d(u_angle * 0.2) * p;
  float t = u_time * u_speed * 0.26 + u_seed * 2.7;

  // Deep saturated Yves Klein ultramarine sky
  vec3 sky = mix(u_color2, u_color1, smoothstep(0.05, 0.92, uv.y));

  // Rising sculptural cumulus bank along lower/right horizon + light wisps on left
  float slope = smoothstep(-0.35, 0.85, uv.x + sin(u_seed) * 0.15);
  float bankHeight = mix(0.24, 0.64, slope);
  float verticalMask = 1.0 - smoothstep(0.06, bankHeight, uv.y);

  float d = cumulusDensity(rp, t);
  float dLit = cumulusDensity(rp + vec2(0.035, 0.055), t);
  float cloudShape = smoothstep(0.42 - verticalMask * 0.36, 0.72 - verticalMask * 0.14, d);
  cloudShape *= smoothstep(bankHeight + 0.18, bankHeight - 0.28, uv.y);

  // Subtle high-altitude cirrus wisps on the opposite side
  float wisps = smoothstep(0.56, 0.82, fbm(rp * vec2(2.6, 4.2) + vec2(t * 0.12, u_seed)))
    * smoothstep(0.55, 0.1, uv.y)
    * (1.0 - slope) * 0.42;

  // Directional top sunlight shading for 3D volumetric cauliflower puffs
  float selfShadow = clamp((d - dLit) * (3.6 * u_distortion) + 0.58, 0.0, 1.0);
  float topGlow = smoothstep(0.02, 0.55, uv.y) * 0.28;
  vec3 cloudCol = mix(u_color3, u_color4, clamp(selfShadow + topGlow, 0.0, 1.0));

  vec3 col = mix(sky, mix(u_color2, u_color3, 0.65), wisps);
  col = mix(col, cloudCol, clamp(cloudShape, 0.0, 1.0));

  gl_FragColor = vec4(finishColor(col, uv), 1.0);
}
`,

  ecliptic: `
vec3 sampleEcliptic(vec2 p, float t) {
  float rad = length(p);
  float ang = atan(p.y, p.x);

  float wobble = (fbm(vec2(cos(ang) * 1.4 + t * 0.25, sin(ang) * 1.4 - t * 0.2) + u_seed) - 0.5) * 0.14 * u_distortion;
  float r1 = 0.34 / max(u_scale * 0.85, 0.45);
  float d1 = abs(rad - (r1 + wobble));
  float ring1 = exp(-pow(d1 * 7.5, 1.8));
  float coreGlow = exp(-pow(d1 * 22.0, 2.0));

  // Optional subtle outer harmonic halo ring
  float d2 = abs(rad - (r1 * 1.42 - wobble * 0.65));
  float ring2 = exp(-pow(d2 * 11.0, 2.0)) * 0.42;

  float arcPhase = 0.5 + 0.5 * sin(ang + t * 0.45 + wobble * 5.0);
  vec3 haloTint = mix(u_color2, u_color3, arcPhase);

  vec3 col = u_color1;
  col += haloTint * (ring1 * 1.15 + ring2 * 0.85);
  col += u_color4 * (coreGlow * 0.95 + ring1 * arcPhase * 0.35);

  // Dark inner eclipse core
  float innerDark = smoothstep(r1 * 0.92, r1 * 0.32, rad);
  col = mix(col, u_color1, innerDark * 0.88);
  return col;
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;
  float aspect = u_resolution.x / max(u_resolution.y, 1.0);
  vec2 p = rot2d(u_angle) * ((uv - 0.5) * vec2(aspect, 1.0));
  float t = u_time * u_speed * 0.4 + u_seed * 2.1;

  float ab = max(u_aberration, 0.12) * 0.025;
  vec2 dir = normalize(p + vec2(0.0001));
  vec3 cR = sampleEcliptic(p + dir * ab, t);
  vec3 cG = sampleEcliptic(p, t);
  vec3 cB = sampleEcliptic(p - dir * ab, t);
  vec3 col = vec3(cR.r, cG.g, cB.b);

  gl_FragColor = vec4(finishColor(col, uv), 1.0);
}
`,

  cubic: `
vec3 sampleCubicGlow(vec2 p, float t) {
  vec2 q = vec2(
    fbm(p * 1.15 + vec2(t * 0.22, -t * 0.18) + u_seed),
    fbm(p * 1.15 + vec2(4.2, 1.9) - vec2(t * 0.18, t * 0.22))
  );
  float f = fbm(p * 1.2 + (q - 0.5) * 1.4 * u_distortion);
  float glow = smoothstep(0.12, 0.88, f * 0.65 + (0.5 - length(p) * 0.45));
  vec3 col = mix(u_color1, u_color2, smoothstep(0.0, 0.45, glow));
  col = mix(col, u_color3, smoothstep(0.32, 0.78, glow + (q.x - 0.5) * 0.35));
  col = mix(col, u_color4, smoothstep(0.65, 1.0, glow + (q.y - 0.5) * 0.3));
  return col;
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;
  float aspect = u_resolution.x / max(u_resolution.y, 1.0);
  vec2 p = (uv - 0.5) * vec2(aspect, 1.0);
  vec2 rp = rot2d(u_angle) * p;
  float t = u_time * u_speed * 0.36 + u_seed * 1.8;

  // Regular frosted glass square tile grid
  float tiles = clamp(10.0 * u_scale, 5.0, 32.0);
  vec2 gridUv = rp * tiles;
  vec2 cell = floor(gridUv);
  vec2 local = fract(gridUv) - 0.5;

  // Subtle pillow-lens refraction inside each square glass block
  vec2 lensOffset = local * (0.28 + 0.35 * dot(local, local)) * u_distortion * (1.0 / tiles) * 3.2;
  vec2 samplePos = (cell + 0.5) / tiles + lensOffset;

  float ab = max(u_aberration, 0.14) * 0.018;
  vec3 cR = sampleCubicGlow(samplePos + vec2(ab, 0.0), t);
  vec3 cG = sampleCubicGlow(samplePos, t);
  vec3 cB = sampleCubicGlow(samplePos - vec2(ab, 0.0), t);
  vec3 col = vec3(cR.r, cG.g, cB.b);

  // Subtle bevel specular catchlight + frosted tile seam
  float edge = max(abs(local.x), abs(local.y));
  float seam = smoothstep(0.45, 0.5, edge);
  float bevelHi = smoothstep(0.32, 0.48, -local.x + local.y) * 0.14;
  col = col * (1.0 - seam * 0.16) + u_color4 * bevelHi;

  gl_FragColor = vec4(finishColor(col, uv), 1.0);
}
`,

  flare: `
vec3 sampleFlare(vec2 rp, float t) {
  float wave = (fbm(vec2(rp.x * 1.45 * u_scale + t * 0.25, u_seed * 1.3)) - 0.5) * 0.38 * u_distortion;
  float d = rp.y - wave;

  // Sharp luminous horizon cut with asymmetric atmospheric bloom
  float upper = smoothstep(-0.08, 0.55, d);
  float lower = smoothstep(0.08, -0.55, d);
  float beamCore = exp(-pow(d * (9.5 / max(u_scale * 0.7, 0.45)), 2.0));
  float wideBloom = exp(-abs(d) * (3.2 / max(u_distortion * 0.7, 0.45)));

  float mist = fbm(rp * 1.8 * u_scale + vec2(t * 0.18, -t * 0.14) + u_seed);
  vec3 col = mix(u_color1, u_color2, clamp(lower * 0.55 + wideBloom * (0.65 + 0.35 * mist), 0.0, 1.0));
  col = mix(col, u_color3, clamp(wideBloom * 0.92 + upper * mist * 0.35, 0.0, 1.0));
  col += u_color4 * clamp(beamCore * 1.15 + wideBloom * mist * 0.22, 0.0, 1.25);
  return col;
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;
  float aspect = u_resolution.x / max(u_resolution.y, 1.0);
  vec2 p = (uv - 0.5) * vec2(aspect, 1.0);
  vec2 rp = rot2d(u_angle) * p;
  float t = u_time * u_speed * 0.35 + u_seed * 2.2;

  float ab = u_aberration * 0.024;
  vec3 col;
  if (ab > 0.0005) {
    col.r = sampleFlare(rp + vec2(0.0, ab), t).r;
    col.g = sampleFlare(rp, t).g;
    col.b = sampleFlare(rp - vec2(0.0, ab), t).b;
  } else {
    col = sampleFlare(rp, t);
  }

  gl_FragColor = vec4(finishColor(col, uv), 1.0);
}
`,

  "prism-shafts": `
float shaftProfile(float x, float y, float t) {
  float s = 0.0;
  // 5 parallel volumetric diagonal light shafts with organic intensity falloff
  for (int i = 0; i < 5; i++) {
    float fi = float(i);
    float center = -0.52 + fi * 0.25 + sin(t * 0.35 + fi * 1.7 + u_seed) * 0.035;
    float width = (0.065 + 0.025 * sin(fi * 2.3 + u_seed)) / max(u_scale * 0.85, 0.45);
    float beam = exp(-pow((x - center) / width, 2.0));
    float lengthFade = smoothstep(-0.85, 0.1, y + fi * 0.06) * smoothstep(0.95, -0.2, y - fi * 0.05);
    float shimmer = 0.72 + 0.28 * fbm(vec2(x * 3.0 + fi, y * 1.8 - t * 0.25 + u_seed));
    s += beam * (0.45 + 0.55 * lengthFade) * shimmer;
  }
  return clamp(s, 0.0, 1.35);
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;
  float aspect = u_resolution.x / max(u_resolution.y, 1.0);
  vec2 p = (uv - 0.5) * vec2(aspect, 1.0);
  vec2 rp = rot2d(u_angle) * p;
  float t = u_time * u_speed * 0.45 + u_seed * 1.7;

  // Optical prism dispersion: cool blue leading edge, white core, warm copper trailing edge
  float spread = (0.038 + u_aberration * 0.045) * u_distortion;
  float coolShaft = shaftProfile(rp.x - spread, rp.y, t);
  float coreShaft = shaftProfile(rp.x, rp.y, t);
  float warmShaft = shaftProfile(rp.x + spread, rp.y, t);

  vec3 col = u_color1;
  col += u_color2 * coolShaft * 0.85;
  col += u_color3 * warmShaft * 0.85;
  col += u_color4 * pow(clamp(coreShaft, 0.0, 1.0), 1.45) * 0.92;

  gl_FragColor = vec4(finishColor(col, uv), 1.0);
}
`,

  "astral-lobe": `
void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;
  float aspect = u_resolution.x / max(u_resolution.y, 1.0);
  vec2 p = (uv - 0.5) * vec2(aspect, 1.0);
  vec2 rp = rot2d(u_angle) * p * u_scale;
  float t = u_time * u_speed * 0.22 + u_seed * 1.9;

  // Ultra-soft domain-warped organic multi-lobe blend (Astral 01 aesthetic)
  vec2 warp = vec2(
    fbm(rp * 0.95 + vec2(t * 0.18, -t * 0.14)) - 0.5,
    fbm(rp * 0.95 + vec2(4.7, 2.3) + vec2(-t * 0.14, t * 0.16)) - 0.5
  ) * 0.42 * u_distortion;
  vec2 w = uv + warp * 0.45;

  // Top-center saturated primary lobe descending softly
  float topLobe = exp(-length((w - vec2(0.46, 0.86)) * vec2(1.45, 1.15)) * 1.75);
  // Warm mid halo feathering across upper-left & center
  float midHalo = exp(-length((w - vec2(0.36, 0.58)) * vec2(1.1, 1.25)) * 1.45);
  // Cool contrasting lobe rising softly in bottom-right corner
  float coolLobe = exp(-length((w - vec2(0.84, 0.14)) * vec2(1.25, 1.2)) * 1.55);

  vec3 col = u_color2;
  col = mix(col, u_color1, smoothstep(0.08, 0.88, coolLobe * 1.25));
  col = mix(col, u_color3, smoothstep(0.05, 0.85, midHalo * 1.05));
  col = mix(col, u_color4, smoothstep(0.12, 0.82, topLobe * 1.18));

  gl_FragColor = vec4(finishColor(col, uv), 1.0);
}
`,

  "velvet-fold": `
void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;
  float aspect = u_resolution.x / max(u_resolution.y, 1.0);
  vec2 p = (uv - 0.5) * vec2(aspect, 1.0);
  vec2 rp = rot2d(u_angle) * p;
  float t = u_time * u_speed * 0.28 + u_seed * 2.1;

  // Sculpted diagonal velvet light-curtains & S-curve folded ribbons
  float sCurve = sin(rp.y * (2.6 * u_scale) + t * 0.45 + fbm(rp * 1.1 + u_seed) * 1.6 * u_distortion) * 0.24 * u_distortion;
  float crease = rp.x + sCurve;

  // Soft pleated highlight ridges along the velvet drape
  float pleat = sin(crease * (7.5 * u_scale) + fbm(rp * 1.6 - t * 0.18) * 2.2) * 0.5 + 0.5;
  float drape = smoothstep(-0.65, 0.52, crease);
  float brightEdge = exp(-pow((crease - 0.28) * 3.8, 2.0));
  float ridgeHighlight = pow(pleat, 2.2) * exp(-pow((crease - 0.08) * 2.2, 2.0));

  vec3 col = mix(u_color1, u_color2, smoothstep(0.0, 0.62, drape));
  col = mix(col, u_color3, smoothstep(0.32, 0.92, drape * 0.85 + ridgeHighlight * 0.55));
  col = mix(col, u_color4, clamp(brightEdge * 0.92 + ridgeHighlight * 0.48, 0.0, 1.0));

  gl_FragColor = vec4(finishColor(col, uv), 1.0);
}
`,

  "hero-dome": `
void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;
  float aspect = u_resolution.x / max(u_resolution.y, 1.0);
  vec2 p = (uv - 0.5) * vec2(aspect, 1.0);
  vec2 rp = rot2d(u_angle) * p;
  float t = u_time * u_speed * 0.3 + u_seed * 1.5;

  // Subtle organic breath
  float breath = sin(t * 0.7) * 0.035;
  float sway = (fbm(vec2(rp.x * 1.4 + t * 0.15, rp.y * 1.4 + u_seed)) - 0.5) * 0.08 * u_distortion;

  // Arched rising dome / double-banded hero glow (Hero Gradients signature)
  vec2 domePos = (rp - vec2(0.0, -0.34 + breath)) * vec2(0.88 * u_scale, 1.35 * u_scale);
  float d = length(domePos + vec2(0.0, sway));

  float outerGlow = exp(-d * d * 1.65);
  float innerGlow = exp(-d * d * 4.4);
  // Characteristic soft horizontal shadow crease creating the double-banded arch
  float archCrease = 1.0 - 0.38 * u_distortion * exp(-pow((rp.y - (0.04 + sway * 0.6)) * 8.5, 2.0)) * outerGlow;
  // Soft corner rise at the bottom edge
  float edgeLift = exp(-pow((rp.y + 0.48) * 3.8, 2.0)) * (0.45 + 0.55 * exp(-rp.x * rp.x * 1.4));

  float lum = clamp((outerGlow * 0.85 + edgeLift * 0.45) * archCrease, 0.0, 1.0);
  float core = clamp((innerGlow * 0.9 + edgeLift * 0.5) * archCrease, 0.0, 1.0);

  vec3 col = u_color1;
  col = mix(col, u_color2, smoothstep(0.04, 0.65, lum));
  col = mix(col, u_color3, smoothstep(0.28, 0.88, lum * 0.82 + core * 0.45));
  col = mix(col, u_color4, smoothstep(0.52, 1.05, core * 1.15));

  gl_FragColor = vec4(finishColor(col, uv), 1.0);
}
`,

  "crescent-arc": `
vec3 sampleCrescent(vec2 rp, float t) {
  float rad = 1.25 / max(u_scale * 0.85, 0.45);
  vec2 center = vec2(0.0, -rad - 0.04);
  float dist = length(rp - center);
  float alt = dist - rad;

  float shimmer = fbm(vec2(rp.x * 3.0 + t * 0.2 + u_seed, alt * 12.0)) * 0.025 * u_distortion;
  float a = alt + shimmer;

  // Razor-crisp planetary crescent horizon rim glowing into deep space
  float rim = exp(-pow((a - 0.012) * 36.0, 2.0));
  float upperAtmo = smoothstep(-0.02, 0.04, a) * exp(-max(a, 0.0) * 5.2);
  float softHalo = exp(-abs(a - 0.04) * 3.2) * 0.55;
  // Eclipse shadow below the horizon arc
  float eclipse = smoothstep(-0.025, 0.015, a);
  float lateralFade = exp(-rp.x * rp.x * 1.6);

  vec3 col = u_color1;
  col += u_color2 * (upperAtmo * 0.95 + softHalo * 0.65) * (0.45 + 0.55 * lateralFade);
  col += u_color3 * (upperAtmo * 0.8 + rim * 0.65) * (0.35 + 0.65 * lateralFade);
  col += u_color4 * rim * (0.55 + 0.65 * lateralFade);
  col *= mix(0.18, 1.0, eclipse);
  return col;
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;
  float aspect = u_resolution.x / max(u_resolution.y, 1.0);
  vec2 p = (uv - 0.5) * vec2(aspect, 1.0);
  vec2 rp = rot2d(u_angle) * p;
  float t = u_time * u_speed * 0.35 + u_seed * 2.4;

  float ab = max(u_aberration, 0.14) * 0.018;
  vec3 cR = sampleCrescent(rp + vec2(0.0, ab), t);
  vec3 cG = sampleCrescent(rp, t);
  vec3 cB = sampleCrescent(rp - vec2(0.0, ab), t);
  vec3 col = vec3(cR.r, cG.g, cB.b);

  gl_FragColor = vec4(finishColor(col, uv), 1.0);
}
`,
}

export function getShaderFragmentSource(config: ShaderConfig): string {
  if (config.engine === "custom") {
    return config.customGlsl?.trim() || DEFAULT_CUSTOM_GLSL
  }
  return `${GLSL_SHARED_HEADER}\n${ENGINE_MAIN_BODIES[config.engine]}`
}

export const BUILTIN_SHADERS: ShaderItem[] = [
  // --- Requested Grainient Collection Highlights ---
  {
    id: "godrays-01",
    name: "Godrays — 01",
    description:
      "Parallel diagonal prism light shafts with cobalt-blue leading edge, silver core, and amber-copper glow.",
    category: "noisy-grainy",
    featured: true,
    config: {
      engine: "prism-shafts",
      colors: ["#050507", "#2b74b8", "#c47233", "#e8ebf0"],
      speed: 0.45,
      scale: 1.05,
      distortion: 1.05,
      grain: 0.36,
      dither: 0,
      aberration: 0.45,
      blur: 1.5,
      brightness: 1.05,
      contrast: 1.12,
      vignette: 0.45,
      angle: 0.68,
      seed: 2.1,
      animated: true,
    },
  },
  {
    id: "astral-01",
    name: "Astral — 01",
    description:
      "Grainless multi-lobe golden marigold descending into warm ivory haze and powder sky blue.",
    category: "smooth-blends",
    featured: true,
    config: {
      engine: "astral-lobe",
      colors: ["#88bde0", "#eae5d3", "#fad35c", "#f5a800"],
      speed: 0.5,
      scale: 1.0,
      distortion: 0.9,
      grain: 0,
      dither: 0,
      aberration: 0,
      blur: 3,
      brightness: 1.02,
      contrast: 1.04,
      vignette: 0.05,
      angle: 0,
      seed: 4.3,
      animated: true,
    },
  },
  {
    id: "hero-v3-orchid",
    name: "Hero V3 — Orchid",
    description:
      "Sculpted diagonal pale-lilac to orchid and royal-plum velvet light-curtain fading to obsidian.",
    category: "smooth-blends",
    featured: true,
    config: {
      engine: "velvet-fold",
      colors: ["#12061a", "#5e2378", "#c276d9", "#fcebff"],
      speed: 0.48,
      scale: 1.0,
      distortion: 1.05,
      grain: 0,
      dither: 0,
      aberration: 0,
      blur: 2.5,
      brightness: 1.04,
      contrast: 1.1,
      vignette: 0.35,
      angle: -0.78,
      seed: 8.6,
      animated: true,
    },
  },
  {
    id: "ultravibe-20",
    name: "Ultravibe — 20",
    description:
      "Sleek dark-space planetary horizon crescent with electric cyan atmosphere and crisp ice-white rim.",
    category: "cosmic",
    featured: true,
    config: {
      engine: "crescent-arc",
      colors: ["#040812", "#0e2c59", "#3e8ef7", "#d6f0ff"],
      speed: 0.45,
      scale: 1.05,
      distortion: 0.9,
      grain: 0.1,
      dither: 0,
      aberration: 0.25,
      blur: 1,
      brightness: 1.06,
      contrast: 1.14,
      vignette: 0.42,
      angle: 0,
      seed: 11.4,
      animated: true,
    },
  },
  {
    id: "japaneasy-persimmon",
    name: "Japaneasy — Persimmon",
    description:
      "Tactile matte washi-paper grain over folded persimmon-coral, apricot, and mineral slate ridges.",
    category: "noisy-grainy",
    featured: true,
    config: {
      engine: "velvet-fold",
      colors: ["#7c92a1", "#9eb0ba", "#ed9d78", "#e86f43"],
      speed: 0.4,
      scale: 0.95,
      distortion: 1.15,
      grain: 0.54,
      dither: 0,
      aberration: 0,
      blur: 1.5,
      brightness: 1.02,
      contrast: 1.06,
      vignette: 0.16,
      angle: 0.55,
      seed: 15.2,
      animated: true,
    },
  },
  {
    id: "hero-dome-cobalt",
    name: "Hero — Cobalt Dome",
    description:
      "Grainless double-banded cobalt and pale-sky rising dome glow tailored for dark UI hero sections.",
    category: "smooth-blends",
    featured: true,
    config: {
      engine: "hero-dome",
      colors: ["#02030a", "#0f2680", "#2f6bff", "#b5daff"],
      speed: 0.45,
      scale: 1.0,
      distortion: 1.1,
      grain: 0,
      dither: 0,
      aberration: 0,
      blur: 4,
      brightness: 1.06,
      contrast: 1.12,
      vignette: 0.35,
      angle: 0,
      seed: 19.1,
      animated: true,
    },
  },
  {
    id: "hero-v3-cobalt",
    name: "Hero V3 — Cobalt Wave",
    description:
      "Pure black left negative space balanced against a sculpted electric-cobalt S-curve velvet ribbon.",
    category: "smooth-blends",
    config: {
      engine: "velvet-fold",
      colors: ["#030408", "#153299", "#3c7bff", "#a8d1ff"],
      speed: 0.5,
      scale: 1.15,
      distortion: 1.25,
      grain: 0,
      dither: 0,
      aberration: 0,
      blur: 2,
      brightness: 1.05,
      contrast: 1.14,
      vignette: 0.38,
      angle: -0.15,
      seed: 22.8,
      animated: true,
    },
  },
  {
    id: "ultravibe-chrome",
    name: "Ultravibe — Chrome",
    description:
      "Vertical fluted liquid-chrome glass refracting gunmetal shadow and brushed specular silver.",
    category: "glass-light",
    config: {
      engine: "fluted",
      colors: ["#121316", "#4e5157", "#9fa3aa", "#eaecef"],
      speed: 0.55,
      scale: 1.5,
      distortion: 1.25,
      grain: 0.16,
      dither: 0,
      aberration: 0.12,
      blur: 0,
      brightness: 1.04,
      contrast: 1.16,
      vignette: 0.36,
      angle: 0,
      seed: 26.3,
      animated: true,
    },
  },
  {
    id: "japaneasy-ultramarine",
    name: "Japaneasy — Ultramarine",
    description:
      "Warm peach-ivory paper meeting an ultramarine cobalt and midnight navy ridge with fine grain.",
    category: "noisy-grainy",
    config: {
      engine: "velvet-fold",
      colors: ["#0a0e24", "#1835b8", "#7e8fe0", "#f0d5c2"],
      speed: 0.42,
      scale: 1.0,
      distortion: 1.1,
      grain: 0.5,
      dither: 0,
      aberration: 0,
      blur: 1,
      brightness: 1.02,
      contrast: 1.08,
      vignette: 0.18,
      angle: -0.62,
      seed: 29.4,
      animated: true,
    },
  },
  {
    id: "hero-bloom-tangerine",
    name: "Hero — Tangerine Bloom",
    description:
      "Silky bottom-rising tangerine and pale-cream velvet bloom fading smoothly into pitch black.",
    category: "smooth-blends",
    config: {
      engine: "hero-dome",
      colors: ["#030202", "#7c2d12", "#f97316", "#ffedd5"],
      speed: 0.42,
      scale: 1.05,
      distortion: 0.55,
      grain: 0,
      dither: 0,
      aberration: 0,
      blur: 4.5,
      brightness: 1.05,
      contrast: 1.1,
      vignette: 0.32,
      angle: 0,
      seed: 31.8,
      animated: true,
    },
  },
  {
    id: "hero-arch-cyan",
    name: "Hero — Cyan Arch",
    description:
      "Top-down arched icy-white and electric-cyan hero light descending softly into pure black.",
    category: "smooth-blends",
    config: {
      engine: "hero-dome",
      colors: ["#020202", "#09597a", "#3ad0f5", "#f2fcff"],
      speed: 0.42,
      scale: 1.02,
      distortion: 0.65,
      grain: 0,
      dither: 0,
      aberration: 0,
      blur: 4,
      brightness: 1.05,
      contrast: 1.1,
      vignette: 0.3,
      angle: 3.14,
      seed: 34.1,
      animated: true,
    },
  },
  {
    id: "godrays-08",
    name: "Godrays — 08",
    description:
      "Prismatic midnight-navy horizon flare bursting with royal blue, golden amber, and ice-white bloom.",
    category: "noisy-grainy",
    config: {
      engine: "flare",
      colors: ["#060a1e", "#1e4ed8", "#f5a623", "#f4f8ff"],
      speed: 0.5,
      scale: 1.05,
      distortion: 1.15,
      grain: 0.38,
      dither: 0,
      aberration: 0.35,
      blur: 1.5,
      brightness: 1.06,
      contrast: 1.14,
      vignette: 0.42,
      angle: 0.14,
      seed: 36.7,
      animated: true,
    },
  },
  {
    id: "astral-18",
    name: "Astral — 18",
    description:
      "Swirling crimson and deep ruby vortex ripple blooming softly over a warm cream canvas.",
    category: "smooth-blends",
    config: {
      engine: "aura",
      colors: ["#faf6ee", "#f2b49b", "#d9383a", "#8f1119"],
      speed: 0.55,
      scale: 1.15,
      distortion: 1.2,
      grain: 0.08,
      dither: 0,
      aberration: 0,
      blur: 2.5,
      brightness: 1.02,
      contrast: 1.06,
      vignette: 0.08,
      angle: 0.3,
      seed: 38.9,
      animated: true,
    },
  },

  // --- Painterly, Sky, Horizon & Orbital visual styles ---
  {
    id: "richter-cloudscape",
    name: "Richter Cloudscape",
    description:
      "Soft oil-blurred pastel blush clouds drifting above a misty olive-sage horizon.",
    category: "landscapes",
    featured: true,
    config: {
      engine: "cloudscape",
      colors: ["#7d856a", "#8ab0cf", "#c7b9be", "#f0e8e6"],
      speed: 0.45,
      scale: 1.25,
      distortion: 1.05,
      grain: 0.2,
      dither: 0,
      aberration: 0,
      brightness: 1.02,
      contrast: 1.04,
      vignette: 0.12,
      angle: 0,
      seed: 3.6,
      animated: true,
    },
  },
  // --- Grainient Freebies signature looks ---
  {
    id: "ecliptic-gradients",
    name: "Ecliptic Gradients",
    description:
      "Luminous blurred orbital torus ring glowing in warm amber and cyan over pitch black.",
    category: "cosmic",
    featured: true,
    config: {
      engine: "ecliptic",
      colors: ["#030305", "#ea580c", "#38bdf8", "#fff7ed"],
      speed: 0.55,
      scale: 1.0,
      distortion: 0.9,
      grain: 0.2,
      dither: 0,
      aberration: 0.32,
      blur: 2,
      brightness: 1.06,
      contrast: 1.14,
      vignette: 0.45,
      angle: 0.35,
      seed: 14.4,
      animated: true,
    },
  },
  {
    id: "cubic-glass",
    name: "Cubic Glass",
    description:
      "Frosted square glass mosaic tiles refracting a warm cream, amber, and apricot glow.",
    category: "glass-light",
    featured: true,
    config: {
      engine: "cubic",
      colors: ["#fff8ee", "#fbbf77", "#e87846", "#ffffff"],
      speed: 0.55,
      scale: 1.15,
      distortion: 1.15,
      grain: 0.12,
      dither: 0,
      aberration: 0.28,
      blur: 0,
      brightness: 1.03,
      contrast: 1.06,
      vignette: 0.08,
      angle: 0,
      seed: 8.2,
      animated: true,
    },
  },
  {
    id: "hero-gradient-v2",
    name: "Hero Gradient V2",
    description:
      "Pitch-black canvas sliced diagonally by a neon magenta-to-white exponential light flare.",
    category: "smooth-blends",
    featured: true,
    config: {
      engine: "flare",
      colors: ["#040308", "#4c1d95", "#ec4899", "#fdf2f8"],
      speed: 0.6,
      scale: 1.1,
      distortion: 1.05,
      grain: 0.24,
      dither: 0,
      aberration: 0.25,
      blur: 2,
      brightness: 1.06,
      contrast: 1.14,
      vignette: 0.48,
      angle: -0.58,
      seed: 11.7,
      animated: true,
    },
  },
  {
    id: "fractal-maze",
    name: "Fractal Maze",
    description:
      "Deep forest-black backdrop with a glowing mint-emerald beam behind vertical reeded glass.",
    category: "glass-light",
    config: {
      engine: "fluted",
      colors: ["#030906", "#0b3b2c", "#34d399", "#d1fae5"],
      speed: 0.58,
      scale: 1.4,
      distortion: 1.3,
      grain: 0.22,
      dither: 0,
      aberration: 0.25,
      blur: 0,
      brightness: 1.06,
      contrast: 1.15,
      vignette: 0.44,
      angle: 0,
      seed: 17.5,
      animated: true,
    },
  },
  {
    id: "red-aura",
    name: "Red Aura",
    description:
      "Molten dark chrome fluid ripples accented by electric crimson-red and ice-cyan highlights.",
    category: "glass-light",
    config: {
      engine: "glass",
      colors: ["#050408", "#7f1d1d", "#ef4444", "#a5f3fc"],
      speed: 0.72,
      scale: 1.35,
      distortion: 1.35,
      grain: 0.16,
      dither: 0,
      aberration: 0.2,
      blur: 0,
      brightness: 1.05,
      contrast: 1.18,
      vignette: 0.52,
      angle: 0.35,
      seed: 23.1,
      animated: true,
    },
  },
  {
    id: "dither-gradient-i",
    name: "Dither Gradient I",
    description:
      "Bold cyber-crimson ordered pixel dither fading smoothly into pure obsidian black.",
    category: "dither",
    config: {
      engine: "dither",
      colors: ["#050304", "#3b0712", "#e11d48", "#fda4af"],
      speed: 0.55,
      scale: 1.35,
      distortion: 1.1,
      grain: 0.12,
      dither: 0.66,
      aberration: 0,
      blur: 0,
      brightness: 1.04,
      contrast: 1.16,
      vignette: 0.42,
      angle: -0.35,
      seed: 25.4,
      animated: true,
    },
  },
  {
    id: "serenmist",
    name: "Serenmist",
    description:
      "Warm burnt-orange and cream satin light ridge folding softly over deep slate-navy.",
    category: "smooth-blends",
    config: {
      engine: "flare",
      colors: ["#0c1526", "#1e3a5f", "#ea6b35", "#fff3e6"],
      speed: 0.5,
      scale: 1.0,
      distortion: 1.2,
      grain: 0.22,
      dither: 0,
      aberration: 0.12,
      blur: 3,
      brightness: 1.04,
      contrast: 1.08,
      vignette: 0.32,
      angle: 0.28,
      seed: 27.9,
      animated: true,
    },
  },
  {
    id: "tangerine-silk",
    name: "Tangerine",
    description:
      "Sculpted warm satin silk folds in tangerine, peach, blush coral, and sunlit cream.",
    category: "smooth-blends",
    config: {
      engine: "waves",
      colors: ["#fff4ea", "#fdb893", "#f97343", "#ffe4d6"],
      speed: 0.68,
      scale: 1.25,
      distortion: 1.1,
      grain: 0.16,
      dither: 0,
      aberration: 0,
      blur: 1.5,
      brightness: 1.02,
      contrast: 1.06,
      vignette: 0.12,
      angle: -0.25,
      seed: 31.6,
      animated: true,
    },
  },
  {
    id: "galactic-rings",
    name: "Galactic Rings",
    description:
      "Concentric glowing electric violet, cobalt, and champagne halos floating on pure black.",
    category: "cosmic",
    config: {
      engine: "ecliptic",
      colors: ["#04040a", "#3730a3", "#a855f7", "#fde68a"],
      speed: 0.6,
      scale: 1.15,
      distortion: 1.1,
      grain: 0.18,
      dither: 0,
      aberration: 0.45,
      blur: 1,
      brightness: 1.08,
      contrast: 1.16,
      vignette: 0.5,
      angle: -0.45,
      seed: 34.8,
      animated: true,
    },
  },
  {
    id: "obscura-gradient",
    name: "Obscura Gradient",
    description:
      "Moody matte olive, dusty plum, and deep charcoal textured with heavy analog film grain.",
    category: "noisy-grainy",
    config: {
      engine: "mesh",
      colors: ["#0c0f14", "#3d4633", "#6d4c66", "#d6c8be"],
      speed: 0.52,
      scale: 1.3,
      distortion: 1.15,
      grain: 0.62,
      dither: 0,
      aberration: 0.1,
      blur: 2.5,
      brightness: 1.02,
      contrast: 1.08,
      vignette: 0.42,
      angle: 0.4,
      seed: 37.2,
      animated: true,
    },
  },
  {
    id: "endless-horizon",
    name: "Endless Horizon",
    description:
      "Minimalist cerulean sky dissolving into a luminous mist over gently rippled calm sea.",
    category: "landscapes",
    featured: true,
    config: {
      engine: "horizon",
      colors: ["#266b8e", "#1c87b5", "#8cc8d4", "#e3efec"],
      speed: 0.55,
      scale: 1.15,
      distortion: 0.9,
      grain: 0.14,
      dither: 0,
      aberration: 0,
      brightness: 1.02,
      contrast: 1.04,
      vignette: 0.1,
      angle: 0,
      seed: 5.2,
      animated: true,
    },
  },
  {
    id: "orbital-limb",
    name: "Orbital Limb",
    description:
      "Curved planetary atmosphere slicing pitch-black space in fiery amber, white, and cobalt.",
    category: "landscapes",
    featured: true,
    config: {
      engine: "orbital",
      colors: ["#020204", "#dc5a19", "#2f86db", "#f7fbff"],
      speed: 0.45,
      scale: 1.1,
      distortion: 1.15,
      grain: 0.12,
      dither: 0,
      aberration: 0.15,
      brightness: 1.05,
      contrast: 1.12,
      vignette: 0.38,
      angle: -0.62,
      seed: 9.8,
      animated: true,
    },
  },
  {
    id: "klein-blue-sky",
    name: "Klein Blue Sky",
    description:
      "Saturated ultramarine cobalt sky with sculptural sunlit white cumulus clouds.",
    category: "landscapes",
    featured: true,
    config: {
      engine: "cumulus",
      colors: ["#0f28e4", "#294df6", "#8ea4fa", "#fdfeff"],
      speed: 0.5,
      scale: 1.15,
      distortion: 1.1,
      grain: 0.14,
      dither: 0,
      aberration: 0,
      brightness: 1.03,
      contrast: 1.08,
      vignette: 0.08,
      angle: 0,
      seed: 4.4,
      animated: true,
    },
  },

  // --- Pryzm-inspired signature looks ---
  {
    id: "ink-facet",
    name: "Ink Facet",
    description:
      "Electric magenta beam blooming behind vertical fluted glass bars against near-black.",
    category: "glass-light",
    featured: true,
    config: {
      engine: "fluted",
      colors: ["#07020c", "#340a4f", "#d91df5", "#ffa8f5"],
      speed: 0.65,
      scale: 1.65,
      distortion: 1.25,
      grain: 0.18,
      dither: 0,
      aberration: 0.35,
      brightness: 1.08,
      contrast: 1.15,
      vignette: 0.42,
      angle: 0,
      seed: 1.8,
      animated: true,
    },
  },
  {
    id: "pewter-fade",
    name: "Pewter Fade",
    description:
      "Cool pewter blue wash lit by a warm terracotta bloom under rich analog film grain.",
    category: "noisy-grainy",
    featured: true,
    config: {
      engine: "mesh",
      colors: ["#25354f", "#7395c2", "#d97343", "#ebe5de"],
      speed: 0.55,
      scale: 1.15,
      distortion: 0.95,
      grain: 0.56,
      dither: 0,
      aberration: 0.12,
      brightness: 1.02,
      contrast: 1.06,
      vignette: 0.32,
      angle: 0.25,
      seed: 14.2,
      animated: true,
    },
  },
  {
    id: "caustic-pool",
    name: "Caustic Pool",
    description:
      "Rippling cyan and silver water caustics dissolved into live terminal ASCII glyphs.",
    category: "ascii-glitch",
    featured: true,
    config: {
      engine: "ascii",
      colors: ["#03070d", "#0f4259", "#34d5eb", "#e6fbff"],
      speed: 0.72,
      scale: 1.15,
      distortion: 1.15,
      grain: 0.14,
      dither: 0,
      aberration: 0.28,
      brightness: 1.08,
      contrast: 1.14,
      vignette: 0.45,
      angle: 0,
      seed: 16.5,
      animated: true,
    },
  },
  {
    id: "sunset-print",
    name: "Sunset Print",
    description:
      "Warm sunset coral and deep teal pressed into a bold tactile print halftone screen.",
    category: "halftone",
    featured: true,
    config: {
      engine: "halftone",
      colors: ["#101c26", "#235f6d", "#f06c5b", "#ffd79a"],
      speed: 0.6,
      scale: 1.05,
      distortion: 1.1,
      grain: 0.3,
      dither: 0,
      aberration: 0.22,
      brightness: 1.05,
      contrast: 1.12,
      vignette: 0.28,
      angle: 0.15,
      seed: 18.1,
      animated: true,
    },
  },
  {
    id: "holographic-sheen",
    name: "Holographic Sheen",
    description:
      "Warped thin-film iridescent contours shimmering across violet, rose, and cyan.",
    category: "smooth-blends",
    featured: true,
    config: {
      engine: "holographic",
      colors: ["#0c0d1f", "#5b6cf9", "#f472b6", "#7aeef9"],
      speed: 0.7,
      scale: 1.25,
      distortion: 1.2,
      grain: 0.16,
      dither: 0,
      aberration: 0.35,
      brightness: 1.05,
      contrast: 1.1,
      vignette: 0.22,
      angle: -0.25,
      seed: 21.4,
      animated: true,
    },
  },
  {
    id: "fluted-glass",
    name: "Fluted Glass",
    description:
      "Cool cobalt and warm amber light refracted through ribbed architectural glass.",
    category: "glass-light",
    config: {
      engine: "fluted",
      colors: ["#090e1c", "#1d4f82", "#e8703a", "#fce6c9"],
      speed: 0.6,
      scale: 1.2,
      distortion: 1.35,
      grain: 0.24,
      dither: 0,
      aberration: 0.42,
      brightness: 1.06,
      contrast: 1.14,
      vignette: 0.36,
      angle: 0,
      seed: 19.3,
      animated: true,
    },
  },
  {
    id: "sakura-grid",
    name: "Sakura Grid",
    description:
      "Blush pink light scattered softly across a fine radial halftone dot grid.",
    category: "halftone",
    config: {
      engine: "halftone",
      colors: ["#170c14", "#7b2d5a", "#f48fb1", "#fff2f6"],
      speed: 0.52,
      scale: 1.35,
      distortion: 0.9,
      grain: 0.18,
      dither: 0,
      aberration: 0.15,
      brightness: 1.06,
      contrast: 1.1,
      vignette: 0.24,
      angle: -0.2,
      seed: 22.7,
      animated: true,
    },
  },
  {
    id: "signal-glitch",
    name: "Signal Glitch",
    description:
      "Amber broadcast signal bars tearing across horizontal scanlines with RGB split.",
    category: "ascii-glitch",
    config: {
      engine: "glitch",
      colors: ["#09070a", "#4a1919", "#f59e0b", "#fef3c7"],
      speed: 0.8,
      scale: 1.15,
      distortion: 1.25,
      grain: 0.34,
      dither: 0.28,
      aberration: 0.65,
      brightness: 1.06,
      contrast: 1.16,
      vignette: 0.48,
      angle: 0,
      seed: 24.9,
      animated: true,
    },
  },
  {
    id: "prism-sweep",
    name: "Prism Sweep",
    description:
      "Conic light sweep from obsidian into electric cobalt around a bright prism flare.",
    category: "cosmic",
    config: {
      engine: "prism",
      colors: ["#05060b", "#142a6b", "#3b82f6", "#e2eeff"],
      speed: 0.62,
      scale: 1.2,
      distortion: 1.05,
      grain: 0.26,
      dither: 0,
      aberration: 0.5,
      brightness: 1.06,
      contrast: 1.16,
      vignette: 0.5,
      angle: 0.3,
      seed: 26.2,
      animated: true,
    },
  },
  {
    id: "shoreline-code",
    name: "Shoreline Code",
    description:
      "Turquoise tide and pale foam encoded in crisp monospaced ASCII glyphs.",
    category: "ascii-glitch",
    config: {
      engine: "ascii",
      colors: ["#061414", "#0e6b6b", "#5eead4", "#f0fdfa"],
      speed: 0.65,
      scale: 1.35,
      distortion: 1.05,
      grain: 0.16,
      dither: 0,
      aberration: 0.38,
      brightness: 1.06,
      contrast: 1.12,
      vignette: 0.34,
      angle: 0.12,
      seed: 28.4,
      animated: true,
    },
  },
  {
    id: "twilight-print",
    name: "Twilight Print",
    description:
      "Deep indigo and violet bloom fading to black through a dense LED-like dot screen.",
    category: "halftone",
    config: {
      engine: "halftone",
      colors: ["#06060f", "#27236b", "#7c6cf0", "#e2dcff"],
      speed: 0.55,
      scale: 1.5,
      distortion: 1.0,
      grain: 0.24,
      dither: 0,
      aberration: 0.2,
      brightness: 1.06,
      contrast: 1.15,
      vignette: 0.45,
      angle: 0.4,
      seed: 29.8,
      animated: true,
    },
  },
  {
    id: "candy-dither",
    name: "Candy Dither",
    description:
      "Pastel lemon, lilac, and mint fading to charcoal through crisp ordered dithering.",
    category: "dither",
    config: {
      engine: "dither",
      colors: ["#14131c", "#98f5e1", "#c8b6ff", "#fde48a"],
      speed: 0.58,
      scale: 1.3,
      distortion: 1.05,
      grain: 0.08,
      dither: 0.68,
      aberration: 0,
      brightness: 1.04,
      contrast: 1.14,
      vignette: 0.22,
      angle: 0.35,
      seed: 31.1,
      animated: true,
    },
  },
  {
    id: "mauve-stock",
    name: "Mauve Stock",
    description:
      "Rose-mauve to warm cream gradient softened behind wide vertical glass flutes.",
    category: "glass-light",
    config: {
      engine: "fluted",
      colors: ["#1c0d1c", "#8f3b76", "#e5989b", "#fff1e6"],
      speed: 0.52,
      scale: 0.95,
      distortion: 1.1,
      grain: 0.3,
      dither: 0,
      aberration: 0.22,
      brightness: 1.04,
      contrast: 1.08,
      vignette: 0.22,
      angle: 0,
      seed: 33.4,
      animated: true,
    },
  },
  {
    id: "tidal-dusk",
    name: "Tidal Dusk",
    description:
      "Indigo dusk water light drifting in a slow, seamless undulating tidal loop.",
    category: "smooth-blends",
    config: {
      engine: "waves",
      colors: ["#080d1e", "#1d356b", "#5c7cfa", "#dbe4ff"],
      speed: 0.62,
      scale: 1.45,
      distortion: 1.18,
      grain: 0.22,
      dither: 0,
      aberration: 0.14,
      brightness: 1.05,
      contrast: 1.1,
      vignette: 0.35,
      angle: -0.18,
      seed: 35.2,
      animated: true,
    },
  },

  // --- Grainient-inspired signature looks ---
  {
    id: "astral-gradients",
    name: "Astral Gradients",
    description:
      "Luminous pastel silk folds with organic domain warping and delicate film texture.",
    category: "smooth-blends",
    featured: true,
    config: {
      engine: "mesh",
      colors: ["#9be2ff", "#9b8cff", "#ff6fb7", "#ffe48f"],
      speed: 0.75,
      scale: 1.35,
      distortion: 1.25,
      grain: 0.22,
      dither: 0,
      aberration: 0.08,
      brightness: 1.04,
      contrast: 1.05,
      vignette: 0.12,
      angle: 0.35,
      seed: 1.2,
      animated: true,
    },
  },
  {
    id: "temporal-aura",
    name: "Temporal Aura",
    description:
      "Swirling amber and deep teal halo radiating from a soft luminous core.",
    category: "smooth-blends",
    config: {
      engine: "aura",
      colors: ["#090f1a", "#2b6f86", "#f26b21", "#fff2e2"],
      speed: 0.7,
      scale: 1.2,
      distortion: 1.1,
      grain: 0.28,
      dither: 0,
      aberration: 0,
      brightness: 1.05,
      contrast: 1.08,
      vignette: 0.45,
      angle: 0.6,
      seed: 2.4,
      animated: true,
    },
  },
  {
    id: "liquid-glass",
    name: "Liquid Glass",
    description:
      "Refractive 3D-like fluid surface with glossy specular highlights and pastel caustics.",
    category: "glass-light",
    config: {
      engine: "glass",
      colors: ["#ede9f6", "#e7a4e4", "#7b78ff", "#ffffff"],
      speed: 0.85,
      scale: 1.2,
      distortion: 1.15,
      grain: 0.1,
      dither: 0,
      aberration: 0,
      brightness: 1.04,
      contrast: 1.08,
      vignette: 0.08,
      angle: -0.4,
      seed: 3.1,
      animated: true,
    },
  },
  {
    id: "dither-gradient-ii",
    name: "Dither Gradient II",
    description:
      "Editorial 4×4 Bayer ordered dither bands over a flowing cobalt and peach gradient.",
    category: "dither",
    config: {
      engine: "dither",
      colors: ["#0d1321", "#3e5c76", "#f08a5d", "#f9ed69"],
      speed: 0.65,
      scale: 1.4,
      distortion: 1.1,
      grain: 0.12,
      dither: 0.58,
      aberration: 0,
      brightness: 1.02,
      contrast: 1.12,
      vignette: 0.25,
      angle: 0.25,
      seed: 4.7,
      animated: true,
    },
  },
  {
    id: "godrays-chromatic",
    name: "Godrays Gradients",
    description:
      "Diagonal volumetric light shafts with warm amber bloom and heavy analog grain.",
    category: "noisy-grainy",
    config: {
      engine: "godrays",
      colors: ["#0a0b10", "#1e3a5f", "#e06d53", "#ffe5b4"],
      speed: 0.7,
      scale: 1.35,
      distortion: 1.2,
      grain: 0.45,
      dither: 0,
      aberration: 0.25,
      brightness: 1.08,
      contrast: 1.12,
      vignette: 0.5,
      angle: -0.25,
      seed: 5.5,
      animated: true,
    },
  },
  {
    id: "radiant-void",
    name: "Radiant Void",
    description:
      "Deep turbulent cosmic filaments illuminated by crimson embers and starlight.",
    category: "cosmic",
    config: {
      engine: "cosmic",
      colors: ["#06060b", "#2a1230", "#dc2f5c", "#ffcf96"],
      speed: 0.6,
      scale: 1.5,
      distortion: 1.35,
      grain: 0.34,
      dither: 0,
      aberration: 0,
      brightness: 1.06,
      contrast: 1.16,
      vignette: 0.62,
      angle: 0.15,
      seed: 6.8,
      animated: true,
    },
  },
  {
    id: "dreamy-fabrica",
    name: "Dreamy Fabrica",
    description:
      "Layered iridescent silk ribbons drifting softly across a serene pearl backdrop.",
    category: "smooth-blends",
    config: {
      engine: "waves",
      colors: ["#141b2d", "#2c698d", "#bae8e8", "#fff5eb"],
      speed: 0.8,
      scale: 1.3,
      distortion: 1.05,
      grain: 0.18,
      dither: 0,
      aberration: 0,
      brightness: 1.04,
      contrast: 1.06,
      vignette: 0.22,
      angle: -0.32,
      seed: 7.3,
      animated: true,
    },
  },
  {
    id: "obsidian-glass",
    name: "Obsidian Glass",
    description:
      "Sculptural monochrome chrome ripples built for minimalist dark-mode hero panels.",
    category: "glass-light",
    config: {
      engine: "glass",
      colors: ["#09090b", "#1c1c22", "#52525b", "#f4f4f5"],
      speed: 0.65,
      scale: 1.45,
      distortion: 1.3,
      grain: 0.2,
      dither: 0,
      aberration: 0,
      brightness: 1.02,
      contrast: 1.18,
      vignette: 0.55,
      angle: 0.45,
      seed: 8.9,
      animated: true,
    },
  },
  {
    id: "spectral-mist",
    name: "Spectral Mist",
    description:
      "Noisy emerald and cyan atmospheric fog textured with crisp analog micro-grain.",
    category: "noisy-grainy",
    config: {
      engine: "mesh",
      colors: ["#071717", "#0f766e", "#38bdf8", "#d9f99d"],
      speed: 0.72,
      scale: 1.55,
      distortion: 1.4,
      grain: 0.52,
      dither: 0,
      aberration: 0.15,
      brightness: 1.04,
      contrast: 1.1,
      vignette: 0.38,
      angle: 0.8,
      seed: 9.4,
      animated: true,
    },
  },
  {
    id: "velvet-dither",
    name: "Velvet Dither",
    description:
      "Coarse retro-print halftone transitions blending jade green into warm ivory.",
    category: "dither",
    config: {
      engine: "dither",
      colors: ["#0b1f1a", "#1c6e5c", "#74c69d", "#f4f1de"],
      speed: 0.55,
      scale: 1.25,
      distortion: 0.95,
      grain: 0.16,
      dither: 0.72,
      aberration: 0,
      brightness: 1.03,
      contrast: 1.14,
      vignette: 0.3,
      angle: -0.5,
      seed: 10.6,
      animated: true,
    },
  },
  {
    id: "solar-corona",
    name: "Solar Corona",
    description:
      "Warm volcanic plasma rays piercing through smoked charcoal haze.",
    category: "noisy-grainy",
    config: {
      engine: "godrays",
      colors: ["#120907", "#6b1d14", "#ea580c", "#fde68a"],
      speed: 0.85,
      scale: 1.45,
      distortion: 1.3,
      grain: 0.42,
      dither: 0,
      aberration: 0.22,
      brightness: 1.06,
      contrast: 1.14,
      vignette: 0.55,
      angle: 0.2,
      seed: 11.2,
      animated: true,
    },
  },
  {
    id: "nebula-drift",
    name: "Nebula Drift",
    description:
      "Deep space indigo clouds with electric cyan filaments and subtle star dust.",
    category: "cosmic",
    config: {
      engine: "cosmic",
      colors: ["#040714", "#172554", "#06b6d4", "#e0f2fe"],
      speed: 0.58,
      scale: 1.4,
      distortion: 1.25,
      grain: 0.25,
      dither: 0,
      aberration: 0,
      brightness: 1.08,
      contrast: 1.15,
      vignette: 0.58,
      angle: -0.2,
      seed: 12.7,
      animated: true,
    },
  },
]

export function createDefaultShaderDraft(): ShaderItem {
  return {
    id: `custom-${Date.now()}`,
    name: "Untitled Shader",
    description: "Custom WebGL shader created in Lumen Shader Studio.",
    category: "glass-light",
    isCustom: true,
    createdAt: Date.now(),
    config: {
      engine: "fluted",
      colors: ["#07020c", "#340a4f", "#d91df5", "#ffa8f5"],
      speed: 0.65,
      scale: 1.45,
      distortion: 1.2,
      grain: 0.22,
      dither: 0,
      aberration: 0.3,
      brightness: 1.05,
      contrast: 1.1,
      vignette: 0.32,
      angle: 0,
      seed: Number((Math.random() * 20).toFixed(2)),
      animated: true,
    },
  }
}

export function randomizeShaderConfig(current: ShaderConfig): ShaderConfig {
  const engines: Exclude<ShaderEngine, "custom">[] = [
    "prism-shafts",
    "astral-lobe",
    "velvet-fold",
    "hero-dome",
    "crescent-arc",
    "ecliptic",
    "cubic",
    "flare",
    "cloudscape",
    "horizon",
    "orbital",
    "cumulus",
    "fluted",
    "mesh",
    "halftone",
    "ascii",
    "holographic",
    "prism",
    "glitch",
    "aura",
    "dither",
    "godrays",
    "glass",
    "cosmic",
    "waves",
  ]
  const engine =
    current.engine === "custom"
      ? "custom"
      : engines[Math.floor(Math.random() * engines.length)]
  const palette =
    CURATED_PALETTES[Math.floor(Math.random() * CURATED_PALETTES.length)]
  const shuffled = [...palette.colors].sort(() => Math.random() - 0.5) as [
    string,
    string,
    string,
    string,
  ]

  return {
    ...current,
    engine,
    colors: shuffled,
    speed: Number((0.45 + Math.random() * 0.85).toFixed(2)),
    scale: Number((0.95 + Math.random() * 0.95).toFixed(2)),
    distortion: Number((0.75 + Math.random() * 0.9).toFixed(2)),
    grain: Number((0.1 + Math.random() * 0.42).toFixed(2)),
    dither:
      engine === "dither" ? Number((0.45 + Math.random() * 0.35).toFixed(2)) : 0,
    aberration: Number((Math.random() * 0.55).toFixed(2)),
    brightness: Number((0.98 + Math.random() * 0.14).toFixed(2)),
    contrast: Number((1.02 + Math.random() * 0.18).toFixed(2)),
    vignette: Number((0.15 + Math.random() * 0.4).toFixed(2)),
    angle:
      engine === "fluted" ||
      engine === "glitch" ||
      engine === "cloudscape" ||
      engine === "horizon" ||
      engine === "cumulus" ||
      engine === "cubic" ||
      engine === "hero-dome" ||
      engine === "crescent-arc"
        ? 0
        : engine === "prism-shafts"
          ? 0.68
        : engine === "orbital"
          ? -0.62
          : Number(((Math.random() - 0.5) * 2.4).toFixed(2)),
    seed: Number((Math.random() * 30).toFixed(2)),
  }
}

/**
 * Generates a fresh visual composition in the exact same style and color palette
 * by varying the procedural seed and gentle framing parameters.
 */
export function createStyleVariation(
  current: ShaderConfig,
  index = 0,
): ShaderConfig {
  const jitter = Math.random() * 36 + index * 7.31
  const scaleDelta = (Math.random() - 0.5) * 0.32
  const distDelta = (Math.random() - 0.5) * 0.25
  const angleDelta =
    current.engine === "orbital"
      ? (Math.random() - 0.5) * 0.55
      : current.engine === "horizon" ||
          current.engine === "cloudscape" ||
          current.engine === "cumulus" ||
          current.engine === "fluted"
        ? 0
        : (Math.random() - 0.5) * 0.45

  return {
    ...current,
    seed: Number(((current.seed + jitter) % 40).toFixed(2)),
    scale: Number(Math.min(3.0, Math.max(0.65, current.scale + scaleDelta)).toFixed(2)),
    distortion: Number(
      Math.min(2.2, Math.max(0.45, current.distortion + distDelta)).toFixed(2),
    ),
    angle: Number(Math.min(3.14, Math.max(-3.14, current.angle + angleDelta)).toFixed(2)),
  }
}

export function hexToRgbVec3(hex: string): [number, number, number] {
  const clean = hex.trim().replace(/^#/, "")
  if (clean.length === 3) {
    const r = Number.parseInt(clean[0] + clean[0], 16) / 255
    const g = Number.parseInt(clean[1] + clean[1], 16) / 255
    const b = Number.parseInt(clean[2] + clean[2], 16) / 255
    return [r || 0, g || 0, b || 0]
  }
  if (clean.length >= 6) {
    const r = Number.parseInt(clean.slice(0, 2), 16) / 255
    const g = Number.parseInt(clean.slice(2, 4), 16) / 255
    const b = Number.parseInt(clean.slice(4, 6), 16) / 255
    return [
      Number.isFinite(r) ? r : 0,
      Number.isFinite(g) ? g : 0,
      Number.isFinite(b) ? b : 0,
    ]
  }
  return [0.1, 0.1, 0.1]
}

export function getFallbackGradientStyle(config: ShaderConfig): string {
  const [c1, c2, c3, c4] = config.colors
  const deg = Math.round(((config.angle * 180) / Math.PI + 360) % 360)
  return `radial-gradient(circle at 22% 24%, ${c4} 0%, transparent 52%), radial-gradient(circle at 78% 72%, ${c3} 0%, transparent 58%), linear-gradient(${deg}deg, ${c1}, ${c2})`
}

export function encodeShaderShareParam(item: ShaderItem): string {
  const payload = {
    n: item.name,
    d: item.description,
    cat: item.category,
    c: item.config,
  }
  try {
    const json = JSON.stringify(payload)
    const bytes = new TextEncoder().encode(json)
    let binary = ""
    for (let i = 0; i < bytes.length; i += 1) {
      binary += String.fromCharCode(bytes[i])
    }
    return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "")
  } catch {
    return ""
  }
}

export function decodeShaderShareParam(encoded: string): ShaderItem | null {
  try {
    const padded = encoded.replace(/-/g, "+").replace(/_/g, "/")
    const padLength = (4 - (padded.length % 4)) % 4
    const binary = atob(padded + "=".repeat(padLength))
    const bytes = new Uint8Array(binary.length)
    for (let i = 0; i < binary.length; i += 1) {
      bytes[i] = binary.charCodeAt(i)
    }
    const parsed = JSON.parse(new TextDecoder().decode(bytes)) as {
      n?: string
      d?: string
      cat?: ShaderCategory
      c?: ShaderConfig
    }
    if (!parsed.c || !Array.isArray(parsed.c.colors) || parsed.c.colors.length !== 4) {
      return null
    }
    return {
      id: `shared-${Date.now()}`,
      name: parsed.n || "Shared Shader",
      description: parsed.d || "Imported from shared shader link.",
      category: parsed.cat || "smooth-blends",
      isCustom: true,
      config: parsed.c,
    }
  } catch {
    return null
  }
}

export function generateReactShaderCode(item: ShaderItem): string {
  const fragment = getShaderFragmentSource(item.config).replace(/`/g, "\\`")
  const [c1, c2, c3, c4] = item.config.colors.map(hexToRgbVec3)
  const fmt = (v: [number, number, number]) =>
    `[${v.map((n) => Number(n.toFixed(4))).join(", ")}]`

  return `"use client"

import { useEffect, useRef } from "react"

const VERTEX_SHADER = \`
attribute vec2 a_position;
void main() {
  gl_Position = vec4(a_position, 0.0, 1.0);
}
\`

const FRAGMENT_SHADER = \`
${fragment.trim()}
\`

export function ShaderBackground({ className = "h-full w-full" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const gl = canvas.getContext("webgl", { antialias: true, preserveDrawingBuffer: false })
    if (!gl) return

    const compile = (type: number, src: string) => {
      const shader = gl.createShader(type)!
      gl.shaderSource(shader, src)
      gl.compileShader(shader)
      return shader
    }

    const program = gl.createProgram()!
    gl.attachShader(program, compile(gl.VERTEX_SHADER, VERTEX_SHADER))
    gl.attachShader(program, compile(gl.FRAGMENT_SHADER, FRAGMENT_SHADER))
    gl.linkProgram(program)
    gl.useProgram(program)

    const buffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW)

    const pos = gl.getAttribLocation(program, "a_position")
    gl.enableVertexAttribArray(pos)
    gl.vertexAttribPointer(pos, 2, gl.FLOAT, false, 0, 0)

    const u = (name: string) => gl.getUniformLocation(program, name)
    gl.uniform3fv(u("u_color1"), ${fmt(c1)})
    gl.uniform3fv(u("u_color2"), ${fmt(c2)})
    gl.uniform3fv(u("u_color3"), ${fmt(c3)})
    gl.uniform3fv(u("u_color4"), ${fmt(c4)})
    gl.uniform1f(u("u_speed"), ${item.config.speed})
    gl.uniform1f(u("u_scale"), ${item.config.scale})
    gl.uniform1f(u("u_distortion"), ${item.config.distortion})
    gl.uniform1f(u("u_grain"), ${item.config.grain})
    gl.uniform1f(u("u_dither"), ${item.config.dither})
    gl.uniform1f(u("u_aberration"), ${item.config.aberration ?? 0})
    gl.uniform1f(u("u_brightness"), ${item.config.brightness})
    gl.uniform1f(u("u_contrast"), ${item.config.contrast})
    gl.uniform1f(u("u_vignette"), ${item.config.vignette})
    gl.uniform1f(u("u_angle"), ${item.config.angle})
    gl.uniform1f(u("u_seed"), ${item.config.seed})

    let raf = 0
    const start = performance.now()

    const render = (now: number) => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const w = Math.max(1, Math.floor(canvas.clientWidth * dpr))
      const h = Math.max(1, Math.floor(canvas.clientHeight * dpr))
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w
        canvas.height = h
        gl.viewport(0, 0, w, h)
      }
      gl.uniform2f(u("u_resolution"), w, h)
      gl.uniform1f(u("u_time"), ${item.config.animated ? "(now - start) / 1000" : "0"})
      gl.drawArrays(gl.TRIANGLES, 0, 3)
      ${item.config.animated ? "raf = requestAnimationFrame(render)" : ""}
    }

    raf = requestAnimationFrame(render)
    return () => cancelAnimationFrame(raf)
  }, [])

  return <canvas ref={canvasRef} className={className}${item.config.blur ? ` style={{ filter: "blur(${item.config.blur}px)" }}` : ""} />
}
`
}
