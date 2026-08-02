import { forwardRef, type HTMLAttributes } from 'react';

import { cn, cva, useCascadedVariant, VariantCascadeProvider, type VariantProps } from './utils';
import { VARIANT_CASCADE_CONFIG } from './VariantConfig';

const bubblePointerDownVariantsConfig = {
    variant: {
        // default
        '0': 'sprite min-w-3.25 min-h-2.25 bg-(image:--bubblepointerdown-src) bg-position-[-16px_-0px] bg-size-[29px_11px] [image-rendering:pixelated]',
        // default
        '7': 'sprite min-w-4 min-h-2.75 bg-(image:--bubblepointerdown-src) bg-position-[-0px_-0px] bg-size-[29px_11px] [image-rendering:pixelated]',
    },
} as const;

const bubblePointerDownVariants = cva(
    '',
    {
        variants: bubblePointerDownVariantsConfig,
        defaultVariants: {
            variant: '0',
        },
    }
);

type BubblePointerDownVariantProps = VariantProps<typeof bubblePointerDownVariantsConfig>;

interface BubblePointerDownProps extends HTMLAttributes<HTMLDivElement>, BubblePointerDownVariantProps {
    className?: string;
    defaultVariant?: string;
}

export const BubblePointerDown = forwardRef<HTMLDivElement, BubblePointerDownProps>(
    ({ className, variant, defaultVariant, children, ...props }, ref) => {
        const cascadedVariant = useCascadedVariant('bubblePointerDown');
        const resolvedVariant = (variant ?? cascadedVariant ?? defaultVariant ?? '0') as never;
        const ownCascade = VARIANT_CASCADE_CONFIG['bubblePointerDown']?.[resolvedVariant];
        return (
            <div
                ref={ref}
                className={cn(bubblePointerDownVariants({ variant: resolvedVariant }), className)}
                {...props}
            >
                <VariantCascadeProvider map={ownCascade}>{children}</VariantCascadeProvider>
            </div>
        );
    }
);

BubblePointerDown.displayName = 'BubblePointerDown';
