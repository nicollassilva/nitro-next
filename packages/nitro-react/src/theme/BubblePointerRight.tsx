import { forwardRef, type HTMLAttributes } from 'react';

import { cn, cva, useCascadedVariant, VariantCascadeProvider, type VariantProps } from './utils';
import { VARIANT_CASCADE_CONFIG } from './VariantConfig';

const bubblePointerRightVariantsConfig = {
    variant: {
        // default
        '0': 'sprite min-w-2 min-h-3.25 bg-(image:--bubblepointerright-src) bg-position-[-11px_-0px] bg-size-[19px_18px] [image-rendering:pixelated]',
        // default
        '7': 'sprite min-w-2.75 min-h-4.5 bg-(image:--bubblepointerright-src) bg-position-[-0px_-0px] bg-size-[19px_18px] [image-rendering:pixelated]',
    },
} as const;

const bubblePointerRightVariants = cva(
    '',
    {
        variants: bubblePointerRightVariantsConfig,
        defaultVariants: {
            variant: '0',
        },
    }
);

type BubblePointerRightVariantProps = VariantProps<typeof bubblePointerRightVariantsConfig>;

interface BubblePointerRightProps extends HTMLAttributes<HTMLDivElement>, BubblePointerRightVariantProps {
    className?: string;
    defaultVariant?: string;
}

export const BubblePointerRight = forwardRef<HTMLDivElement, BubblePointerRightProps>(
    ({ className, variant, defaultVariant, children, ...props }, ref) => {
        const cascadedVariant = useCascadedVariant('bubblePointerRight');
        const resolvedVariant = (variant ?? cascadedVariant ?? defaultVariant ?? '0') as never;
        const ownCascade = VARIANT_CASCADE_CONFIG['bubblePointerRight']?.[resolvedVariant];
        return (
            <div
                ref={ref}
                className={cn(bubblePointerRightVariants({ variant: resolvedVariant }), className)}
                {...props}
            >
                <VariantCascadeProvider map={ownCascade}>{children}</VariantCascadeProvider>
            </div>
        );
    }
);

BubblePointerRight.displayName = 'BubblePointerRight';
