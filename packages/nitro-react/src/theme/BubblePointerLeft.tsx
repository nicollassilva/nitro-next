import { forwardRef, type HTMLAttributes } from 'react';

import { cn, cva, useCascadedVariant, VariantCascadeProvider, type VariantProps } from './utils';
import { VARIANT_CASCADE_CONFIG } from './VariantConfig';

const bubblePointerLeftVariantsConfig = {
    variant: {
        // default
        '0': 'sprite min-w-2 min-h-3.25 bg-(image:--bubblepointerleft-src) bg-position-[-11px_-0px] bg-size-[19px_18px] [image-rendering:pixelated]',
        // default
        '7': 'sprite min-w-2.75 min-h-4.5 bg-(image:--bubblepointerleft-src) bg-position-[-0px_-0px] bg-size-[19px_18px] [image-rendering:pixelated]',
    },
} as const;

const bubblePointerLeftVariants = cva(
    '',
    {
        variants: bubblePointerLeftVariantsConfig,
        defaultVariants: {
            variant: '0',
        },
    }
);

type BubblePointerLeftVariantProps = VariantProps<typeof bubblePointerLeftVariantsConfig>;

interface BubblePointerLeftProps extends HTMLAttributes<HTMLDivElement>, BubblePointerLeftVariantProps {
    className?: string;
    defaultVariant?: string;
}

export const BubblePointerLeft = forwardRef<HTMLDivElement, BubblePointerLeftProps>(
    ({ className, variant, defaultVariant, children, ...props }, ref) => {
        const cascadedVariant = useCascadedVariant('bubblePointerLeft');
        const resolvedVariant = (variant ?? cascadedVariant ?? defaultVariant ?? '0') as never;
        const ownCascade = VARIANT_CASCADE_CONFIG['bubblePointerLeft']?.[resolvedVariant];
        return (
            <div
                ref={ref}
                className={cn(bubblePointerLeftVariants({ variant: resolvedVariant }), className)}
                {...props}
            >
                <VariantCascadeProvider map={ownCascade}>{children}</VariantCascadeProvider>
            </div>
        );
    }
);

BubblePointerLeft.displayName = 'BubblePointerLeft';
