import { type ColorTransform, type DynamicStyleLayer } from './types';

const near = (a: number, b: number, epsilon = 0.001) => Math.abs(a - b) < epsilon;

export const effectiveColorTransform = (layer?: DynamicStyleLayer): ColorTransform | undefined => {
    const ct = layer?.colorTransform;

    if (!ct) return undefined;

    const tint = layer?.tint;

    if (!tint) return ct;

    return [(ct[0] * tint[0]) / 255, (ct[1] * tint[1]) / 255, (ct[2] * tint[2]) / 255, ct[3], ct[4], ct[5], ct[6], ct[7]];
};

export const needsMatrix = (ct?: ColorTransform): boolean => {
    if (!ct) return false;

    const [rm, gm, bm, , ro, go, bo] = ct;

    return !(near(rm, gm) && near(gm, bm)) || ro !== 0 || go !== 0 || bo !== 0;
};

export const matrixFilterId = (ct: ColorTransform) => `dyn-mtx-${ct.map(n => String(n).replace(/[^0-9a-z]/gi, '_')).join('-')}`;

export const matrixFilterValues = (ct: ColorTransform) => {
    const [rm, gm, bm, am, ro, go, bo, ao] = ct;

    return [
        [rm, 0, 0, 0, ro / 255],
        [0, gm, 0, 0, go / 255],
        [0, 0, bm, 0, bo / 255],
        [0, 0, 0, am, ao / 255],
    ]
        .flat()
        .join(' ');
};

export const colorTransformToFilter = (ct?: ColorTransform): string => {
    if (!ct) return 'brightness(1)';

    const parts: string[] = [needsMatrix(ct) ? `url(#${matrixFilterId(ct)})` : `brightness(${ct[0]})`];

    if (!near(ct[3], 1)) parts.push(`opacity(${ct[3]})`);

    return parts.join(' ');
};

export const argbToCss = (argb: number) => {
    const alpha = ((argb >>> 24) & 0xff) / 255;

    return `rgb(${(argb >>> 16) & 0xff} ${(argb >>> 8) & 0xff} ${argb & 0xff} / ${alpha})`;
};
