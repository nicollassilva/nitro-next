import { forwardRef, type HTMLAttributes } from 'react';

import { cn, cva, VariantProps } from '#base/utils';

const contentAreaVariantsConfig = {
    variant: {
        // default
        '0': '',
        // default
        '3': '',
    },
} as const;

const contentAreaVariants = cva(
    'relative flex flex-col px-1.25 pt-px pb-1.5 size-full overflow-hidden',
    {
        variants: contentAreaVariantsConfig,
        defaultVariants: {
            variant: '0',
        },
    }
);

type ContentAreaVariantProps = VariantProps<typeof contentAreaVariantsConfig>;

interface ContentAreaProps extends HTMLAttributes<HTMLDivElement>, ContentAreaVariantProps {
    className?: string;
}

export const ContentArea = forwardRef<HTMLDivElement, ContentAreaProps>(
    ({ className, variant, ...props }, ref) => (
        <div
            ref={ref}
            className={cn(contentAreaVariants({ variant }), className)}
            {...props}
        />
    )
);

ContentArea.displayName = 'ContentArea';
