import { forwardRef, type HTMLAttributes } from 'react';

import { cn, cva, useCascadedVariant, VariantCascadeProvider, type VariantProps } from './utils';
import { VARIANT_CASCADE_CONFIG } from './VariantConfig';

const closeButtonVariantsConfig = {
    variant: {
        // default
        '0': 'inline-block min-w-3.75 min-h-3.75 [background-image:var(--closebutton-src)] bg-position-[-114px_-0px] bg-size-[189px_20px] bg-no-repeat [image-rendering:pixelated] hover:[background-image:var(--closebutton-src)] hover:bg-position-[-129px_-0px] hover:bg-size-[189px_20px] hover:bg-no-repeat hover:[image-rendering:pixelated] active:[background-image:var(--closebutton-src)] active:bg-position-[-144px_-0px] active:bg-size-[189px_20px] active:bg-no-repeat active:[image-rendering:pixelated]',
        // black
        '1': 'inline-block min-w-3.75 min-h-3.75 [background-image:var(--closebutton-src)] bg-position-[-159px_-0px] bg-size-[189px_20px] bg-no-repeat [image-rendering:pixelated] active:[background-image:var(--closebutton-src)] active:bg-position-[-159px_-0px] active:bg-size-[189px_20px] active:bg-no-repeat active:[image-rendering:pixelated]',
        // white
        '2': 'inline-block min-w-3.75 min-h-3.75 [background-image:var(--closebutton-src)] bg-position-[-174px_-0px] bg-size-[189px_20px] bg-no-repeat [image-rendering:pixelated] active:[background-image:var(--closebutton-src)] active:bg-position-[-174px_-0px] active:bg-size-[189px_20px] active:bg-no-repeat active:[image-rendering:pixelated]',
        // default
        '3': 'inline-block min-w-4.75 min-h-5 [background-image:var(--closebutton-src)] bg-position-[-0px_-0px] bg-size-[189px_20px] bg-no-repeat [image-rendering:pixelated] hover:[background-image:var(--closebutton-src)] hover:bg-position-[-19px_-0px] hover:bg-size-[189px_20px] hover:bg-no-repeat hover:[image-rendering:pixelated] active:[background-image:var(--closebutton-src)] active:bg-position-[-38px_-0px] active:bg-size-[189px_20px] active:bg-no-repeat active:[image-rendering:pixelated]',
        // help
        '4': 'inline-block min-w-4.75 min-h-5 [background-image:var(--closebutton-src)] bg-position-[-57px_-0px] bg-size-[189px_20px] bg-no-repeat [image-rendering:pixelated] hover:[background-image:var(--closebutton-src)] hover:bg-position-[-76px_-0px] hover:bg-size-[189px_20px] hover:bg-no-repeat hover:[image-rendering:pixelated] active:[background-image:var(--closebutton-src)] active:bg-position-[-95px_-0px] active:bg-size-[189px_20px] active:bg-no-repeat active:[image-rendering:pixelated]',
    },
} as const;

const closeButtonVariants = cva(
    'cursor-pointer',
    {
        variants: closeButtonVariantsConfig,
        defaultVariants: {
            variant: '0',
        },
    }
);

type CloseButtonVariantProps = VariantProps<typeof closeButtonVariantsConfig>;

interface CloseButtonProps extends HTMLAttributes<HTMLDivElement>, CloseButtonVariantProps {
    className?: string;
    defaultVariant?: string;
}

export const CloseButton = forwardRef<HTMLDivElement, CloseButtonProps>(
    ({ className, variant, defaultVariant, children, ...props }, ref) => {
        const cascadedVariant = useCascadedVariant('closeButton');
        const resolvedVariant = (variant ?? cascadedVariant ?? defaultVariant ?? '0') as never;
        const ownCascade = VARIANT_CASCADE_CONFIG['closeButton']?.[resolvedVariant as string];
        return (
            <div
                ref={ref}
                className={cn(closeButtonVariants({ variant: resolvedVariant }), className)}
                {...props}
            >
                <VariantCascadeProvider map={ownCascade}>{children}</VariantCascadeProvider>
            </div>
        );
    }
);

CloseButton.displayName = 'CloseButton';
