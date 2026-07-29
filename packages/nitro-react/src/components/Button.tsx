import { ButtonHTMLAttributes, forwardRef } from 'react';

import { cn, cva, type VariantProps } from '#base/utils';

const buttonVariantsConfig = {
    variant: {
        // default
        '0': '[border-image-source:var(--button-0-default-src)] [border-image-slice:3_3_3_3_fill] [border-image-width:3px_3px_3px_3px] [border-image-repeat:stretch] hover:[border-image-source:var(--button-0-hovering-src)] hover:[border-image-slice:3_3_3_3_fill] hover:[border-image-width:3px_3px_3px_3px] hover:[border-image-repeat:stretch] active:[border-image-source:var(--button-0-pressed-src)] active:[border-image-slice:3_3_3_3_fill] active:[border-image-width:3px_3px_3px_3px] active:[border-image-repeat:stretch] aria-disabled:[border-image-source:var(--button-0-disabled-src)] aria-disabled:[border-image-slice:3_3_3_3_fill] aria-disabled:[border-image-width:3px_3px_3px_3px] aria-disabled:[border-image-repeat:stretch] min-w-5 min-h-5.5 pl-2 pt-1 pr-2 pb-1 text-[#000000] text-style-button-regular',
        // black
        '1': '[border-image-source:var(--button-1-default-src)] [border-image-slice:3_3_3_3_fill] [border-image-width:3px_3px_3px_3px] [border-image-repeat:stretch] hover:[border-image-source:var(--button-1-hovering-src)] hover:[border-image-slice:3_3_3_3_fill] hover:[border-image-width:3px_3px_3px_3px] hover:[border-image-repeat:stretch] active:[border-image-source:var(--border-3-default-src)] active:[border-image-slice:3_3_3_3_fill] active:[border-image-width:3px_3px_3px_3px] active:[border-image-repeat:stretch] aria-disabled:[border-image-source:var(--button-1-disabled-src)] aria-disabled:[border-image-slice:3_3_3_3_fill] aria-disabled:[border-image-width:3px_3px_3px_3px] aria-disabled:[border-image-repeat:stretch] min-w-5 min-h-5.5 pl-2 pt-1 pr-2 pb-1 text-[#ffffff] text-style-button-regular',
        // white
        '2': '[border-image-source:var(--button-0-default-src)] [border-image-slice:3_3_3_3_fill] [border-image-width:3px_3px_3px_3px] [border-image-repeat:stretch] hover:[border-image-source:var(--button-0-hovering-src)] hover:[border-image-slice:3_3_3_3_fill] hover:[border-image-width:3px_3px_3px_3px] hover:[border-image-repeat:stretch] active:[border-image-source:var(--button-0-pressed-src)] active:[border-image-slice:3_3_3_3_fill] active:[border-image-width:3px_3px_3px_3px] active:[border-image-repeat:stretch] aria-disabled:[border-image-source:var(--button-0-disabled-src)] aria-disabled:[border-image-slice:3_3_3_3_fill] aria-disabled:[border-image-width:3px_3px_3px_3px] aria-disabled:[border-image-repeat:stretch] min-w-5 min-h-5.5 pl-2 pt-1 pr-2 pb-1 text-[#000000] text-style-button-regular',
        // default
        '3': '[border-image-source:var(--button-3-default-src)] [border-image-slice:5_5_5_5_fill] [border-image-width:5px_5px_5px_5px] [border-image-repeat:stretch] hover:[border-image-source:var(--button-3-hovering-src)] hover:[border-image-slice:5_5_5_5_fill] hover:[border-image-width:5px_5px_5px_5px] hover:[border-image-repeat:stretch] active:[border-image-source:var(--button-3-pressed-src)] active:[border-image-slice:5_5_5_5_fill] active:[border-image-width:5px_5px_5px_5px] active:[border-image-repeat:stretch] aria-disabled:[border-image-source:var(--button-3-disabled-src)] aria-disabled:[border-image-slice:5_5_5_5_fill] aria-disabled:[border-image-width:5px_5px_5px_5px] aria-disabled:[border-image-repeat:stretch] min-w-5 min-h-5.5 pl-2 pt-0.5 pr-2 pb-0.75 text-[#000000] text-style-button-shiny-regular',
        // black
        '4': '[border-image-source:var(--button-4-default-src)] [border-image-slice:5_5_5_5_fill] [border-image-width:5px_5px_5px_5px] [border-image-repeat:stretch] hover:[border-image-source:var(--button-4-hovering-src)] hover:[border-image-slice:5_5_5_5_fill] hover:[border-image-width:5px_5px_5px_5px] hover:[border-image-repeat:stretch] active:[border-image-source:var(--button-4-pressed-src)] active:[border-image-slice:5_5_5_5_fill] active:[border-image-width:5px_5px_5px_5px] active:[border-image-repeat:stretch] aria-disabled:[border-image-source:var(--button-4-disabled-src)] aria-disabled:[border-image-slice:5_5_5_5_fill] aria-disabled:[border-image-width:5px_5px_5px_5px] aria-disabled:[border-image-repeat:stretch] min-w-5 min-h-7 pl-2.5 pt-1.25 pr-2.5 pb-1.5 text-[#ffffff] text-style-button-shiny-regular',
        // white
        '5': '[border-image-source:var(--button-3-default-src)] [border-image-slice:5_5_5_5_fill] [border-image-width:5px_5px_5px_5px] [border-image-repeat:stretch] hover:[border-image-source:var(--button-3-hovering-src)] hover:[border-image-slice:5_5_5_5_fill] hover:[border-image-width:5px_5px_5px_5px] hover:[border-image-repeat:stretch] active:[border-image-source:var(--button-3-pressed-src)] active:[border-image-slice:5_5_5_5_fill] active:[border-image-width:5px_5px_5px_5px] active:[border-image-repeat:stretch] aria-disabled:[border-image-source:var(--button-3-disabled-src)] aria-disabled:[border-image-slice:5_5_5_5_fill] aria-disabled:[border-image-width:5px_5px_5px_5px] aria-disabled:[border-image-repeat:stretch] min-w-5 min-h-7 pl-2.5 pt-1.25 pr-2.5 pb-1.5 text-[#ffffff] text-style-button-shiny-regular',
        // green
        '6': '[border-image-source:var(--button-6-default-src)] [border-image-slice:5_5_5_5_fill] [border-image-width:5px_5px_5px_5px] [border-image-repeat:stretch] hover:[border-image-source:var(--button-6-hovering-src)] hover:[border-image-slice:5_5_5_5_fill] hover:[border-image-width:5px_5px_5px_5px] hover:[border-image-repeat:stretch] active:[border-image-source:var(--button-6-pressed-src)] active:[border-image-slice:5_5_5_5_fill] active:[border-image-width:5px_5px_5px_5px] active:[border-image-repeat:stretch] aria-disabled:[border-image-source:var(--button-6-disabled-src)] aria-disabled:[border-image-slice:5_5_5_5_fill] aria-disabled:[border-image-width:5px_5px_5px_5px] aria-disabled:[border-image-repeat:stretch] min-w-5 min-h-7 pl-2.5 pt-1.25 pr-2.5 pb-1.5 text-[#ffffff] text-style-button-shiny-regular',
        // landing view
        '100': 'inline-block min-w-12.5 min-h-12.5 [background-image:var(--button-100-default-src)] bg-size-[100%_100%] bg-no-repeat [image-rendering:pixelated] hover:[background-image:var(--button-100-hovering-src)] hover:bg-size-[100%_100%] hover:bg-no-repeat hover:[image-rendering:pixelated] active:[background-image:var(--button-100-pressed-src)] active:bg-size-[100%_100%] active:bg-no-repeat active:[image-rendering:pixelated] pl-6 pt-3.5 pr-6 pb-3.5 text-[#000000] text-style-il-button',
        // window
        '101': 'inline-block min-w-12.5 min-h-12.5 [background-image:var(--button-100-default-src)] bg-size-[100%_100%] bg-no-repeat [image-rendering:pixelated] hover:[background-image:var(--button-101-hovering-src)] hover:bg-size-[100%_100%] hover:bg-no-repeat hover:[image-rendering:pixelated] active:[background-image:var(--button-101-pressed-src)] active:bg-size-[100%_100%] active:bg-no-repeat active:[image-rendering:pixelated] pl-6 pt-3.5 pr-6 pb-3.5 text-[#000000] text-style-il-button',
        // plain
        '102': 'inline-block min-w-7 min-h-7 [background-image:var(--button-102-default-src)] bg-size-[100%_100%] bg-no-repeat [image-rendering:pixelated] active:[background-image:var(--button-102-pressed-src)] active:bg-size-[100%_100%] active:bg-no-repeat active:[image-rendering:pixelated] pl-3.25 pt-0.75 pr-3.25 pb-0.75 text-[#000000] text-style-il-button',
        // unetched
        '103': 'inline-block min-w-7 min-h-7 [background-image:var(--button-103-default-src)] bg-size-[100%_100%] bg-no-repeat [image-rendering:pixelated] active:[background-image:var(--button-103-pressed-src)] active:bg-size-[100%_100%] active:bg-no-repeat active:[image-rendering:pixelated] pl-3.25 pt-0.75 pr-3.25 pb-0.75 text-[#000000] text-style-il-button',
        // default
        '200': '[border-image-source:var(--button-200-default-src)] [border-image-slice:4_4_5_4_fill] [border-image-width:4px_4px_5px_4px] [border-image-repeat:stretch] min-w-7 min-h-7 pl-3.25 pt-0.75 pr-3.25 pb-0.75 text-[#000000] text-style-id-button',
    },
} as const;

const buttonVariants = cva(
    'inline-flex items-center justify-center box-border pointer-events-auto leading-none cursor-pointer',
    {
        variants: buttonVariantsConfig,
        defaultVariants: {
            variant: '0',
        },
    }
);

type ButtonVariantProps = VariantProps<typeof buttonVariantsConfig>;

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, ButtonVariantProps {
    className?: string;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, ...props }, ref) => (
        <button
            ref={ref}
            className={cn(buttonVariants({ variant }), className)}
            {...props}
        />
    )
);

Button.displayName = 'Button';
