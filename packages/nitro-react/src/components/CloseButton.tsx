import { forwardRef, type HTMLAttributes } from 'react';

import { cn, cva, type VariantProps } from '#base/utils';

const closeButtonVariantsConfig = {
    variant: {
        // default
        '0': 'inline-block min-w-3.75 min-h-3.75 [background-image:var(--closebutton-0-default-src)] bg-size-[100%_100%] bg-no-repeat hover:[background-image:var(--closebutton-0-hovering-src)] hover:bg-size-[100%_100%] hover:bg-no-repeat hover:[image-rendering:pixelated] active:[background-image:var(--closebutton-0-pressed-src)] active:bg-size-[100%_100%] active:bg-no-repeat active:[image-rendering:pixelated]',
        // black
        '1': 'inline-block min-w-3.75 min-h-3.75 [background-image:var(--closebutton-1-default-src)] bg-size-[100%_100%] bg-no-repeat active:[background-image:var(--closebutton-1-default-src)] active:bg-size-[100%_100%] active:bg-no-repeat active:[image-rendering:pixelated]',
        // white
        '2': 'inline-block min-w-3.75 min-h-3.75 [background-image:var(--closebutton-2-default-src)] bg-size-[100%_100%] bg-no-repeat active:[background-image:var(--closebutton-2-default-src)] active:bg-size-[100%_100%] active:bg-no-repeat active:[image-rendering:pixelated]',
        // default
        '3': 'inline-block min-w-4.75 min-h-5 [background-image:var(--closebutton-3-default-src)] bg-size-[100%_100%] bg-no-repeat hover:[background-image:var(--closebutton-3-hovering-src)] hover:bg-size-[100%_100%] hover:bg-no-repeat hover:[image-rendering:pixelated] active:[background-image:var(--closebutton-3-pressed-src)] active:bg-size-[100%_100%] active:bg-no-repeat active:[image-rendering:pixelated]',
        // help
        '4': 'inline-block min-w-4.75 min-h-5 [background-image:var(--closebutton-4-default-src)] bg-size-[100%_100%] bg-no-repeat hover:[background-image:var(--closebutton-4-hovering-src)] hover:bg-size-[100%_100%] hover:bg-no-repeat hover:[image-rendering:pixelated] active:[background-image:var(--closebutton-4-pressed-src)] active:bg-size-[100%_100%] active:bg-no-repeat active:[image-rendering:pixelated]',
    },
} as const;

const closeButtonVariants = cva(
    'cursor-pointer',
    {
        variants: closeButtonVariantsConfig,
        defaultVariants: {
            variant: '3',
        },
    }
);

type CloseButtonVariantProps = VariantProps<typeof closeButtonVariantsConfig>;

interface CloseButtonProps extends HTMLAttributes<HTMLDivElement>, CloseButtonVariantProps {
    className?: string;
}

export const CloseButton = forwardRef<HTMLDivElement, CloseButtonProps>(
    ({ className, variant, ...props }, ref) => (
        <div
            ref={ref}
            className={cn(closeButtonVariants({ variant }), className)}
            {...props}
        />
    )
);

CloseButton.displayName = 'CloseButton';
