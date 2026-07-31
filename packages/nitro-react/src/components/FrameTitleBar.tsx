import { forwardRef, type HTMLAttributes } from 'react';

import { cn, cva, VariantProps } from '#base/utils';

import { CloseButton } from './CloseButton';

const frameTitleBarVariantsConfig = {
    variant: {
        // blue
        '0': 'min-h-3.75 max-h-3.75 py-px px-2 text-style-frame-title text-white',
        // black
        '1': 'inline-block min-w-6.75 min-h-11.5 [background-image:var(--frame-1-default-src)] bg-size-[100%_100%] bg-no-repeat text-[#000000]',
        // yellow
        '2': 'inline-block min-w-6.75 min-h-11.5 [background-image:var(--frame-2-default-src)] bg-size-[100%_100%] bg-no-repeat text-[#000000]',
        // default
        '3': 'min-h-[32px] max-h-[32px] pt-px pl-1.5 pr-1.5 text-style-u-frame-title text-white',
        // light
        '4': 'min-h-[32px] max-h-[32px] pt-px pl-1.5 pr-1.5 text-style-u-frame-title text-white',
        // bubble
        '7': 'min-h-[32px] max-h-[32px] pt-px pl-1.5 pr-1.5 text-style-u-frame-title text-black',
        // default
        '100': 'inline-block min-w-2.75 min-h-3.25 [background-image:var(--border-101-default-src)] bg-size-[100%_100%] bg-no-repeat text-[#000000] text-style-il-frame-title',
        // modal
        '101': 'min-w-12.5 min-h-20 text-[#000000] text-style-il-frame-modal-title',
        // default
        '200': '[border-image-source:var(--frame-200-default-src)] [border-image-slice:4_4_5_4_fill] [border-image-width:4px_4px_5px_4px] [border-image-repeat:stretch] min-w-12.5 min-h-12.5 text-[#000000] text-style-id-frame-title',
    },
} as const;

const frameTitleBarVariants = cva(
    'relative flex items-center justify-center overflow-hidden',
    {
        variants: frameTitleBarVariantsConfig,
        defaultVariants: {
            variant: '3',
        },
    }
);

type FrameTitleBarVariantProps = VariantProps<typeof frameTitleBarVariantsConfig>;

interface FrameTitleBarProps extends HTMLAttributes<HTMLDivElement>, FrameTitleBarVariantProps {
    caption: string;
    className?: string;
    closeButtonVariant?: string;
    onClose?: () => void;
}

export const FrameTitleBar = forwardRef<HTMLDivElement, FrameTitleBarProps>(
    ({ className, variant, caption, onClose, ...props }, ref) => (
        <div
            ref={ref}
            className={cn(frameTitleBarVariants({ variant }), className)}
            {...props}
        >
            <span className="flex items-center justify-center flex-1 pr-2 pl-2 overflow-hidden">{caption}</span>
            <CloseButton variant="3" className="shrink-0" onClick={onClose} />
        </div>
    )
);

FrameTitleBar.displayName = 'FrameTitleBar';
