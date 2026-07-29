import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';

import { cn } from '#base/utils';

interface ColorizeProps extends HTMLAttributes<HTMLDivElement> {
    tintColor: string;
    layerClassName?: string;
    children?: ReactNode;
}

export const Colorize = forwardRef<HTMLDivElement, ColorizeProps>(
    ({ tintColor, layerClassName, children, className, style, ...props }, ref) => (
        <div ref={ref} className="relative" style={style} {...props}>
            <div
                aria-hidden
                className={cn('pointer-events-none absolute inset-0', layerClassName)}
                style={tintColor ? { filter: tintColor } : undefined}
            />
            <div className={cn('relative z-10 size-full', className)}>
                {children}
            </div>
        </div>
    )
);

Colorize.displayName = 'Colorize';