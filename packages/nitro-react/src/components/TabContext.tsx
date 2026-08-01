import { forwardRef, type HTMLAttributes } from 'react';

import { cn, cva, type VariantProps } from '#base/utils';

const tabContextVariantsConfig = {
    variant: {
        // default
        '0': 'min-h-5.5 max-h-5.5 text-[#000000]',
        // default
        '3': 'min-h-8.5 max-h-8.5 text-[#000000]',
    },
} as const;

const tabContextVariants = cva(
    'w-full flex gap-0 px-2 pt-px z-20',
    {
        variants: tabContextVariantsConfig,
        defaultVariants: {
            variant: '0',
        },
    }
);

type TabContextVariantProps = VariantProps<typeof tabContextVariantsConfig>;

interface TabContextProps extends HTMLAttributes<HTMLDivElement>, TabContextVariantProps {
    className?: string;
}

export const TabContext = forwardRef<HTMLDivElement, TabContextProps>(
    ({ className, variant, ...props }, ref) => (
        <div
            ref={ref}
            className={cn(tabContextVariants({ variant }), className)}
            {...props}
        />
    )
);

TabContext.displayName = 'TabContext';
