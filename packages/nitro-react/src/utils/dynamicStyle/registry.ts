import { effectiveColorTransform, matrixFilterId, needsMatrix } from './colorTransform';
import { DISABLED_TRANSFORM, DYNAMIC_STYLE_STATES, IDENTITY_TRANSFORM } from './constants';
import { type ColorTransform, type DynamicStyleDef } from './types';

const brightness = (multiplier: number): ColorTransform => [multiplier, multiplier, multiplier, 1, 0, 0, 0, 0];

const ETCH_UNDER = { etchingColor: 0x45000000, etchingPoint: [0, 1] } as const;

const DYNAMIC_STYLE_DEFS = {
    brightness_and_shadow_under: {
        default: { colorTransform: IDENTITY_TRANSFORM, ...ETCH_UNDER },
        hover: { colorTransform: brightness(1.15), ...ETCH_UNDER },
        pressed: { colorTransform: brightness(0.85), offsetY: 1 },
        disabled: { colorTransform: DISABLED_TRANSFORM },
        children: {
            '#icon': {
                default: { colorTransform: IDENTITY_TRANSFORM, ...ETCH_UNDER },
                hover: { colorTransform: brightness(1.15), ...ETCH_UNDER },
                pressed: { colorTransform: brightness(0.85), ...ETCH_UNDER },
                disabled: { colorTransform: DISABLED_TRANSFORM },
            },
        },
    },

    brightness_and_shadow_under_gentle: {
        default: { colorTransform: IDENTITY_TRANSFORM, ...ETCH_UNDER },
        hover: { colorTransform: brightness(1.07), ...ETCH_UNDER },
        pressed: { colorTransform: brightness(0.93), ...ETCH_UNDER },
        disabled: { colorTransform: DISABLED_TRANSFORM },
        children: {
            '#icon': {
                default: { colorTransform: IDENTITY_TRANSFORM, ...ETCH_UNDER },
                hover: { colorTransform: brightness(1.07), ...ETCH_UNDER },
                pressed: { colorTransform: brightness(0.93), ...ETCH_UNDER },
                disabled: { colorTransform: DISABLED_TRANSFORM },
            },
        },
    },

    button: {
        default: { colorTransform: IDENTITY_TRANSFORM },
        hover: { colorTransform: brightness(1.1) },
        pressed: { colorTransform: brightness(0.9), offsetY: 1 },
        disabled: { colorTransform: DISABLED_TRANSFORM },
    },

    lifted_hover: {
        default: { colorTransform: IDENTITY_TRANSFORM, ...ETCH_UNDER },
        hover: { colorTransform: IDENTITY_TRANSFORM, offsetY: -1, etchingColor: 0x66000000, etchingPoint: [0, 2] },
        pressed: { colorTransform: brightness(0.9), offsetY: 1 },
        disabled: { colorTransform: DISABLED_TRANSFORM },
    },
} satisfies Record<string, DynamicStyleDef>;

export type DynamicStyleName = keyof typeof DYNAMIC_STYLE_DEFS;

export const DYNAMIC_STYLES: Record<DynamicStyleName, DynamicStyleDef> = DYNAMIC_STYLE_DEFS;

export const getDynamicStyleDef = (name?: DynamicStyleName, tag?: string): DynamicStyleDef | undefined => {
    const root = name ? DYNAMIC_STYLES[name] : undefined;

    if (!root) return undefined;

    return tag ? root.children?.[tag] : root;
};

export const collectMatrixTransforms = (): Array<[string, ColorTransform]> => {
    const found = new Map<string, ColorTransform>();

    const visit = (def: DynamicStyleDef) => {
        for (const state of DYNAMIC_STYLE_STATES) {
            const ct = effectiveColorTransform(def[state]);

            if (ct && needsMatrix(ct)) found.set(matrixFilterId(ct), ct);
        }

        for (const child of Object.values(def.children ?? {})) visit(child);
    };

    for (const def of Object.values(DYNAMIC_STYLES)) visit(def);

    return [...found];
};
