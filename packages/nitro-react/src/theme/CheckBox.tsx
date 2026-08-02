import { forwardRef, type HTMLAttributes } from 'react';

import { cn, cva, useCascadedVariant, VariantCascadeProvider, type VariantProps } from './utils';
import { VARIANT_CASCADE_CONFIG } from './VariantConfig';

const checkBoxVariantsConfig = {
    variant: {
        // default
        '0': 'inline-block min-w-3.75 min-h-3.75 [background-image:var(--checkbox-src)] bg-position-[-0px_-0px] bg-size-[60px_15px] bg-no-repeat [image-rendering:pixelated] aria-selected:[background-image:var(--checkbox-src)] aria-selected:bg-position-[-15px_-0px] aria-selected:bg-size-[60px_15px] aria-selected:bg-no-repeat aria-selected:[image-rendering:pixelated] active:[background-image:var(--checkbox-src)] active:bg-position-[-0px_-0px] active:bg-size-[60px_15px] active:bg-no-repeat active:[image-rendering:pixelated]',
        // black
        '1': 'inline-block min-w-3.75 min-h-3.75 [background-image:var(--checkbox-src)] bg-position-[-30px_-0px] bg-size-[60px_15px] bg-no-repeat [image-rendering:pixelated] aria-selected:[background-image:var(--checkbox-src)] aria-selected:bg-position-[-45px_-0px] aria-selected:bg-size-[60px_15px] aria-selected:bg-no-repeat aria-selected:[image-rendering:pixelated] active:[background-image:var(--checkbox-src)] active:bg-position-[-30px_-0px] active:bg-size-[60px_15px] active:bg-no-repeat active:[image-rendering:pixelated]',
        // white
        '2': 'inline-block min-w-3.75 min-h-3.75 [background-image:var(--checkbox-src)] bg-position-[-0px_-0px] bg-size-[60px_15px] bg-no-repeat [image-rendering:pixelated] aria-selected:[background-image:var(--checkbox-src)] aria-selected:bg-position-[-15px_-0px] aria-selected:bg-size-[60px_15px] aria-selected:bg-no-repeat aria-selected:[image-rendering:pixelated] active:[background-image:var(--checkbox-src)] active:bg-position-[-0px_-0px] active:bg-size-[60px_15px] active:bg-no-repeat active:[image-rendering:pixelated]',
        // switch
        '100': 'inline-block min-w-9.5 min-h-5.25 [background-image:var(--checkbox-100-default-src)] bg-size-[38px_21px] bg-no-repeat [image-rendering:pixelated] aria-selected:[background-image:var(--checkbox-100-selected-src)] aria-selected:bg-size-[38px_21px] aria-selected:bg-no-repeat aria-selected:[image-rendering:pixelated] active:[background-image:var(--checkbox-100-default-src)] active:bg-size-[38px_21px] active:bg-no-repeat active:[image-rendering:pixelated] pl-10.5 pt-1 pr-0 pb-1 text-[#000000] text-style-il-button',
        // basic
        '101': 'inline-block min-w-4.75 min-h-5 [background-image:var(--checkbox-101-default-src)] bg-size-[19px_20px] bg-no-repeat [image-rendering:pixelated] aria-selected:[background-image:var(--checkbox-101-selected-src)] aria-selected:bg-size-[19px_20px] aria-selected:bg-no-repeat aria-selected:[image-rendering:pixelated] active:[background-image:var(--checkbox-101-default-src)] active:bg-size-[19px_20px] active:bg-no-repeat active:[image-rendering:pixelated] pl-5.75 pt-1 pr-0 pb-1 text-[#000000] text-style-il-button',
    },
} as const;

const checkBoxVariants = cva(
    '',
    {
        variants: checkBoxVariantsConfig,
        defaultVariants: {
            variant: '0',
        },
    }
);

type CheckBoxVariantProps = VariantProps<typeof checkBoxVariantsConfig>;

interface CheckBoxProps extends HTMLAttributes<HTMLDivElement>, CheckBoxVariantProps {
    className?: string;
    defaultVariant?: string;
}

export const CheckBox = forwardRef<HTMLDivElement, CheckBoxProps>(
    ({ className, variant, defaultVariant, children, ...props }, ref) => {
        const cascadedVariant = useCascadedVariant('checkBox');
        const resolvedVariant = (variant ?? cascadedVariant ?? defaultVariant ?? '0') as never;
        const ownCascade = VARIANT_CASCADE_CONFIG['checkBox']?.[resolvedVariant];
        return (
            <div
                ref={ref}
                className={cn(checkBoxVariants({ variant: resolvedVariant }), className)}
                {...props}
            >
                <VariantCascadeProvider map={ownCascade}>{children}</VariantCascadeProvider>
            </div>
        );
    }
);

CheckBox.displayName = 'CheckBox';
