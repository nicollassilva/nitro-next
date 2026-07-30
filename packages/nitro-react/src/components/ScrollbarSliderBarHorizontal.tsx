import { forwardRef, type HTMLAttributes } from 'react';

import { cn, cva, type VariantProps } from '#base/utils';

const scrollbarSliderBarHorizontalVariantsConfig = {
    variant: {
        // default
        '0': '[border-image-source:var(--scrollbarsliderbarhorizontal-0-default-src)] [border-image-slice:0_2_0_2_fill] [border-image-width:0px_2px_0px_2px] [border-image-repeat:stretch] active:[border-image-source:var(--scrollbarsliderbarhorizontal-0-pressed-src)] active:[border-image-slice:0_2_0_2_fill] active:[border-image-width:0px_2px_0px_2px] active:[border-image-repeat:stretch]',
        // black
        '1': '[border-image-source:var(--scrollbarsliderbarhorizontal-1-default-src)] [border-image-slice:0_2_0_2_fill] [border-image-width:0px_2px_0px_2px] [border-image-repeat:stretch] active:[border-image-source:var(--scrollbarsliderbarhorizontal-1-default-src)] active:[border-image-slice:0_2_0_2_fill] active:[border-image-width:0px_2px_0px_2px] active:[border-image-repeat:stretch]',
        // default
        '3': '[border-image-source:var(--scrollbarsliderbarhorizontal-3-default-src)] [border-image-slice:0_5_0_5_fill] [border-image-width:0px_5px_0px_5px] [border-image-repeat:repeat_stretch] hover:[border-image-source:var(--scrollbarsliderbarhorizontal-3-hovering-src)] hover:[border-image-slice:0_5_0_5_fill] hover:[border-image-width:0px_5px_0px_5px] hover:[border-image-repeat:repeat_stretch] active:[border-image-source:var(--scrollbarsliderbarhorizontal-3-pressed-src)] active:[border-image-slice:0_5_0_5_fill] active:[border-image-width:0px_5px_0px_5px] active:[border-image-repeat:repeat_stretch]',
        // default
        '100': '[border-image-source:var(--scrollbarsliderbarhorizontal-100-default-src)] [border-image-slice:0_4_0_4_fill] [border-image-width:0px_4px_0px_4px] [border-image-repeat:stretch]',
        // default
        '200': '[border-image-source:var(--scrollbarsliderbarhorizontal-200-default-src)] [border-image-slice:0_4_0_4_fill] [border-image-width:0px_4px_0px_4px] [border-image-repeat:stretch]',
    },
} as const;

const scrollbarSliderBarHorizontalVariants = cva(
    '',
    {
        variants: scrollbarSliderBarHorizontalVariantsConfig,
        defaultVariants: {
            variant: '0',
        },
    }
);

type ScrollbarSliderBarHorizontalVariantProps = VariantProps<typeof scrollbarSliderBarHorizontalVariantsConfig>;

interface ScrollbarSliderBarHorizontalProps extends HTMLAttributes<HTMLDivElement>, ScrollbarSliderBarHorizontalVariantProps {
    className?: string;
}

export const ScrollbarSliderBarHorizontal = forwardRef<HTMLDivElement, ScrollbarSliderBarHorizontalProps>(
    ({ className, variant, ...props }, ref) => (
        <div
            ref={ref}
            className={cn(scrollbarSliderBarHorizontalVariants({ variant }), className)}
            {...props}
        />
    )
);

ScrollbarSliderBarHorizontal.displayName = 'ScrollbarSliderBarHorizontal';
