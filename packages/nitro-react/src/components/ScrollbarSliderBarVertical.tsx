import { forwardRef, type HTMLAttributes } from 'react';

import { cn, cva, type VariantProps } from '#base/utils';
import { useTintedVars } from '#base/utils';

const scrollbarSliderBarVerticalVariantsConfig = {
    variant: {
        // default
        '0': '[border-image-source:var(--scrollbarsliderbarvertical-0-default-src)] [border-image-slice:2_0_2_0_fill] [border-image-width:2px_0px_2px_0px] [border-image-repeat:stretch] [image-rendering:pixelated] active:[border-image-source:var(--scrollbarsliderbarvertical-0-pressed-src)] active:[border-image-slice:2_0_2_0_fill] active:[border-image-width:2px_0px_2px_0px] active:[border-image-repeat:stretch] active:[image-rendering:pixelated]',
        // black
        '1': '[border-image-source:var(--scrollbarsliderbarvertical-1-default-src)] [border-image-slice:2_0_2_0_fill] [border-image-width:2px_0px_2px_0px] [border-image-repeat:stretch] [image-rendering:pixelated] active:[border-image-source:var(--scrollbarsliderbarvertical-1-default-src)] active:[border-image-slice:2_0_2_0_fill] active:[border-image-width:2px_0px_2px_0px] active:[border-image-repeat:stretch] active:[image-rendering:pixelated]',
        // default
        '3': '[border-image-source:var(--scrollbarsliderbarvertical-3-default-src)] [border-image-slice:5_0_5_0_fill] [border-image-width:5px_0px_5px_0px] [border-image-repeat:stretch_repeat] [image-rendering:pixelated] hover:[border-image-source:var(--scrollbarsliderbarvertical-3-hovering-src)] hover:[border-image-slice:5_0_5_0_fill] hover:[border-image-width:5px_0px_5px_0px] hover:[border-image-repeat:stretch_repeat] hover:[image-rendering:pixelated] active:[border-image-source:var(--scrollbarsliderbarvertical-3-pressed-src)] active:[border-image-slice:5_0_5_0_fill] active:[border-image-width:5px_0px_5px_0px] active:[border-image-repeat:stretch_repeat] active:[image-rendering:pixelated]',
        // default
        '100': '[border-image-source:var(--scrollbarsliderbarvertical-100-default-src)] [border-image-slice:4_0_4_0_fill] [border-image-width:4px_0px_4px_0px] [border-image-repeat:stretch] [image-rendering:pixelated]',
        // default
        '200': '[border-image-source:var(--scrollbarsliderbarvertical-200-default-src)] [border-image-slice:4_0_4_0_fill] [border-image-width:4px_0px_4px_0px] [border-image-repeat:stretch] [image-rendering:pixelated]',
    },
} as const;

const scrollbarSliderBarVerticalOverlayVariantsConfig = {
    variant: {
        // default
        '0': '[background-image:var(--scrollbarsliderbarvertical-0-default-grd-src)] bg-position-[left_5px_top_0px] bg-size-[7px_10px] [background-repeat:no-repeat_repeat] [image-rendering:pixelated] active:[background-image:var(--scrollbarsliderbarvertical-0-pressed-grd-src)] active:bg-position-[left_5px_top_0px] active:bg-size-[7px_10px] active:[background-repeat:no-repeat_repeat] active:[image-rendering:pixelated]',
        // black
        '1': '[background-image:var(--scrollbarsliderbarvertical-1-default-grd-src)] bg-position-[left_5px_top_0px] bg-size-[7px_10px] [background-repeat:no-repeat_repeat] [image-rendering:pixelated] active:[background-image:var(--scrollbarsliderbarvertical-1-default-grd-src)] active:bg-position-[left_5px_top_0px] active:bg-size-[7px_10px] active:[background-repeat:no-repeat_repeat] active:[image-rendering:pixelated]',
        // default
        '3': '',
        // default
        '100': '',
        // default
        '200': '',
    },
} as const;

/** This component's own default tint per variant, from the skin's own `<window color="…">` — a caller-supplied `tintColor` prop always overrides this. */
const scrollbarSliderBarVerticalTintColors: Partial<Record<string, string>> = {

};

/** Which CSS vars (bare, no `--`) each variant's own art actually needs recolored — see `#base/useTintedVars`. */
const scrollbarSliderBarVerticalTintableVars: Partial<Record<string, string[]>> = {
    '0': ['scrollbarsliderbarvertical-0-default-src', 'scrollbarsliderbarvertical-0-pressed-src'],
    '1': ['scrollbarsliderbarvertical-1-default-src'],
    '3': ['scrollbarsliderbarvertical-3-default-src', 'scrollbarsliderbarvertical-3-hovering-src', 'scrollbarsliderbarvertical-3-pressed-src'],
    '100': ['scrollbarsliderbarvertical-100-default-src'],
    '200': ['scrollbarsliderbarvertical-200-default-src'],
};

const scrollbarSliderBarVerticalVariants = cva('', { variants: scrollbarSliderBarVerticalVariantsConfig, defaultVariants: { variant: '0' } });
const scrollbarSliderBarVerticalOverlayVariants = cva('', { variants: scrollbarSliderBarVerticalOverlayVariantsConfig, defaultVariants: { variant: '0' } });

type ScrollbarSliderBarVerticalVariantProps = VariantProps<typeof scrollbarSliderBarVerticalVariantsConfig>;

interface ScrollbarSliderBarVerticalProps extends HTMLAttributes<HTMLDivElement>, ScrollbarSliderBarVerticalVariantProps {
    className?: string;
    /** Recolors this variant's tintable art at runtime — overrides this variant's own default color from the skin, if it has one (see `#base/pixiTint`). */
    tintColor?: string;
}

export const ScrollbarSliderBarVertical = forwardRef<HTMLDivElement, ScrollbarSliderBarVerticalProps>(
    ({ className, variant, tintColor, style, children, ...props }, ref) => {
        const resolvedVariant = variant ?? '0';
        const resolvedTint = tintColor || scrollbarSliderBarVerticalTintColors[resolvedVariant];
        const overlayClassName = scrollbarSliderBarVerticalOverlayVariants({ variant });
        const tintStyle = useTintedVars(scrollbarSliderBarVerticalTintableVars[resolvedVariant], resolvedTint);

        return (
            <div
                ref={ref}
                className={cn(scrollbarSliderBarVerticalVariants({ variant }), overlayClassName && 'relative', className)}
                style={{ ...style, ...tintStyle }}
                {...props}
            >
                {overlayClassName && <div aria-hidden className={cn('pointer-events-none absolute inset-0', overlayClassName)} />}
                {children}
            </div>
        );
    }
);

ScrollbarSliderBarVertical.displayName = 'ScrollbarSliderBarVertical';
