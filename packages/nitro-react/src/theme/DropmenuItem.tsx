import { forwardRef, type HTMLAttributes } from 'react';

import { cn, cva, useCascadedVariant, VariantCascadeProvider, type VariantProps } from './utils';
import { VARIANT_CASCADE_CONFIG } from './VariantConfig';

const dropmenuItemVariantsConfig = {
    variant: {
        // default
        '0': 'sprite min-w-1.25 min-h-4.75 bg-(image:--dropmenuitem-0-default-src) bg-size-[100%_100%] hover:bg-(image:--dropmenuitem-0-hovering-src) hover:bg-size-[100%_100%] hover:bg-no-repeat  aria-selected:bg-(image:--dropmenuitem-0-selected-src) aria-selected:bg-size-[100%_100%] active:bg-(image:--dropmenuitem-0-selected-src) active:bg-size-[100%_100%] active:bg-no-repeat  pl-1 pt-px pr-1 pb-0.5 text-[#000000] text-style-regular',
        // black
        '1': 'sprite min-w-1.25 min-h-4.75 bg-(image:--dropmenuitem-1-default-src) bg-size-[100%_100%] hover:bg-(image:--dropmenuitem-1-hovering-src) hover:bg-size-[100%_100%] hover:bg-no-repeat  aria-selected:bg-(image:--dropmenuitem-1-selected-src) aria-selected:bg-size-[100%_100%] active:bg-(image:--dropmenuitem-1-selected-src) active:bg-size-[100%_100%] active:bg-no-repeat  pl-1 pt-px pr-1 pb-0.5 text-[#ffffff] text-style-regular',
        // default
        '3': 'sprite min-w-1.25 min-h-4.75 bg-(image:--dropmenuitem-0-default-src) bg-size-[100%_100%] hover:bg-(image:--dropmenuitem-3-hovering-src) hover:bg-size-[100%_100%] hover:bg-no-repeat  aria-selected:bg-(image:--dropmenuitem-3-selected-src) aria-selected:bg-size-[100%_100%] active:bg-(image:--dropmenuitem-3-selected-src) active:bg-size-[100%_100%] active:bg-no-repeat  pl-1 pt-0.5 pr-1 pb-1 text-[#000000] text-style-u-regular',
        // default
        '100': 'sprite min-w-1.25 min-h-4.75 bg-(image:--dropmenuitem-0-default-src) bg-size-[100%_100%] hover:bg-(image:--dropmenuitem-0-hovering-src) hover:bg-size-[100%_100%] hover:bg-no-repeat  aria-selected:bg-(image:--dropmenuitem-0-selected-src) aria-selected:bg-size-[100%_100%] active:bg-(image:--dropmenuitem-0-selected-src) active:bg-size-[100%_100%] active:bg-no-repeat  pl-1 pt-px pr-1 pb-0.5 text-[#000000] text-style-il-regular',
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
    defaultVariant?: string;
}

export const DropmenuItem = forwardRef<HTMLDivElement, DropmenuItemProps>(
    ({ className, variant, defaultVariant, children, ...props }, ref) => {
        const cascadedVariant = useCascadedVariant('dropmenuItem');
        const resolvedVariant = (variant ?? cascadedVariant ?? defaultVariant ?? '0') as never;
        const ownCascade = VARIANT_CASCADE_CONFIG['dropmenuItem']?.[resolvedVariant as string];
        return (
            <div
                ref={ref}
                className={cn(dropmenuItemVariants({ variant: resolvedVariant }), className)}
                {...props}
            >
                <VariantCascadeProvider map={ownCascade}>{children}</VariantCascadeProvider>
            </div>
        );
    }
);

DropmenuItem.displayName = 'DropmenuItem';
