import { type ButtonHTMLAttributes, forwardRef } from 'react';

import { cn, cva } from '#base/utils';

const buttonVariants = cva(
    'inline-flex items-center justify-center select-none cursor-pointer box-border pointer-events-auto leading-none',
    {
        variants: {
            variant: {
                volterBlack: 'disabled:cursor-not-allowed [border-image-source:var(--default-button-black-src)] disabled:[border-image-source:var(--disabled-button-black-src)] active:[border-image-source:var(--pressed-button-black-src)] hover:[border-image-source:var(--hovering-button-black-src)] border-solid border-[3px] [border-image-slice:3_3_3_3_fill] [border-image-width:3px_3px_3px_3px] [border-image-repeat:stretch] text-white font-goldfish',
                volterWhite: 'disabled:cursor-not-allowed [border-image-source:var(--default-button-white-src)] disabled:[border-image-source:var(--disabled-button-white-src)] active:[border-image-source:var(--pressed-button-white-src)] hover:[border-image-source:var(--hovering-button-white-src)] border-solid border-[3px] [border-image-slice:3_3_3_3_fill] [border-image-width:3px_3px_3px_3px] [border-image-repeat:stretch] text-black font-goldfish',
                volterBlue: 'disabled:cursor-not-allowed [border-image-source:var(--default-button-blue-src)] disabled:[border-image-source:var(--disabled-button-blue-src)] active:[border-image-source:var(--pressed-button-blue-src)] hover:[border-image-source:var(--hovering-button-blue-src)] border-solid border-[3px] [border-image-slice:3_3_3_3_fill] [border-image-width:3px_3px_3px_3px] [border-image-repeat:stretch]',
                ubuntu: 'disabled:cursor-not-allowed [border-image-source:var(--default-button-shiny-src)] disabled:[border-image-source:var(--disabled-button-shiny-src)] active:[border-image-source:var(--pressed-button-shiny-src)] hover:[border-image-source:var(--hovering-button-shiny-src)] border-solid border-[5px] [border-image-slice:5_5_5_5_fill] [border-image-width:5px_5px_5px_5px] [border-image-repeat:stretch] text-black'
            },
            size: {
                volterBlack: 'text-[9px] p-[4px_8px_4px_8px] min-w-[20px] min-h-[22px]',
                volterWhite: 'text-[9px] p-[4px_8px_4px_8px] min-w-[20px] min-h-[22px]',
                volterBlue: 'text-[9px] p-[4px_8px_4px_8px] min-w-[20px] min-h-[22px]',
                ubuntu: 'text-[12px] p-[2px_8px_3px_8px] min-w-[20px] min-h-[22px]'
            },
        },
        defaultVariants: {
            variant: 'volterBlack',
            size: 'volterBlack',
        },
    }
);

type ButtonVariantProps = NonNullable<Parameters<typeof buttonVariants>[0]>;

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, ButtonVariantProps {
    className?: string;
    variant?: 'volterBlack' | 'volterWhite' | 'volterBlue' | 'ubuntu';
    size?: 'volterBlack' | 'volterWhite' | 'volterBlue' | 'ubuntu';
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, size, ...props }, ref) => (
        <button
            ref={ref}
            className={cn(buttonVariants({ variant, size }), className)}
            {...props}
        />
    )
);

Button.displayName = 'Button';