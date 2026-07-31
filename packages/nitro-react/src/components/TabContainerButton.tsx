import { forwardRef, type HTMLAttributes } from 'react';

import { cn, cva, type VariantProps } from '#base/utils';

const tabContainerButtonVariantsConfig = {
    variant: {
        // default
        '0': 'inline-block min-w-7.5 min-h-5.25 [background-image:var(--tabbutton-0-default-src)] bg-size-[100%_100%] bg-no-repeat hover:[background-image:var(--tabbutton-0-hovering-src)] hover:bg-size-[100%_100%] hover:bg-no-repeat hover:[image-rendering:pixelated] aria-selected:[background-image:var(--tabbutton-0-selected-src)] aria-selected:bg-size-[100%_100%] aria-selected:bg-no-repeat aria-selected:[image-rendering:pixelated] active:[background-image:var(--tabbutton-0-selected-src)] active:bg-size-[100%_100%] active:bg-no-repeat active:[image-rendering:pixelated]',
        // black
        '1': 'inline-block min-w-7.5 min-h-5.25 [background-image:var(--tabbutton-1-default-src)] bg-size-[100%_100%] bg-no-repeat hover:[background-image:var(--tabbutton-1-hovering-src)] hover:bg-size-[100%_100%] hover:bg-no-repeat hover:[image-rendering:pixelated] aria-selected:[background-image:var(--tabbutton-1-selected-src)] aria-selected:bg-size-[100%_100%] aria-selected:bg-no-repeat aria-selected:[image-rendering:pixelated] active:[background-image:var(--tabbutton-1-selected-src)] active:bg-size-[100%_100%] active:bg-no-repeat active:[image-rendering:pixelated]',
        // white
        '2': 'inline-block min-w-7.5 min-h-5.25 [background-image:var(--tabbutton-0-default-src)] bg-size-[100%_100%] bg-no-repeat hover:[background-image:var(--tabbutton-0-hovering-src)] hover:bg-size-[100%_100%] hover:bg-no-repeat hover:[image-rendering:pixelated] aria-selected:[background-image:var(--tabbutton-0-selected-src)] aria-selected:bg-size-[100%_100%] aria-selected:bg-no-repeat aria-selected:[image-rendering:pixelated] active:[background-image:var(--tabbutton-0-selected-src)] active:bg-size-[100%_100%] active:bg-no-repeat active:[image-rendering:pixelated]',
        // default
        '3': '[border-image-source:var(--tabbutton-3-default-src)] [border-image-slice:0_9_0_9_fill] [border-image-width:0px_9px_0px_9px] [border-image-repeat:stretch] hover:[border-image-source:var(--tabbutton-3-hovering-src)] hover:[border-image-slice:0_9_0_9_fill] hover:[border-image-width:0px_9px_0px_9px] hover:[border-image-repeat:stretch] aria-selected:[border-image-source:var(--tabbutton-3-selected-src)] aria-selected:[border-image-slice:0_9_0_9_fill] aria-selected:[border-image-width:0px_9px_0px_9px] aria-selected:[border-image-repeat:stretch] active:[border-image-source:var(--tabbutton-3-selected-src)] active:[border-image-slice:0_9_0_9_fill] active:[border-image-width:0px_9px_0px_9px] active:[border-image-repeat:stretch] text-style-button-shiny-regular px-2',
    },
} as const;

const tabContainerButtonVariants = cva(
    'flex items-center justify-center z-20 cursor-pointer leading-0',
    {
        variants: tabContainerButtonVariantsConfig,
        defaultVariants: {
            variant: '0',
        },
    }
);

type TabContainerButtonVariantProps = VariantProps<typeof tabContainerButtonVariantsConfig>;

interface TabContainerButtonProps extends HTMLAttributes<HTMLDivElement>, TabContainerButtonVariantProps {
    className?: string;
}

export const TabContainerButton = forwardRef<HTMLDivElement, TabContainerButtonProps>(
    ({ className, variant, ...props }, ref) => (
        <div
            ref={ref}
            className={cn(tabContainerButtonVariants({ variant }), className)}
            {...props}
        />
    )
);

TabContainerButton.displayName = 'TabContainerButton';
