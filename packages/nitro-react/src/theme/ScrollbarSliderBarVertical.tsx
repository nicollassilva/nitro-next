import { forwardRef, type HTMLAttributes } from 'react';

import { cn, cva, useCascadedVariant, useTintedVars, VariantCascadeProvider, type VariantProps } from './utils';
import { VARIANT_CASCADE_CONFIG } from './VariantConfig';

const scrollbarSliderBarVerticalVariantsConfig = {
    variant: {
        // default
        '0': '[border-image-source:var(--scrollbarsliderbarvertical-0-default-src)] [border-image-slice:2_0_2_0_fill] [border-image-width:2px_0px_2px_0px] nine-slice-border active:[border-image-source:var(--scrollbarsliderbarvertical-0-pressed-src)] active:[border-image-slice:2_0_2_0_fill] active:[border-image-width:2px_0px_2px_0px] ',
        // black
        '1': '[border-image-source:var(--scrollbarsliderbarvertical-1-default-src)] [border-image-slice:2_0_2_0_fill] [border-image-width:2px_0px_2px_0px] nine-slice-border active:[border-image-source:var(--scrollbarsliderbarvertical-1-default-src)] active:[border-image-slice:2_0_2_0_fill] active:[border-image-width:2px_0px_2px_0px] ',
        // default
        '3': '[border-image-source:var(--scrollbarsliderbarvertical-3-default-src)] [border-image-slice:5_0_5_0_fill] [border-image-width:5px_0px_5px_0px] [border-image-repeat:stretch_repeat] [image-rendering:pixelated] hover:[border-image-source:var(--scrollbarsliderbarvertical-3-hovering-src)] hover:[border-image-slice:5_0_5_0_fill] hover:[border-image-width:5px_0px_5px_0px] hover:[border-image-repeat:stretch_repeat]  active:[border-image-source:var(--scrollbarsliderbarvertical-3-pressed-src)] active:[border-image-slice:5_0_5_0_fill] active:[border-image-width:5px_0px_5px_0px] active:[border-image-repeat:stretch_repeat] ',
        // default
        '100': '[border-image-source:var(--scrollbarsliderbarvertical-100-default-src)] [border-image-slice:4_0_4_0_fill] [border-image-width:4px_0px_4px_0px] nine-slice-border',
        // default
        '200': '[border-image-source:var(--scrollbarsliderbarvertical-200-default-src)] [border-image-slice:4_0_4_0_fill] [border-image-width:4px_0px_4px_0px] nine-slice-border',
    },
} as const;

const scrollbarSliderBarVerticalOverlayVariantsConfig = {
    variant: {
        // default
        '0': 'bg-(image:--scrollbarsliderbarvertical-0-default-grd-src) bg-position-[left_5px_top_0px] bg-size-[7px_10px] bg-repeat-y [image-rendering:pixelated] active:bg-(image:--scrollbarsliderbarvertical-0-pressed-grd-src) active:bg-position-[left_5px_top_0px] active:bg-size-[7px_10px]',
        // black
        '1': 'bg-(image:--scrollbarsliderbarvertical-1-default-grd-src) bg-position-[left_5px_top_0px] bg-size-[7px_10px] bg-repeat-y [image-rendering:pixelated] active:bg-(image:--scrollbarsliderbarvertical-1-default-grd-src) active:bg-position-[left_5px_top_0px] active:bg-size-[7px_10px]',
        // default
        '3': '',
        // default
        '100': '',
        // default
        '200': '',
    },
} as const;

const scrollbarSliderBarVerticalOverlayInsetConfig: Partial<Record<string, string>> = {
    '0': 'inset-x-0 top-1 bottom-1',
    '1': 'inset-x-0 top-1 bottom-1',
}

const scrollbarSliderBarVerticalTintColors: Partial<Record<string, string>> = {

};

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
    tintColor?: string;
    defaultVariant?: string;
}

export const ScrollbarSliderBarVertical = forwardRef<HTMLDivElement, ScrollbarSliderBarVerticalProps>(
    ({ className, variant, defaultVariant, tintColor, style, children, ...props }, ref) => {
        const cascadedVariant = useCascadedVariant('scrollbarSliderBarVertical');
        const resolvedVariant = (variant ?? cascadedVariant ?? defaultVariant ?? '0') as never;
        const ownCascade = VARIANT_CASCADE_CONFIG['scrollbarSliderBarVertical']?.[resolvedVariant as string];
        const resolvedTint = tintColor || scrollbarSliderBarVerticalTintColors[resolvedVariant as string];
        const overlayClassName = scrollbarSliderBarVerticalOverlayVariants({ variant: resolvedVariant });
        const overlayInsetClassName = scrollbarSliderBarVerticalOverlayInsetConfig[resolvedVariant as string] ?? 'inset-0';
        const tintStyle = useTintedVars(scrollbarSliderBarVerticalTintableVars[resolvedVariant as string], resolvedTint);

        return (
            <div
                ref={ref}
                className={cn(scrollbarSliderBarVerticalVariants({ variant: resolvedVariant }), overlayClassName && 'relative', className)}
                style={{ ...style, ...tintStyle }}
                {...props}
            >
                {overlayClassName && <div aria-hidden className={cn('pointer-events-none absolute', overlayInsetClassName, overlayClassName)} />}
                <VariantCascadeProvider map={ownCascade}>{children}</VariantCascadeProvider>
            </div>
        );
    }
);

ScrollbarSliderBarVertical.displayName = 'ScrollbarSliderBarVertical';
