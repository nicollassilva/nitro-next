export type ColorTransform = readonly [number, number, number, number, number, number, number, number];

export type DynamicStyleState = 'default' | 'hover' | 'pressed' | 'disabled';

export interface DynamicStyleLayer {
    colorTransform?: ColorTransform;
    tint?: readonly [number, number, number];
    offsetX?: number;
    offsetY?: number;
    etchingColor?: number;
    etchingPoint?: readonly [number, number];
}

export interface DynamicStyleDef {
    default?: DynamicStyleLayer;
    hover?: DynamicStyleLayer;
    pressed?: DynamicStyleLayer;
    disabled?: DynamicStyleLayer;
    children?: Record<string, DynamicStyleDef>;
}
