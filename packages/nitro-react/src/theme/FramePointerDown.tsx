import { forwardRef, type HTMLAttributes } from 'react';

import { cn, cva, useCascadedVariant, VariantCascadeProvider, type VariantProps } from './utils';
import { VARIANT_CASCADE_CONFIG } from './VariantConfig';

const framePointerDownVariantsConfig = {
    variant: {
        // bubble
        '7': 'sprite min-w-4 min-h-3 bg-(image:--framepointerdown-src) bg-position-[-0px_-0px] bg-size-[16px_12px]',
    },
} as const;

const framePointerDownVariants = cva(
    '',
    {
        variants: framePointerDownVariantsConfig,
        defaultVariants: {
            variant: '7',
        },
    }
);

type FramePointerDownVariantProps = VariantProps<typeof framePointerDownVariantsConfig>;

interface FramePointerDownProps extends HTMLAttributes<HTMLDivElement>, FramePointerDownVariantProps {
    className?: string;
    defaultVariant?: string;
}

export const FramePointerDown = forwardRef<HTMLDivElement, FramePointerDownProps>(
    ({ className, variant, defaultVariant, children, ...props }, ref) => {
        const cascadedVariant = useCascadedVariant('framePointerDown');
        const resolvedVariant = (variant ?? cascadedVariant ?? defaultVariant ?? '7') as never;
        const ownCascade = VARIANT_CASCADE_CONFIG['framePointerDown']?.[resolvedVariant];
        return (
            <div
                ref={ref}
                className={cn(framePointerDownVariants({ variant: resolvedVariant }), className)}
                {...props}
            >
                <VariantCascadeProvider map={ownCascade}>{children}</VariantCascadeProvider>
            </div>
        );
    }
);

FramePointerDown.displayName = 'FramePointerDown';
