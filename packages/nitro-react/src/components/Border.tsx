import { forwardRef, type HTMLAttributes } from 'react';

import { cn } from '#base/utils';

const VARIANT_CLASS_NAME: Record<string, string> = {
    // white with sharper corners
    '3': '[border-image-source:var(--border-3-default-src)] [border-image-slice:3_3_3_3_fill] [border-image-width:3px_3px_3px_3px] [border-image-repeat:stretch]',
    // white with thin dark border
    '4': '[border-image-source:var(--border-4-default-src)] [border-image-slice:6_6_6_6_fill] [border-image-width:6px_6px_6px_6px] [border-image-repeat:stretch] data-[active=true]:[border-image-source:var(--border-4-active-src)] data-[active=true]:[border-image-slice:6_6_6_6_fill] data-[active=true]:[border-image-width:6px_6px_6px_6px] data-[active=true]:[border-image-repeat:stretch]',
    // white with thin dark border and sharper corners
    '5': '[border-image-source:var(--border-5-default-src)] [border-image-slice:5_5_5_5_fill] [border-image-width:5px_5px_5px_5px] [border-image-repeat:stretch] data-[active=true]:[border-image-source:var(--border-5-active-src)] data-[active=true]:[border-image-slice:5_5_5_5_fill] data-[active=true]:[border-image-width:5px_5px_5px_5px] data-[active=true]:[border-image-repeat:stretch]',
    // grey with thick border
    '6': '[border-image-source:var(--border-6-default-src)] [border-image-slice:8_8_8_8_fill] [border-image-width:8px_8px_8px_8px] [border-image-repeat:stretch] data-[active=true]:[border-image-source:var(--border-6-active-src)] data-[active=true]:[border-image-slice:8_8_8_8_fill] data-[active=true]:[border-image-width:8px_8px_8px_8px] data-[active=true]:[border-image-repeat:stretch]',
    // grey with thin border
    '7': '[border-image-source:var(--border-7-default-src)] [border-image-slice:6_6_7_6_fill] [border-image-width:6px_6px_7px_6px] [border-image-repeat:stretch] data-[active=true]:[border-image-source:var(--border-7-active-src)] data-[active=true]:[border-image-slice:6_6_7_6_fill] data-[active=true]:[border-image-width:6px_6px_7px_6px] data-[active=true]:[border-image-repeat:stretch]',
    // white with thick dark border
    '8': '[border-image-source:var(--border-8-default-src)] [border-image-slice:10_10_10_10_fill] [border-image-width:10px_10px_10px_10px] [border-image-repeat:stretch]',
    // transp. grey with thick border
    '9': '[border-image-source:var(--border-9-default-src)] [border-image-slice:7_7_8_7_fill] [border-image-width:7px_7px_8px_7px] [border-image-repeat:stretch]',
    // white with drop shadow
    '10': '[border-image-source:var(--border-10-default-src)] [border-image-slice:6_6_8_6_fill] [border-image-width:6px_6px_8px_6px] [border-image-repeat:stretch] data-[active=true]:[border-image-source:var(--border-10-active-src)] data-[active=true]:[border-image-slice:6_6_8_6_fill] data-[active=true]:[border-image-width:6px_6px_8px_6px] data-[active=true]:[border-image-repeat:stretch]',
    // white with thin light border
    '0': '[border-image-source:var(--border-0-default-src)] [border-image-slice:6_6_6_6_fill] [border-image-width:6px_6px_6px_6px] [border-image-repeat:stretch] data-[active=true]:[border-image-source:var(--border-0-active-src)] data-[active=true]:[border-image-slice:6_6_6_6_fill] data-[active=true]:[border-image-width:6px_6px_6px_6px] data-[active=true]:[border-image-repeat:stretch]',
    // black borderless
    '1': '[border-image-source:var(--border-1-default-src)] [border-image-slice:6_6_6_6_fill] [border-image-width:6px_6px_6px_6px] [border-image-repeat:stretch] data-[active=true]:[border-image-source:var(--border-1-active-src)] data-[active=true]:[border-image-slice:6_6_6_6_fill] data-[active=true]:[border-image-width:6px_6px_6px_6px] data-[active=true]:[border-image-repeat:stretch] text-white',
    // white borderless
    '2': '[border-image-source:var(--border-2-default-src)] [border-image-slice:6_6_6_6_fill] [border-image-width:6px_6px_6px_6px] [border-image-repeat:stretch] data-[active=true]:[border-image-source:var(--border-2-active-src)] data-[active=true]:[border-image-slice:6_6_6_6_fill] data-[active=true]:[border-image-width:6px_6px_6px_6px] data-[active=true]:[border-image-repeat:stretch]',
    // default
    '100': '[border-image-source:var(--border-100-default-src)] [border-image-slice:3_3_3_3] [border-image-width:3px_3px_3px_3px] [border-image-repeat:stretch]',
    // frame
    '101': 'inline-block min-w-[11px] min-h-[13px] [background-image:var(--border-101-default-src)] [background-size:100%_100%] [background-repeat:no-repeat]',
    // sunk
    '102': 'inline-block min-w-[30px] min-h-[30px] [background-image:var(--border-102-default-src)] [background-size:100%_100%] [background-repeat:no-repeat]',
    // light
    '103': 'inline-block min-w-[9px] min-h-[20px] [background-image:var(--border-103-default-src)] [background-size:100%_100%] [background-repeat:no-repeat]',
    // raised
    '104': 'inline-block min-w-[17px] min-h-[18px] [background-image:var(--border-104-default-src)] [background-size:100%_100%] [background-repeat:no-repeat]',
    // input
    '105': 'inline-block min-w-[29px] min-h-[29px] [background-image:var(--border-105-default-src)] [background-size:100%_100%] [background-repeat:no-repeat]',
    // chat bubble
    '106': 'inline-block min-w-[29px] min-h-[13px] [background-image:var(--border-106-default-src)] [background-size:100%_100%] [background-repeat:no-repeat]',
    // balloon
    '107': 'inline-block min-w-[14px] min-h-[17px] [background-image:var(--border-107-default-src)] [background-size:100%_100%] [background-repeat:no-repeat]',
    // info box
    '108': '[border-image-source:var(--border-108-default-src)] [border-image-slice:3_3_3_3_fill] [border-image-width:3px_3px_3px_3px] [border-image-repeat:stretch]',
    // default
    '200': '[border-image-source:var(--border-200-default-src)] [border-image-slice:3_3_3_3_fill] [border-image-width:3px_3px_3px_3px] [border-image-repeat:stretch]',
};

interface BorderProps extends HTMLAttributes<HTMLDivElement> {
    className?: string;
    variant?: '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | '0' | '1' | '2' | '100' | '101' | '102' | '103' | '104' | '105' | '106' | '107' | '108' | '200';
}

export const Border = forwardRef<HTMLDivElement, BorderProps>(
    ({ className, variant, children, ...props }, ref) => (
        <div
            ref={ref}
            className={cn(VARIANT_CLASS_NAME[variant ?? '0'] ?? VARIANT_CLASS_NAME['0'], className)}
            {...props}
        >
            {children}
        </div>
    )
);

Border.displayName = 'Border';
