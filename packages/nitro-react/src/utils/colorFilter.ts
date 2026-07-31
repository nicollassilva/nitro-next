/**
 * Converts a raw `#rrggbb` color into a CSS `filter` value that recolors a
 * white/light-grey source image to approximately that color — the runtime
 * replacement for the old build-time pixel-tinting pass (`colorize`
 * entities used to be multiply-tinted into the extracted PNG itself; see
 * `Colorize.tsx`). Habbo's colorize-flagged art is drawn white/light-grey
 * specifically so a simple per-channel multiply recolors it to any skin
 * color — `hue-rotate`/`saturate`/etc. have no effect on pure white or pure
 * black (both are achromatic, no hue to rotate), so the classic
 * "recolor a black icon via CSS filter" technique (e.g.
 * https://codepen.io/sosuke/pen/Pjoqqp) doesn't directly apply here; this
 * runs the same kind of numeric search but against a *white* starting point
 * to match what these sprites actually are.
 *
 * There's no closed-form solution for "which filter values produce color X
 * from white" — `solve()` does a small coordinate-descent search (nudge one
 * parameter at a time, keep whatever reduces the error, from a few different
 * starting points to avoid local minima) against the exact per-channel math
 * the CSS filters themselves define (`FILTER_SPEC`), landing within a couple
 * pixel values of the target for every color this skin actually uses.
 * Result is memoized per input color since it's the same handful of colors
 * (a skin's `<window color="…">` values) reused across many components.
 */

interface Rgb {
    r: number;
    g: number;
    b: number;
}

const WHITE: Rgb = { r: 1, g: 1, b: 1 };

function clamp01(x: number): number {
    return Math.min(1, Math.max(0, x));
}

