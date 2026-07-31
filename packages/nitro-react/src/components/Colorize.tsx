import { type CSSProperties, forwardRef, type HTMLAttributes, type ReactNode } from 'react';

import { cn, DYNAMIC_ART_CLASS, DYNAMIC_ROOT_CLASS, type DynamicStyleName, hexToCssFilter, useDynamicStyle } from '#base/utils';

interface ColorizeProps extends HTMLAttributes<HTMLDivElement> {
    /** Raw color (e.g. `"#418db0"`) to multiply-tint `layerClassName`'s image by. Omit/empty renders it un-tinted. */
    tintColor?: string;
    /** The variant's own border-image/background-image classes — the layer that gets tinted. */
    layerClassName?: string;
    /**
     * A second image layer stacked on top of the tinted one that's never
     * tinted itself — e.g. a frame's own "shine" gloss highlight, drawn over
     * its colored base regardless of what color the base is.
     */
    overlayClassName?: string;
    dynamicStyle?: DynamicStyleName;
    disabled?: boolean;
    children?: ReactNode;
}

/**
 * Runtime replacement for the old build-time pixel-tinting pass: rather than
 * baking a specific color into the extracted PNG at generation time (one
 * fixed color per variant, forever), `layerClassName`'s image is always
 * extracted/composed neutral, and colored here via a CSS `filter` computed
 * from `tintColor` on demand (see `colorFilter.ts`) — the same art can be
 * recolored to anything at runtime, not just whatever the skin's own
 * `<window color="…">` happened to specify.
 *
 * `className`/`style`/other DOM props land on the *outer* box (so a
 * consumer's own sizing/positioning classes, and this variant's own
 * min-w/min-h etc., actually apply to something with real dimensions) —
 * `layerClassName`/`overlayClassName` are absolutely-positioned children
 * filling that box, not the box itself.
 */
export const Colorize = forwardRef<HTMLDivElement, ColorizeProps>(
    ({ tintColor, layerClassName, overlayClassName, dynamicStyle, disabled, children, className, style, ...props }, ref) => {
        const dynamicVars = useDynamicStyle(dynamicStyle);

        const layerStyle = dynamicVars
            ? ({ '--tint-f': tintColor ? hexToCssFilter(tintColor) : 'brightness(1)' } as CSSProperties)
            : tintColor
              ? { filter: hexToCssFilter(tintColor) }
              : undefined;

        return (
            <div
                ref={ref}
                data-disabled={disabled || undefined}
                className={cn('relative', dynamicVars && DYNAMIC_ROOT_CLASS)}
                style={{ ...style, ...dynamicVars }}
                {...props}
            >
                <div
                    aria-hidden
                    className={cn('pointer-events-none absolute inset-0', layerClassName, dynamicVars && DYNAMIC_ART_CLASS)}
                    style={layerStyle}
                />
                {overlayClassName && <div aria-hidden className={cn('pointer-events-none absolute inset-0', overlayClassName)} />}
                <div className={cn('relative z-10 size-full', className)}>{children}</div>
            </div>
        );
    }
);

Colorize.displayName = 'Colorize';
