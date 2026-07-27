import { forwardRef, type HTMLAttributes } from 'react';

import { cn, cva, type VariantProps } from '#base/utils';

const closebuttonVariantsConfig = {
    variant: {
        // default
        '0': '[border-image-source:var(--closebutton-0-default-src)] [border-image-slice:0_0_0_0_fill] [border-image-width:0px_0px_0px_0px] [border-image-repeat:stretch] hover:[border-image-source:var(--closebutton-0-hovering-src)] hover:[border-image-slice:0_0_0_0_fill] hover:[border-image-width:0px_0px_0px_0px] hover:[border-image-repeat:stretch] active:[border-image-source:var(--closebutton-0-pressed-src)] active:[border-image-slice:0_0_0_0_fill] active:[border-image-width:0px_0px_0px_0px] active:[border-image-repeat:stretch]',
        // black
        '1': '[border-image-source:var(--closebutton-1-default-src)] [border-image-slice:0_0_0_0_fill] [border-image-width:0px_0px_0px_0px] [border-image-repeat:stretch] data-[active=true]:[border-image-source:var(--closebutton-1-active-src)] data-[active=true]:[border-image-slice:0_0_0_0_fill] data-[active=true]:[border-image-width:0px_0px_0px_0px] data-[active=true]:[border-image-repeat:stretch] active:[border-image-source:var(--closebutton-1-pressed-src)] active:[border-image-slice:0_0_0_0_fill] active:[border-image-width:0px_0px_0px_0px] active:[border-image-repeat:stretch]',
        // white
        '2': '[border-image-source:var(--closebutton-2-default-src)] [border-image-slice:0_0_0_0_fill] [border-image-width:0px_0px_0px_0px] [border-image-repeat:stretch] data-[active=true]:[border-image-source:var(--closebutton-2-active-src)] data-[active=true]:[border-image-slice:0_0_0_0_fill] data-[active=true]:[border-image-width:0px_0px_0px_0px] data-[active=true]:[border-image-repeat:stretch] active:[border-image-source:var(--closebutton-2-pressed-src)] active:[border-image-slice:0_0_0_0_fill] active:[border-image-width:0px_0px_0px_0px] active:[border-image-repeat:stretch]',
        // default
        '3': '[border-image-source:var(--closebutton-3-default-src)] [border-image-slice:0_0_0_0_fill] [border-image-width:0px_0px_0px_0px] [border-image-repeat:stretch] hover:[border-image-source:var(--closebutton-3-hovering-src)] hover:[border-image-slice:0_0_0_0_fill] hover:[border-image-width:0px_0px_0px_0px] hover:[border-image-repeat:stretch] active:[border-image-source:var(--closebutton-3-pressed-src)] active:[border-image-slice:0_0_0_0_fill] active:[border-image-width:0px_0px_0px_0px] active:[border-image-repeat:stretch]',
        // help
        '4': '[border-image-source:var(--closebutton-4-default-src)] [border-image-slice:0_0_0_0_fill] [border-image-width:0px_0px_0px_0px] [border-image-repeat:stretch] hover:[border-image-source:var(--closebutton-4-hovering-src)] hover:[border-image-slice:0_0_0_0_fill] hover:[border-image-width:0px_0px_0px_0px] hover:[border-image-repeat:stretch] active:[border-image-source:var(--closebutton-4-pressed-src)] active:[border-image-slice:0_0_0_0_fill] active:[border-image-width:0px_0px_0px_0px] active:[border-image-repeat:stretch]',
    },
} as const;

const closebuttonVariants = cva(
    '',
    {
        variants: closebuttonVariantsConfig,
        defaultVariants: {
            variant: '0',
        },
    }
);

type ClosebuttonVariantProps = VariantProps<typeof closebuttonVariantsConfig>;

interface ClosebuttonProps extends HTMLAttributes<HTMLDivElement>, ClosebuttonVariantProps {
    className?: string;
}

export const Closebutton = forwardRef<HTMLDivElement, ClosebuttonProps>(
    ({ className, variant, ...props }, ref) => (
        <div
            ref={ref}
            className={cn(closebuttonVariants({ variant }), className)}
            {...props}
        />
    )
);

Closebutton.displayName = 'Closebutton';
