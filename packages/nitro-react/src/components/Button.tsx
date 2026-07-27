import { forwardRef, type HTMLAttributes } from 'react';

import { cn } from '#base/utils';

const VARIANT_CLASS_NAME: Record<string, string> = {
    // default
    '0': '[border-image-source:var(--button-0-default-src)] [border-image-slice:3_3_3_3_fill] [border-image-width:3px_3px_3px_3px] [border-image-repeat:stretch] hover:[border-image-source:var(--button-0-hovering-src)] hover:[border-image-slice:3_3_3_3_fill] hover:[border-image-width:3px_3px_3px_3px] hover:[border-image-repeat:stretch] active:[border-image-source:var(--button-0-pressed-src)] active:[border-image-slice:3_3_3_3_fill] active:[border-image-width:3px_3px_3px_3px] active:[border-image-repeat:stretch] aria-disabled:[border-image-source:var(--button-0-disabled-src)] aria-disabled:[border-image-slice:3_3_3_3_fill] aria-disabled:[border-image-width:3px_3px_3px_3px] aria-disabled:[border-image-repeat:stretch] min-w-[20px] min-h-[22px] pl-[8px] pt-[4px] pr-[8px] pb-[4px] text-[#000000] text-style-button-regular',
    // black
    '1': '[border-image-source:var(--button-1-default-src)] [border-image-slice:3_3_3_3_fill] [border-image-width:3px_3px_3px_3px] [border-image-repeat:stretch] hover:[border-image-source:var(--button-1-hovering-src)] hover:[border-image-slice:3_3_3_3_fill] hover:[border-image-width:3px_3px_3px_3px] hover:[border-image-repeat:stretch] active:[border-image-source:var(--button-1-pressed-src)] active:[border-image-slice:3_3_3_3_fill] active:[border-image-width:3px_3px_3px_3px] active:[border-image-repeat:stretch] aria-disabled:[border-image-source:var(--button-1-disabled-src)] aria-disabled:[border-image-slice:3_3_3_3_fill] aria-disabled:[border-image-width:3px_3px_3px_3px] aria-disabled:[border-image-repeat:stretch] min-w-[20px] min-h-[22px] pl-[8px] pt-[4px] pr-[8px] pb-[4px] text-[#ffffff] text-style-button-regular',
    // white
    '2': '[border-image-source:var(--button-2-default-src)] [border-image-slice:3_3_3_3_fill] [border-image-width:3px_3px_3px_3px] [border-image-repeat:stretch] hover:[border-image-source:var(--button-2-hovering-src)] hover:[border-image-slice:3_3_3_3_fill] hover:[border-image-width:3px_3px_3px_3px] hover:[border-image-repeat:stretch] active:[border-image-source:var(--button-2-pressed-src)] active:[border-image-slice:3_3_3_3_fill] active:[border-image-width:3px_3px_3px_3px] active:[border-image-repeat:stretch] aria-disabled:[border-image-source:var(--button-2-disabled-src)] aria-disabled:[border-image-slice:3_3_3_3_fill] aria-disabled:[border-image-width:3px_3px_3px_3px] aria-disabled:[border-image-repeat:stretch] min-w-[20px] min-h-[22px] pl-[8px] pt-[4px] pr-[8px] pb-[4px] text-[#000000] text-style-button-regular',
    // default
    '3': '[border-image-source:var(--button-3-default-src)] [border-image-slice:5_5_5_5_fill] [border-image-width:5px_5px_5px_5px] [border-image-repeat:stretch] hover:[border-image-source:var(--button-3-hovering-src)] hover:[border-image-slice:5_5_5_5_fill] hover:[border-image-width:5px_5px_5px_5px] hover:[border-image-repeat:stretch] active:[border-image-source:var(--button-3-pressed-src)] active:[border-image-slice:5_5_5_5_fill] active:[border-image-width:5px_5px_5px_5px] active:[border-image-repeat:stretch] aria-disabled:[border-image-source:var(--button-3-disabled-src)] aria-disabled:[border-image-slice:5_5_5_5_fill] aria-disabled:[border-image-width:5px_5px_5px_5px] aria-disabled:[border-image-repeat:stretch] min-w-[20px] min-h-[22px] pl-[8px] pt-[2px] pr-[8px] pb-[3px] text-[#000000] text-style-button-shiny-regular',
    // black
    '4': '[border-image-source:var(--button-4-default-src)] [border-image-slice:5_5_5_5_fill] [border-image-width:5px_5px_5px_5px] [border-image-repeat:stretch] hover:[border-image-source:var(--button-4-hovering-src)] hover:[border-image-slice:5_5_5_5_fill] hover:[border-image-width:5px_5px_5px_5px] hover:[border-image-repeat:stretch] active:[border-image-source:var(--button-4-pressed-src)] active:[border-image-slice:5_5_5_5_fill] active:[border-image-width:5px_5px_5px_5px] active:[border-image-repeat:stretch] aria-disabled:[border-image-source:var(--button-4-disabled-src)] aria-disabled:[border-image-slice:5_5_5_5_fill] aria-disabled:[border-image-width:5px_5px_5px_5px] aria-disabled:[border-image-repeat:stretch] min-w-[20px] min-h-[28px] pl-[10px] pt-[5px] pr-[10px] pb-[6px] text-[#ffffff] text-style-button-shiny-regular',
    // white
    '5': '[border-image-source:var(--button-5-default-src)] [border-image-slice:5_5_5_5_fill] [border-image-width:5px_5px_5px_5px] [border-image-repeat:stretch] hover:[border-image-source:var(--button-5-hovering-src)] hover:[border-image-slice:5_5_5_5_fill] hover:[border-image-width:5px_5px_5px_5px] hover:[border-image-repeat:stretch] active:[border-image-source:var(--button-5-pressed-src)] active:[border-image-slice:5_5_5_5_fill] active:[border-image-width:5px_5px_5px_5px] active:[border-image-repeat:stretch] aria-disabled:[border-image-source:var(--button-5-disabled-src)] aria-disabled:[border-image-slice:5_5_5_5_fill] aria-disabled:[border-image-width:5px_5px_5px_5px] aria-disabled:[border-image-repeat:stretch] min-w-[20px] min-h-[28px] pl-[10px] pt-[5px] pr-[10px] pb-[6px] text-[#ffffff] text-style-button-shiny-regular',
    // green
    '6': '[border-image-source:var(--button-6-default-src)] [border-image-slice:5_5_5_5_fill] [border-image-width:5px_5px_5px_5px] [border-image-repeat:stretch] hover:[border-image-source:var(--button-6-hovering-src)] hover:[border-image-slice:5_5_5_5_fill] hover:[border-image-width:5px_5px_5px_5px] hover:[border-image-repeat:stretch] active:[border-image-source:var(--button-6-pressed-src)] active:[border-image-slice:5_5_5_5_fill] active:[border-image-width:5px_5px_5px_5px] active:[border-image-repeat:stretch] aria-disabled:[border-image-source:var(--button-6-disabled-src)] aria-disabled:[border-image-slice:5_5_5_5_fill] aria-disabled:[border-image-width:5px_5px_5px_5px] aria-disabled:[border-image-repeat:stretch] min-w-[20px] min-h-[28px] pl-[10px] pt-[5px] pr-[10px] pb-[6px] text-[#ffffff] text-style-button-shiny-regular',
    // landing view
    '100': 'inline-block min-w-[50px] min-h-[50px] [background-image:var(--button-100-default-src)] [background-size:100%_100%] [background-repeat:no-repeat] hover:[background-image:var(--button-100-hovering-src)] hover:[background-size:100%_100%] hover:[background-repeat:no-repeat] active:[background-image:var(--button-100-pressed-src)] active:[background-size:100%_100%] active:[background-repeat:no-repeat] pl-[24px] pt-[14px] pr-[24px] pb-[14px] text-[#000000] text-style-il-button',
    // window
    '101': 'inline-block min-w-[50px] min-h-[50px] [background-image:var(--button-101-default-src)] [background-size:100%_100%] [background-repeat:no-repeat] hover:[background-image:var(--button-101-hovering-src)] hover:[background-size:100%_100%] hover:[background-repeat:no-repeat] active:[background-image:var(--button-101-pressed-src)] active:[background-size:100%_100%] active:[background-repeat:no-repeat] pl-[24px] pt-[14px] pr-[24px] pb-[14px] text-[#000000] text-style-il-button',
    // plain
    '102': 'inline-block min-w-[28px] min-h-[28px] [background-image:var(--button-102-default-src)] [background-size:100%_100%] [background-repeat:no-repeat] active:[background-image:var(--button-102-pressed-src)] active:[background-size:100%_100%] active:[background-repeat:no-repeat] pl-[13px] pt-[3px] pr-[13px] pb-[3px] text-[#000000] text-style-il-button',
    // unetched
    '103': 'inline-block min-w-[28px] min-h-[28px] [background-image:var(--button-103-default-src)] [background-size:100%_100%] [background-repeat:no-repeat] active:[background-image:var(--button-103-pressed-src)] active:[background-size:100%_100%] active:[background-repeat:no-repeat] pl-[13px] pt-[3px] pr-[13px] pb-[3px] text-[#000000] text-style-il-button',
    // default
    '200': '[border-image-source:var(--button-200-default-src)] [border-image-slice:4_4_5_4_fill] [border-image-width:4px_4px_5px_4px] [border-image-repeat:stretch] min-w-[28px] min-h-[28px] pl-[13px] pt-[3px] pr-[13px] pb-[3px] text-[#000000] text-style-id-button',
};

interface ButtonProps extends HTMLAttributes<HTMLDivElement> {
    className?: string;
    variant?: '0' | '1' | '2' | '3' | '4' | '5' | '6' | '100' | '101' | '102' | '103' | '200';
}

export const Button = forwardRef<HTMLDivElement, ButtonProps>(
    ({ className, variant, children, ...props }, ref) => (
        <div
            ref={ref}
            className={cn('select-none cursor-pointer pointer-events-auto leading-none inline-flex items-center justify-center', VARIANT_CLASS_NAME[variant ?? '0'] ?? VARIANT_CLASS_NAME['0'], className)}
            {...props}
        >
            {children}
        </div>
    )
);

Button.displayName = 'Button';
