import { forwardRef, type HTMLAttributes } from 'react';

import { cn, cva, useCascadedVariant, VariantCascadeProvider, type VariantProps } from './utils';
import { VARIANT_CASCADE_CONFIG } from './VariantConfig';

const scrollbarSliderButtonLeftVariantsConfig = {
    variant: {
        // default
        '0': 'sprite min-w-4 min-h-4.25 aria-disabled:pointer-events-none bg-(image:--scrollbarsliderbuttonleft-src) bg-position-[-0px_-0px] bg-size-[164px_17px] active:bg-(image:--scrollbarsliderbuttonleft-src) active:bg-position-[-16px_-0px] active:bg-size-[164px_17px] active:bg-no-repeat  aria-disabled:bg-(image:--scrollbarsliderbuttonleft-src) aria-disabled:bg-position-[-32px_-0px] aria-disabled:bg-size-[164px_17px] aria-disabled:bg-no-repeat ',
        // black
        '1': 'sprite min-w-4 min-h-4.25 aria-disabled:pointer-events-none bg-(image:--scrollbarsliderbuttonleft-src) bg-position-[-48px_-0px] bg-size-[164px_17px] active:bg-(image:--scrollbarsliderbuttonleft-src) active:bg-position-[-64px_-0px] active:bg-size-[164px_17px] active:bg-no-repeat  aria-disabled:bg-(image:--scrollbarsliderbuttonleft-src) aria-disabled:bg-position-[-80px_-0px] aria-disabled:bg-size-[164px_17px] aria-disabled:bg-no-repeat ',
        // default
        '3': 'sprite min-w-4.25 min-h-4.25 aria-disabled:pointer-events-none bg-(image:--scrollbarsliderbuttonleft-src) bg-position-[-96px_-0px] bg-size-[164px_17px] hover:bg-(image:--scrollbarsliderbuttonleft-src) hover:bg-position-[-113px_-0px] hover:bg-size-[164px_17px] hover:bg-no-repeat  active:bg-(image:--scrollbarsliderbuttonleft-src) active:bg-position-[-130px_-0px] active:bg-size-[164px_17px] active:bg-no-repeat  aria-disabled:bg-(image:--scrollbarsliderbuttonleft-src) aria-disabled:bg-position-[-147px_-0px] aria-disabled:bg-size-[164px_17px] aria-disabled:bg-no-repeat ',
    },
} as const;

const scrollbarSliderButtonLeftVariants = cva(
    '',
    {
        variants: scrollbarSliderButtonLeftVariantsConfig,
        defaultVariants: {
            variant: '0',
        },
    }
);

type ScrollbarSliderButtonLeftVariantProps = VariantProps<typeof scrollbarSliderButtonLeftVariantsConfig>;

interface ScrollbarSliderButtonLeftProps extends HTMLAttributes<HTMLDivElement>, ScrollbarSliderButtonLeftVariantProps {
    className?: string;
    defaultVariant?: string;
}

export const ScrollbarSliderButtonLeft = forwardRef<HTMLDivElement, ScrollbarSliderButtonLeftProps>(
    ({ className, variant, defaultVariant, children, ...props }, ref) => {
        const cascadedVariant = useCascadedVariant('scrollbarSliderButtonLeft');
        const resolvedVariant = (variant ?? cascadedVariant ?? defaultVariant ?? '0') as never;
        const ownCascade = VARIANT_CASCADE_CONFIG['scrollbarSliderButtonLeft']?.[resolvedVariant as string];
        return (
            <div
                ref={ref}
                className={cn(scrollbarSliderButtonLeftVariants({ variant: resolvedVariant }), className)}
                {...props}
            >
                <VariantCascadeProvider map={ownCascade}>{children}</VariantCascadeProvider>
            </div>
        );
    }
);

ScrollbarSliderButtonLeft.displayName = 'ScrollbarSliderButtonLeft';
