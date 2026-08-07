import { forwardRef, type HTMLAttributes } from 'react';

import { cn, cva, useCascadedVariant, useTintedVars, VariantCascadeProvider, type VariantProps } from './utils';
import { VARIANT_CASCADE_CONFIG } from './VariantConfig';

const scrollbarSliderBarHorizontalVariantsConfig = {
    variant: {
        // default
        '0': '[border-image-source:var(--scrollbarsliderbarhorizontal-0-default-src)] [border-image-slice:0_2_0_2_fill] [border-image-width:0px_2px_0px_2px] nine-slice-border active:[border-image-source:var(--scrollbarsliderbarhorizontal-0-pressed-src)] active:[border-image-slice:0_2_0_2_fill] active:[border-image-width:0px_2px_0px_2px] ',
        // black
        '1': '[border-image-source:var(--scrollbarsliderbarhorizontal-1-default-src)] [border-image-slice:0_2_0_2_fill] [border-image-width:0px_2px_0px_2px] nine-slice-border active:[border-image-source:var(--scrollbarsliderbarhorizontal-1-default-src)] active:[border-image-slice:0_2_0_2_fill] active:[border-image-width:0px_2px_0px_2px] ',
        // default
        '3': '[border-image-source:var(--scrollbarsliderbarhorizontal-3-default-src)] [border-image-slice:0_5_0_5_fill] [border-image-width:0px_5px_0px_5px] [border-image-repeat:repeat_stretch] [image-rendering:pixelated] hover:[border-image-source:var(--scrollbarsliderbarhorizontal-3-hovering-src)] hover:[border-image-slice:0_5_0_5_fill] hover:[border-image-width:0px_5px_0px_5px] hover:[border-image-repeat:repeat_stretch]  active:[border-image-source:var(--scrollbarsliderbarhorizontal-3-pressed-src)] active:[border-image-slice:0_5_0_5_fill] active:[border-image-width:0px_5px_0px_5px] active:[border-image-repeat:repeat_stretch] ',
        // default
        '100': '[border-image-source:var(--scrollbarsliderbarhorizontal-100-default-src)] [border-image-slice:0_4_0_4_fill] [border-image-width:0px_4px_0px_4px] nine-slice-border',
        // default
        '200': '[border-image-source:var(--scrollbarsliderbarhorizontal-200-default-src)] [border-image-slice:0_4_0_4_fill] [border-image-width:0px_4px_0px_4px] nine-slice-border',
    },
} as const;

const scrollbarSliderBarHorizontalOverlayVariantsConfig = {
    variant: {
        // default
        '0': 'bg-(image:--scrollbarsliderbarhorizontal-0-default-grd-src) bg-position-[left_0px_top_5px] bg-size-[10px_7px] bg-no-repeat [image-rendering:pixelated] active:bg-(image:--scrollbarsliderbarhorizontal-0-pressed-grd-src) active:bg-position-[left_0px_top_5px] active:bg-size-[10px_7px] active:[background-repeat:repeat_no-repeat] ',
        // black
        '1': 'bg-(image:--scrollbarsliderbarhorizontal-1-default-grd-src) bg-position-[left_0px_top_5px] bg-size-[10px_7px] bg-no-repeat [image-rendering:pixelated] active:bg-(image:--scrollbarsliderbarhorizontal-1-default-grd-src) active:bg-position-[left_0px_top_5px] active:bg-size-[10px_7px] active:[background-repeat:repeat_no-repeat] ',
        // default
        '3': '',
        // default
        '100': '',
        // default
        '200': '',
    },
} as const;

const scrollbarSliderBarHorizontalOverlayInsetConfig: Partial<Record<string, string>> = {
    '0': 'inset-y-0 left-0.5 right-0.5',
}

const scrollbarSliderBarHorizontalTintColors: Partial<Record<string, string>> = {

};

const scrollbarSliderBarHorizontalTintableVars: Partial<Record<string, string[]>> = {
    '0': ['scrollbarsliderbarhorizontal-0-default-src', 'scrollbarsliderbarhorizontal-0-pressed-src'],
    '1': ['scrollbarsliderbarhorizontal-1-default-src'],
    '3': ['scrollbarsliderbarhorizontal-3-default-src', 'scrollbarsliderbarhorizontal-3-hovering-src', 'scrollbarsliderbarhorizontal-3-pressed-src'],
    '100': ['scrollbarsliderbarhorizontal-100-default-src'],
    '200': ['scrollbarsliderbarhorizontal-200-default-src'],
};

const scrollbarSliderBarHorizontalVariants = cva('', { variants: scrollbarSliderBarHorizontalVariantsConfig, defaultVariants: { variant: '0' } });
const scrollbarSliderBarHorizontalOverlayVariants = cva('', { variants: scrollbarSliderBarHorizontalOverlayVariantsConfig, defaultVariants: { variant: '0' } });

type ScrollbarSliderBarHorizontalVariantProps = VariantProps<typeof scrollbarSliderBarHorizontalVariantsConfig>;

interface ScrollbarSliderBarHorizontalProps extends HTMLAttributes<HTMLDivElement>, ScrollbarSliderBarHorizontalVariantProps {
    className?: string;
    tintColor?: string;
    defaultVariant?: string;
}

export const ScrollbarSliderBarHorizontal = forwardRef<HTMLDivElement, ScrollbarSliderBarHorizontalProps>(
    ({ className, variant, defaultVariant, tintColor, style, children, ...props }, ref) => {
        const cascadedVariant = useCascadedVariant('scrollbarSliderBarHorizontal');
        const resolvedVariant = (variant ?? cascadedVariant ?? defaultVariant ?? '0') as never;
        const ownCascade = VARIANT_CASCADE_CONFIG['scrollbarSliderBarHorizontal']?.[resolvedVariant as string];
        const resolvedTint = tintColor || scrollbarSliderBarHorizontalTintColors[resolvedVariant as string];
        const overlayClassName = scrollbarSliderBarHorizontalOverlayVariants({ variant: resolvedVariant });
        const overlayInsetClassName = scrollbarSliderBarHorizontalOverlayInsetConfig[resolvedVariant as string] ?? 'inset-0';
        const tintStyle = useTintedVars(scrollbarSliderBarHorizontalTintableVars[resolvedVariant as string], resolvedTint);

        return (
            <div
                ref={ref}
                className={cn(scrollbarSliderBarHorizontalVariants({ variant: resolvedVariant }), overlayClassName && 'relative', className)}
                style={{ ...style, ...tintStyle }}
                {...props}
            >
                {overlayClassName && <div aria-hidden className={cn('pointer-events-none absolute', overlayInsetClassName, overlayClassName)} />}
                <VariantCascadeProvider map={ownCascade}>{children}</VariantCascadeProvider>
            </div>
        );
    }
);

ScrollbarSliderBarHorizontal.displayName = 'ScrollbarSliderBarHorizontal';
