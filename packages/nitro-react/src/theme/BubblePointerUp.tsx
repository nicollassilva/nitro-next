import { forwardRef, type HTMLAttributes } from 'react';

import { cn, cva, useCascadedVariant, VariantCascadeProvider, type VariantProps } from './utils';
import { VARIANT_CASCADE_CONFIG } from './VariantConfig';

const bubblePointerUpVariantsConfig = {
    variant: {
        // default
        '0': 'sprite min-w-3.25 min-h-2.25 bg-(image:--bubblepointerup-src) bg-position-[-16px_-0px] bg-size-[29px_10px] [image-rendering:pixelated]',
        // default
        '7': 'sprite min-w-4 min-h-2.5 bg-(image:--bubblepointerup-src) bg-position-[-0px_-0px] bg-size-[29px_10px] [image-rendering:pixelated]',
    },
} as const;

const bubblePointerUpVariants = cva(
    '',
    {
        variants: bubblePointerUpVariantsConfig,
        defaultVariants: {
            variant: '0',
        },
    }
);

type BubblePointerUpVariantProps = VariantProps<typeof bubblePointerUpVariantsConfig>;

interface BubblePointerUpProps extends HTMLAttributes<HTMLDivElement>, BubblePointerUpVariantProps {
    className?: string;
    defaultVariant?: string;
}

export const BubblePointerUp = forwardRef<HTMLDivElement, BubblePointerUpProps>(
    ({ className, variant, defaultVariant, children, ...props }, ref) => {
        const cascadedVariant = useCascadedVariant('bubblePointerUp');
        const resolvedVariant = (variant ?? cascadedVariant ?? defaultVariant ?? '0') as never;
        const ownCascade = VARIANT_CASCADE_CONFIG['bubblePointerUp']?.[resolvedVariant];
        return (
            <div
                ref={ref}
                className={cn(bubblePointerUpVariants({ variant: resolvedVariant }), className)}
                {...props}
            >
                <VariantCascadeProvider map={ownCascade}>{children}</VariantCascadeProvider>
            </div>
        );
    }
);

BubblePointerUp.displayName = 'BubblePointerUp';
