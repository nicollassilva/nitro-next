import { forwardRef, type HTMLAttributes } from 'react';

import { cn, cva, type VariantProps } from '#base/utils';

const tabButtonVariantsConfig = {
    variant: {
        // default
        '0': 'inline-block min-w-7.5 min-h-5.25 [background-image:var(--tabbutton-0-default-src)] bg-size-[100%_100%] bg-no-repeat [image-rendering:pixelated] hover:[background-image:var(--tabbutton-0-hovering-src)] hover:bg-size-[100%_100%] hover:bg-no-repeat hover:[image-rendering:pixelated] aria-selected:[background-image:var(--tabbutton-0-selected-src)] aria-selected:bg-size-[100%_100%] aria-selected:bg-no-repeat aria-selected:[image-rendering:pixelated] active:[background-image:var(--tabbutton-0-selected-src)] active:bg-size-[100%_100%] active:bg-no-repeat active:[image-rendering:pixelated] pl-2 pt-0.5 pr-2 pb-1 text-[#000000] text-style-button-tab',
        // black
        '1': 'inline-block min-w-7.5 min-h-5.25 [background-image:var(--tabbutton-1-default-src)] bg-size-[100%_100%] bg-no-repeat [image-rendering:pixelated] hover:[background-image:var(--tabbutton-1-hovering-src)] hover:bg-size-[100%_100%] hover:bg-no-repeat hover:[image-rendering:pixelated] aria-selected:[background-image:var(--tabbutton-1-selected-src)] aria-selected:bg-size-[100%_100%] aria-selected:bg-no-repeat aria-selected:[image-rendering:pixelated] active:[background-image:var(--tabbutton-1-selected-src)] active:bg-size-[100%_100%] active:bg-no-repeat active:[image-rendering:pixelated] pl-2 pt-0.5 pr-2 pb-1 text-[#ffffff] text-style-button-tab',
        // white
        '2': 'inline-block min-w-7.5 min-h-5.25 [background-image:var(--tabbutton-0-default-src)] bg-size-[100%_100%] bg-no-repeat [image-rendering:pixelated] hover:[background-image:var(--tabbutton-0-hovering-src)] hover:bg-size-[100%_100%] hover:bg-no-repeat hover:[image-rendering:pixelated] aria-selected:[background-image:var(--tabbutton-0-selected-src)] aria-selected:bg-size-[100%_100%] aria-selected:bg-no-repeat aria-selected:[image-rendering:pixelated] active:[background-image:var(--tabbutton-0-selected-src)] active:bg-size-[100%_100%] active:bg-no-repeat active:[image-rendering:pixelated] pl-2 pt-0.5 pr-2 pb-1 text-[#000000] text-style-button-tab',
        // default
        '3': '[border-image-source:var(--tabbutton-3-default-src)] [border-image-slice:0_9_0_9_fill] [border-image-width:0px_9px_0px_9px] [border-image-repeat:stretch] [image-rendering:pixelated] hover:[border-image-source:var(--tabbutton-3-hovering-src)] hover:[border-image-slice:0_9_0_9_fill] hover:[border-image-width:0px_9px_0px_9px] hover:[border-image-repeat:stretch] hover:[image-rendering:pixelated] aria-selected:[border-image-source:var(--tabbutton-3-selected-src)] aria-selected:[border-image-slice:0_9_0_9_fill] aria-selected:[border-image-width:0px_9px_0px_9px] aria-selected:[border-image-repeat:stretch] aria-selected:[image-rendering:pixelated] active:[border-image-source:var(--tabbutton-3-selected-src)] active:[border-image-slice:0_9_0_9_fill] active:[border-image-width:0px_9px_0px_9px] active:[border-image-repeat:stretch] active:[image-rendering:pixelated] min-w-5 min-h-[32px] max-h-[32px] pl-2.5 pt-1.5 pr-2.5 pb-1 text-[#000000] text-style-button-shiny-regular',
    },
} as const;

const tabButtonVariants = cva(
    'cursor-pointer',
    {
        variants: tabButtonVariantsConfig,
        defaultVariants: {
            variant: '0',
        },
    }
);

type TabButtonVariantProps = VariantProps<typeof tabButtonVariantsConfig>;

interface TabButtonProps extends HTMLAttributes<HTMLDivElement>, TabButtonVariantProps {
    className?: string;
}

export const TabButton = forwardRef<HTMLDivElement, TabButtonProps>(
    ({ className, variant, ...props }, ref) => (
        <div
            ref={ref}
            className={cn(tabButtonVariants({ variant }), className)}
            {...props}
        />
    )
);

TabButton.displayName = 'TabButton';
