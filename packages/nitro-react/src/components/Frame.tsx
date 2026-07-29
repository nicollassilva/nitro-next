import { forwardRef, type HTMLAttributes } from 'react';

import { cn, cva, type VariantProps } from '#base/utils';

import { Colorize } from './Colorize';
import { FrameContent } from './FrameContent';
import { FrameTitleBar } from './FrameTitleBar';
import { Scaler } from './Scaler';

const frameVariantsConfig = {
    variant: {
        // blue
        '0': 'inline-block min-w-6.75 min-h-11.5 [background-image:var(--frame-0-default-src)] bg-size-[100%_100%] bg-no-repeat [image-rendering:pixelated] text-[#000000]',
        // black
        '1': 'inline-block min-w-6.75 min-h-11.5 [background-image:var(--frame-1-default-src)] bg-size-[100%_100%] bg-no-repeat [image-rendering:pixelated] text-[#000000]',
        // yellow
        '2': 'inline-block min-w-6.75 min-h-11.5 [background-image:var(--frame-2-default-src)] bg-size-[100%_100%] bg-no-repeat [image-rendering:pixelated] text-[#000000]',
        // default
        '3': '[border-image-source:var(--frame-3-default-src)] [border-image-slice:33_10_10_10_fill] [border-image-width:33px_10px_10px_10px] [border-image-repeat:stretch] min-w-16 min-h-16 text-[#000000]',
        // light
        '4': '[border-image-source:var(--frame-4-default-src)] [border-image-slice:33_10_10_10_fill] [border-image-width:33px_10px_10px_10px] [border-image-repeat:stretch] min-w-16 min-h-16 text-[#000000]',
        // bubble
        '7': '[border-image-source:var(--frame-7-default-src)] [border-image-slice:33_10_10_10_fill] [border-image-width:33px_10px_10px_10px] [border-image-repeat:stretch] min-w-16 min-h-18.25 text-[#000000]',
        // default
        '100': 'inline-block min-w-2.75 min-h-3.25 [background-image:var(--border-101-default-src)] bg-size-[100%_100%] bg-no-repeat [image-rendering:pixelated] text-[#000000] text-style-il-frame-title',
        // modal
        '101': 'min-w-12.5 min-h-20 text-[#000000] text-style-il-frame-modal-title',
        // default
        '200': '[border-image-source:var(--frame-200-default-src)] [border-image-slice:4_4_5_4_fill] [border-image-width:4px_4px_5px_4px] [border-image-repeat:stretch] min-w-12.5 min-h-12.5 text-[#000000] text-style-id-frame-title',
    },
} as const;

const frameVariants = cva(
    'absolute flex flex-col min-w-10 min-h-10 pointer-events-auto',
    {
        variants: frameVariantsConfig,
        defaultVariants: {
            variant: '0',
        },
    }
);

type FrameVariantProps = VariantProps<typeof frameVariantsConfig>;

interface FrameProps extends HTMLAttributes<HTMLDivElement>, FrameVariantProps {
    caption: string;
    tintColor?: string;
    className?: string;
    onClose?: () => void;
}

export const Frame = forwardRef<HTMLDivElement, FrameProps>(
    ({ caption, tintColor, className, onClose, children, variant, ...props }, ref) => {
        if (tintColor && tintColor.length) return (
            <Colorize ref={ref} className={className} tintColor={tintColor} layerClassName={frameVariants({ variant })} {...props}><FrameTitleBar variant={variant} caption={caption} onClose={onClose} />
                <FrameContent>
                    {children}
                    <Scaler />
                </FrameContent>
            </Colorize>
        );

        return (<div
            ref={ref}
            className={cn(frameVariants({ variant }), className)}
            {...props}>
            <FrameTitleBar variant={variant} caption={caption} onClose={onClose} />
            <FrameContent>
                {children}
                <Scaler />
            </FrameContent>
        </div>);
    }
);

Frame.displayName = 'Frame';
