import { forwardRef, type HTMLAttributes } from 'react';

import { cn } from '#base/utils';


interface FrameContentProps extends HTMLAttributes<HTMLDivElement> {
    className?: string;
}

export const FrameContent = forwardRef<HTMLDivElement, FrameContentProps>(
    ({ className, ...props }, ref) => (
        <div
            ref={ref}
            className={cn('relative flex pl-1 pr-1 pt-px pb-1.5 size-full overflow-hidden', className)}
            {...props} />
    )
);

FrameContent.displayName = 'FrameContent';