function parseHex(hex: string): Rgb {
    const clean = hex.replace(/^#/, '');
    const full = clean.length === 3
        ? clean.split('').map((c) => c + c).join('')
        : clean.padStart(6, '0');
    const n = parseInt(full.slice(0, 6), 16);
    return { r: ((n >> 16) & 0xff) / 255, g: ((n >> 8) & 0xff) / 255, b: (n & 0xff) / 255 };
}

function invert({ r, g, b }: Rgb, amount: number): Rgb {
    return { r: r + amount * (1 - 2 * r), g: g + amount * (1 - 2 * g), b: b + amount * (1 - 2 * b) };
}

/** Per-channel matrix from the CSS Filter Effects spec, lerped toward identity by `amount`. */
function sepia({ r, g, b }: Rgb, amount: number): Rgb {
    const sr = 0.393 * r + 0.769 * g + 0.189 * b;
    const sg = 0.349 * r + 0.686 * g + 0.168 * b;
    const sb = 0.272 * r + 0.534 * g + 0.131 * b;
    return { r: r + (sr - r) * amount, g: g + (sg - g) * amount, b: b + (sb - b) * amount };
}

/** Luminance-preserving saturation matrix, per the CSS Filter Effects spec. */
function saturate({ r, g, b }: Rgb, amount: number): Rgb {
    const lr = 0.213;
    const lg = 0.715;
    const lb = 0.072;
    return {
        r: (lr + (1 - lr) * amount) * r + (lg - lg * amount) * g + (lb - lb * amount) * b,
        g: (lr - lr * amount) * r + (lg + (1 - lg) * amount) * g + (lb - lb * amount) * b,
        b: (lr - lr * amount) * r + (lg - lg * amount) * g + (lb + (1 - lb) * amount) * b,
    };
}

/** Hue-rotation matrix (cos/sin form), per the CSS Filter Effects spec. */
function hueRotate({ r, g, b }: Rgb, deg: number): Rgb {
    const rad = (deg * Math.PI) / 180;
    const cos = Math.cos(rad);
    const sin = Math.sin(rad);
    const m = [
        0.213 + cos * 0.787 - sin * 0.213, 0.715 - cos * 0.715 - sin * 0.715, 0.072 - cos * 0.072 + sin * 0.928,
        0.213 - cos * 0.213 + sin * 0.143, 0.715 + cos * 0.285 + sin * 0.14, 0.072 - cos * 0.072 - sin * 0.283,
        0.213 - cos * 0.213 - sin * 0.787, 0.715 - cos * 0.715 + sin * 0.715, 0.072 + cos * 0.928 + sin * 0.072,
    ];
    return {
        r: m[0] * r + m[1] * g + m[2] * b,
        g: m[3] * r + m[4] * g + m[5] * b,
        b: m[6] * r + m[7] * g + m[8] * b,
    };
}

function brightness({ r, g, b }: Rgb, amount: number): Rgb {
    return { r: r * amount, g: g * amount, b: b * amount };
}

function contrast({ r, g, b }: Rgb, amount: number): Rgb {
    const f = (c: number) => (c - 0.5) * amount + 0.5;
    return { r: f(r), g: f(g), b: f(b) };
}

interface FilterParams {
    invert: number;
    sepia: number;
    saturate: number;
    hueRotate: number;
    brightness: number;
    contrast: number;
}

function simulate(base: Rgb, p: FilterParams): Rgb {
    let c = invert(base, p.invert);
    c = sepia(c, p.sepia);
    c = saturate(c, p.saturate);
    c = hueRotate(c, p.hueRotate);
    c = brightness(c, p.brightness);
    c = contrast(c, p.contrast);
    return { r: clamp01(c.r), g: clamp01(c.g), b: clamp01(c.b) };
}

function loss(a: Rgb, b: Rgb): number {
    return (a.r - b.r) ** 2 + (a.g - b.g) ** 2 + (a.b - b.b) ** 2;
}

const STEP: FilterParams = { invert: 0.05, sepia: 0.05, saturate: 0.2, hueRotate: 5, brightness: 0.05, contrast: 0.05 };
const STARTING_POINTS: FilterParams[] = [
    { invert: 0, sepia: 0, saturate: 1, hueRotate: 0, brightness: 1, contrast: 1 },
    { invert: 0.3, sepia: 0.5, saturate: 2, hueRotate: 90, brightness: 0.8, contrast: 1 },
    { invert: 0.6, sepia: 0.8, saturate: 4, hueRotate: 180, brightness: 0.7, contrast: 1 },
    { invert: 0.9, sepia: 0.9, saturate: 6, hueRotate: 270, brightness: 0.6, contrast: 1 },
];

function solve(target: Rgb): FilterParams {
    let best = STARTING_POINTS[0];
    let bestLoss = Infinity;
    for (const start of STARTING_POINTS) {
        let current = { ...start };
        let currentLoss = loss(simulate(WHITE, current), target);
        for (let round = 0; round < 3; round++) {
            const scale = 1 - round * 0.3;
            for (let iter = 0; iter < 2000; iter++) {
                const key = (Object.keys(STEP) as Array<keyof FilterParams>)[iter % 6];
                const step = STEP[key] * scale;
                for (const sign of [1, -1]) {
                    const candidate = { ...current, [key]: current[key] + step * sign };
                    if (key !== 'hueRotate') candidate[key] = Math.max(0, candidate[key]);
                    const candidateLoss = loss(simulate(WHITE, candidate), target);
                    if (candidateLoss < currentLoss) {
                        current = candidate;
                        currentLoss = candidateLoss;
                    }
                }
            }
        }
        if (currentLoss < bestLoss) {
            bestLoss = currentLoss;
            best = current;
        }
    }
    return best;
}

const round2 = (n: number) => Math.round(n * 100) / 100;

const filterCache = new Map<string, string>();

/** Recolors a white/light-grey source to approximately `hex` (e.g. `"#418db0"`). Memoized per color. */
export function hexToCssFilter(hex: string): string {
    const cached = filterCache.get(hex);
    if (cached) return cached;
    const params = solve(parseHex(hex));
    const filter = [
        `invert(${round2(params.invert * 100)}%)`,
        `sepia(${round2(params.sepia * 100)}%)`,
        `saturate(${round2(params.saturate * 100)}%)`,
        `hue-rotate(${round2(params.hueRotate)}deg)`,
        `brightness(${round2(params.brightness * 100)}%)`,
        `contrast(${round2(params.contrast * 100)}%)`,
    ].join(' ');
    filterCache.set(hex, filter);
    return filter;
}
