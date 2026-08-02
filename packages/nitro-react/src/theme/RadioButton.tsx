import { forwardRef, type HTMLAttributes } from 'react';

import { cn, cva, useCascadedVariant, VariantCascadeProvider, type VariantProps } from './utils';
import { VARIANT_CASCADE_CONFIG } from './VariantConfig';

const radioButtonVariantsConfig = {
    variant: {
        // default
        '0': 'inline-block min-w-4 min-h-4 [background-image:var(--radiobutton-src)] bg-position-[-0px_-0px] bg-size-[80px_16px] bg-no-repeat [image-rendering:pixelated] aria-selected:[background-image:var(--radiobutton-src)] aria-selected:bg-position-[-16px_-0px] aria-selected:bg-size-[80px_16px] aria-selected:bg-no-repeat aria-selected:[image-rendering:pixelated]',
        // black
        '1': 'inline-block min-w-4 min-h-4 [background-image:var(--radiobutton-src)] bg-position-[-32px_-0px] bg-size-[80px_16px] bg-no-repeat [image-rendering:pixelated] aria-selected:[background-image:var(--radiobutton-src)] aria-selected:bg-position-[-48px_-0px] aria-selected:bg-size-[80px_16px] aria-selected:bg-no-repeat aria-selected:[image-rendering:pixelated]',
        // white
        '2': 'inline-block min-w-4 min-h-4 [background-image:var(--radiobutton-src)] bg-position-[-64px_-0px] bg-size-[80px_16px] bg-no-repeat [image-rendering:pixelated] aria-selected:[background-image:var(--radiobutton-src)] aria-selected:bg-position-[-16px_-0px] aria-selected:bg-size-[80px_16px] aria-selected:bg-no-repeat aria-selected:[image-rendering:pixelated]',
        // default
        '100': 'inline-block min-w-2.75 min-h-3.5 [background-image:var(--radiobutton-100-default-src)] bg-size-[11px_14px] bg-no-repeat [image-rendering:pixelated] aria-selected:[background-image:var(--radiobutton-100-selected-src)] aria-selected:bg-size-[11px_14px] aria-selected:bg-no-repeat aria-selected:[image-rendering:pixelated] pl-3.5 pt-0 pr-0 pb-0 text-[#000000] text-style-il-regular',
    },
} as const;

const radioButtonVariants = cva(
    '',
    {
        variants: radioButtonVariantsConfig,
        defaultVariants: {
            variant: '0',
        },
    }
);

type RadioButtonVariantProps = VariantProps<typeof radioButtonVariantsConfig>;

interface RadioButtonProps extends HTMLAttributes<HTMLDivElement>, RadioButtonVariantProps {
    className?: string;
    defaultVariant?: string;
}

export const RadioButton = forwardRef<HTMLDivElement, RadioButtonProps>(
    ({ className, variant, defaultVariant, children, ...props }, ref) => {
        const cascadedVariant = useCascadedVariant('radioButton');
        const resolvedVariant = (variant ?? cascadedVariant ?? defaultVariant ?? '0') as never;
        const ownCascade = VARIANT_CASCADE_CONFIG['radioButton']?.[resolvedVariant];
        return (
            <div
                ref={ref}
                className={cn(radioButtonVariants({ variant: resolvedVariant }), className)}
                {...props}
            >
                <VariantCascadeProvider map={ownCascade}>{children}</VariantCascadeProvider>
            </div>
        );
    }
);

RadioButton.displayName = 'RadioButton';
