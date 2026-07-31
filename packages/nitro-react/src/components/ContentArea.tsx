import { forwardRef, type HTMLAttributes } from 'react';

import { cn } from '#base/utils';

interface ContentAreaProps extends HTMLAttributes<HTMLDivElement> {
    className?: string;
}

export const ContentArea = forwardRef<HTMLDivElement, ContentAreaProps>(
    ({ className, ...props }, ref) => (
        <div
            ref={ref}
            className={cn('relative flex flex-col px-0.75 pt-px pb-1.5 size-full overflow-hidden', className)}
            {...props} />
    )
);

ContentArea.displayName = 'ContentArea';
