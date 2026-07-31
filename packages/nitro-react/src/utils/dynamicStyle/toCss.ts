import { argbToCss, colorTransformToFilter, effectiveColorTransform } from './colorTransform';
import { type DynamicStyleLayer } from './types';

const etchingOf = (layer?: DynamicStyleLayer) => {
    const color = layer?.etchingColor;
    const point = layer?.etchingPoint;

    if (!point || color === undefined || ((color >>> 24) & 0xff) === 0) return undefined;

    return `${point[0]}px ${point[1]}px 0 ${argbToCss(color)}`;
};

export const toCssColorFilter = (layer?: DynamicStyleLayer): string => colorTransformToFilter(effectiveColorTransform(layer));

export const toCssFilter = (layer?: DynamicStyleLayer): string => {
    const etching = etchingOf(layer);
    const colorFilter = toCssColorFilter(layer);

    return etching ? `${colorFilter} drop-shadow(${etching})` : colorFilter;
};

export const toCssTextShadow = (layer?: DynamicStyleLayer): string => etchingOf(layer) ?? 'none';

export const toCssTranslate = (layer?: DynamicStyleLayer) => `${layer?.offsetX ?? 0}px ${layer?.offsetY ?? 0}px`;
