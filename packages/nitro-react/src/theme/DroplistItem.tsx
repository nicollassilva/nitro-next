import { forwardRef, type HTMLAttributes } from 'react';

import { cn, cva, useCascadedVariant, VariantCascadeProvider, type VariantProps } from './utils';
import { VARIANT_CASCADE_CONFIG } from './VariantConfig';

const droplistItemVariantsConfig = {
    variant: {
        // default
        '0': 'sprite min-w-1.25 min-h-4.75 bg-(image:--dropmenuitem-0-default-src) bg-size-[100%_100%] hover:bg-(image:--dropmenuitem-0-hovering-src) hover:bg-size-[100%_100%] hover:bg-no-repeat  aria-selected:bg-(image:--dropmenuitem-0-selected-src) aria-selected:bg-size-[100%_100%] active:bg-(image:--dropmenuitem-0-selected-src) active:bg-size-[100%_100%] active:bg-no-repeat ',
        // white
        '1': 'sprite min-w-1.25 min-h-4.75 bg-(image:--dropmenuitem-0-default-src) bg-size-[100%_100%] hover:bg-(image:--dropmenuitem-0-hovering-src) hover:bg-size-[100%_100%] hover:bg-no-repeat  aria-selected:bg-(image:--dropmenuitem-0-selected-src) aria-selected:bg-size-[100%_100%] active:bg-(image:--dropmenuitem-0-selected-src) active:bg-size-[100%_100%] active:bg-no-repeat ',
    },
} as const;

const droplistItemVariants = cva(
    '',
    {
        variants: droplistItemVariantsConfig,
        defaultVariants: {
            variant: '0',
        },
    }
);

type DroplistItemVariantProps = VariantProps<typeof droplistItemVariantsConfig>;

interface DroplistItemProps extends HTMLAttributes<HTMLDivElement>, DroplistItemVariantProps {
    className?: string;
    defaultVariant?: string;
}

export const DroplistItem = forwardRef<HTMLDivElement, DroplistItemProps>(
    ({ className, variant, defaultVariant, children, ...props }, ref) => {
        const cascadedVariant = useCascadedVariant('droplistItem');
        const resolvedVariant = (variant ?? cascadedVariant ?? defaultVariant ?? '0') as never;
        const ownCascade = VARIANT_CASCADE_CONFIG['droplistItem']?.[resolvedVariant];
        return (
            <div
                ref={ref}
                className={cn(droplistItemVariants({ variant: resolvedVariant }), className)}
                {...props}
            >
                <VariantCascadeProvider map={ownCascade}>{children}</VariantCascadeProvider>
            </div>
        );
    }
);

DroplistItem.displayName = 'DroplistItem';
