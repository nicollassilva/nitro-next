import { forwardRef, type HTMLAttributes } from 'react';

import { cn, cva, type VariantProps } from '#base/utils';

const scrollbarSliderBarVerticalVariantsConfig = {
    variant: {
        // default
        '0': '[border-image-source:var(--scrollbarsliderbarvertical-0-default-src)] [border-image-slice:2_0_2_0_fill] [border-image-width:2px_0px_2px_0px] [border-image-repeat:stretch] active:[border-image-source:var(--scrollbarsliderbarvertical-0-pressed-src)] active:[border-image-slice:2_0_2_0_fill] active:[border-image-width:2px_0px_2px_0px] active:[border-image-repeat:stretch]',
        // black
        '1': '[border-image-source:var(--scrollbarsliderbarvertical-1-default-src)] [border-image-slice:2_0_2_0_fill] [border-image-width:2px_0px_2px_0px] [border-image-repeat:stretch] active:[border-image-source:var(--scrollbarsliderbarvertical-1-default-src)] active:[border-image-slice:2_0_2_0_fill] active:[border-image-width:2px_0px_2px_0px] active:[border-image-repeat:stretch]',
        // default
        '3': '[border-image-source:var(--scrollbarsliderbarvertical-3-default-src)] [border-image-slice:5_0_5_0_fill] [border-image-width:5px_0px_5px_0px] [border-image-repeat:stretch_repeat] hover:[border-image-source:var(--scrollbarsliderbarvertical-3-hovering-src)] hover:[border-image-slice:5_0_5_0_fill] hover:[border-image-width:5px_0px_5px_0px] hover:[border-image-repeat:stretch_repeat] active:[border-image-source:var(--scrollbarsliderbarvertical-3-pressed-src)] active:[border-image-slice:5_0_5_0_fill] active:[border-image-width:5px_0px_5px_0px] active:[border-image-repeat:stretch_repeat]',
        // default
        '100': '[border-image-source:var(--scrollbarsliderbarvertical-100-default-src)] [border-image-slice:4_0_4_0_fill] [border-image-width:4px_0px_4px_0px] [border-image-repeat:stretch]',
        // default
        '200': '[border-image-source:var(--scrollbarsliderbarvertical-200-default-src)] [border-image-slice:4_0_4_0_fill] [border-image-width:4px_0px_4px_0px] [border-image-repeat:stretch]',
    },
} as const;

const scrollbarSliderBarVerticalVariants = cva(
    '',
    {
        variants: scrollbarSliderBarVerticalVariantsConfig,
        defaultVariants: {
            variant: '0',
        },
    }
);

type ScrollbarSliderBarVerticalVariantProps = VariantProps<typeof scrollbarSliderBarVerticalVariantsConfig>;

interface ScrollbarSliderBarVerticalProps extends HTMLAttributes<HTMLDivElement>, ScrollbarSliderBarVerticalVariantProps {
    className?: string;
}

export const ScrollbarSliderBarVertical = forwardRef<HTMLDivElement, ScrollbarSliderBarVerticalProps>(
    ({ className, variant, ...props }, ref) => (
        <div
            ref={ref}
            className={cn(scrollbarSliderBarVerticalVariants({ variant }), className)}
            {...props}
        />
    )
);

ScrollbarSliderBarVertical.displayName = 'ScrollbarSliderBarVertical';
