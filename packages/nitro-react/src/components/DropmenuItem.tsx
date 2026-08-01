import { forwardRef, type HTMLAttributes } from 'react';

import { cn, cva, type VariantProps } from '#base/utils';

const dropmenuItemVariantsConfig = {
    variant: {
        // default
        '0': 'inline-block min-w-1.25 min-h-4.75 [background-image:var(--dropmenuitem-0-default-src)] bg-size-[100%_100%] bg-no-repeat [image-rendering:pixelated] hover:[background-image:var(--dropmenuitem-0-hovering-src)] hover:bg-size-[100%_100%] hover:bg-no-repeat hover:[image-rendering:pixelated] aria-selected:[background-image:var(--dropmenuitem-0-selected-src)] aria-selected:bg-size-[100%_100%] aria-selected:bg-no-repeat aria-selected:[image-rendering:pixelated] active:[background-image:var(--dropmenuitem-0-selected-src)] active:bg-size-[100%_100%] active:bg-no-repeat active:[image-rendering:pixelated] pl-1 pt-px pr-1 pb-0.5 text-[#000000] text-style-regular',
        // black
        '1': 'inline-block min-w-1.25 min-h-4.75 [background-image:var(--dropmenuitem-1-default-src)] bg-size-[100%_100%] bg-no-repeat [image-rendering:pixelated] hover:[background-image:var(--dropmenuitem-1-hovering-src)] hover:bg-size-[100%_100%] hover:bg-no-repeat hover:[image-rendering:pixelated] aria-selected:[background-image:var(--dropmenuitem-1-selected-src)] aria-selected:bg-size-[100%_100%] aria-selected:bg-no-repeat aria-selected:[image-rendering:pixelated] active:[background-image:var(--dropmenuitem-1-selected-src)] active:bg-size-[100%_100%] active:bg-no-repeat active:[image-rendering:pixelated] pl-1 pt-px pr-1 pb-0.5 text-[#ffffff] text-style-regular',
        // default
        '3': 'inline-block min-w-1.25 min-h-4.75 [background-image:var(--dropmenuitem-0-default-src)] bg-size-[100%_100%] bg-no-repeat [image-rendering:pixelated] hover:[background-image:var(--dropmenuitem-3-hovering-src)] hover:bg-size-[100%_100%] hover:bg-no-repeat hover:[image-rendering:pixelated] aria-selected:[background-image:var(--dropmenuitem-3-selected-src)] aria-selected:bg-size-[100%_100%] aria-selected:bg-no-repeat aria-selected:[image-rendering:pixelated] active:[background-image:var(--dropmenuitem-3-selected-src)] active:bg-size-[100%_100%] active:bg-no-repeat active:[image-rendering:pixelated] pl-1 pt-0.5 pr-1 pb-1 text-[#000000] text-style-u-regular',
        // default
        '100': 'inline-block min-w-1.25 min-h-4.75 [background-image:var(--dropmenuitem-0-default-src)] bg-size-[100%_100%] bg-no-repeat [image-rendering:pixelated] hover:[background-image:var(--dropmenuitem-0-hovering-src)] hover:bg-size-[100%_100%] hover:bg-no-repeat hover:[image-rendering:pixelated] aria-selected:[background-image:var(--dropmenuitem-0-selected-src)] aria-selected:bg-size-[100%_100%] aria-selected:bg-no-repeat aria-selected:[image-rendering:pixelated] active:[background-image:var(--dropmenuitem-0-selected-src)] active:bg-size-[100%_100%] active:bg-no-repeat active:[image-rendering:pixelated] pl-1 pt-px pr-1 pb-0.5 text-[#000000] text-style-il-regular',
    },
} as const;

const dropmenuItemVariants = cva(
    '',
    {
        variants: dropmenuItemVariantsConfig,
        defaultVariants: {
            variant: '0',
        },
    }
);

type DropmenuItemVariantProps = VariantProps<typeof dropmenuItemVariantsConfig>;

interface DropmenuItemProps extends HTMLAttributes<HTMLDivElement>, DropmenuItemVariantProps {
    className?: string;
}

export const DropmenuItem = forwardRef<HTMLDivElement, DropmenuItemProps>(
    ({ className, variant, ...props }, ref) => (
        <div
            ref={ref}
            className={cn(dropmenuItemVariants({ variant }), className)}
            {...props}
        />
    )
);

DropmenuItem.displayName = 'DropmenuItem';
