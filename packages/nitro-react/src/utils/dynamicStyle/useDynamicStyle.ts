import { type CSSProperties, useMemo } from 'react';

import { DISABLED_TRANSFORM, DYNAMIC_STYLE_STATES } from './constants';
import { type DynamicStyleName, getDynamicStyleDef } from './registry';
import { toCssColorFilter, toCssFilter, toCssTextShadow, toCssTranslate } from './toCss';
import { type DynamicStyleLayer } from './types';

const DISABLED_FALLBACK: DynamicStyleLayer = { colorTransform: DISABLED_TRANSFORM };

export const useDynamicStyle = (name?: DynamicStyleName, tag?: string): CSSProperties | undefined =>
    useMemo(() => {
        const def = getDynamicStyleDef(name, tag);

        if (!def) return undefined;

        const vars: Record<string, string> = {};

        for (const state of DYNAMIC_STYLE_STATES) {
            const layer = def[state] ?? (state === 'disabled' ? DISABLED_FALLBACK : undefined);

            vars[`--dyn-f-${state}`] = toCssFilter(layer);
            vars[`--dyn-cf-${state}`] = toCssColorFilter(layer);
            vars[`--dyn-t-${state}`] = toCssTranslate(layer);
            vars[`--dyn-ts-${state}`] = toCssTextShadow(layer);
        }

        return vars;
    }, [name, tag]);
