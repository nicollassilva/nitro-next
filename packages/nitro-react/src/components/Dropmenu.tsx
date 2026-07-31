import { forwardRef, type HTMLAttributes } from 'react';

import { cn, cva, type VariantProps } from '#base/utils';

const dropmenuVariantsConfig = {
    variant: {
        // default
        '0': '[border-image-source:var(--dropmenu-0-default-src)] [border-image-slice:3_3_3_3_fill] [border-image-width:3px_3px_3px_3px] [border-image-repeat:stretch] min-w-10 min-h-5.5 text-[#000000] text-style-regular',
        // black
        '1': '[border-image-source:var(--button-1-default-src)] [border-image-slice:3_3_3_3_fill] [border-image-width:3px_3px_3px_3px] [border-image-repeat:stretch] min-w-10 min-h-5.5 text-[#ffffff] text-style-regular',
        // default
        '3': 'inline-block min-w-10 min-h-5.75 [background-image:var(--dropmenu-3-default-src)] bg-size-[100%_100%] bg-no-repeat [image-rendering:pixelated] hover:[background-image:var(--dropmenu-3-hovering-src)] hover:bg-size-[100%_100%] hover:bg-no-repeat hover:[image-rendering:pixelated] text-[#000000] text-style-u-regular',
        // default
        '100': '[border-image-source:var(--dropmenu-0-default-src)] [border-image-slice:3_3_3_3_fill] [border-image-width:3px_3px_3px_3px] [border-image-repeat:stretch] min-w-10 min-h-5.5 text-[#000000] text-style-il-regular',
    },
} as const;

const dropmenuVariants = cva(
    '',
    {
        variants: dropmenuVariantsConfig,
        defaultVariants: {
            variant: '0',
        },
    }
);

type DropmenuVariantProps = VariantProps<typeof dropmenuVariantsConfig>;

interface DropmenuProps extends HTMLAttributes<HTMLDivElement>, DropmenuVariantProps {
    className?: string;
}

export const Dropmenu = forwardRef<HTMLDivElement, DropmenuProps>(
    ({ className, variant, ...props }, ref) => (
        <div
            ref={ref}
            className={cn(dropmenuVariants({ variant }), className)}
            {...props}
        />
    )
);

Dropmenu.displayName = 'Dropmenu';
