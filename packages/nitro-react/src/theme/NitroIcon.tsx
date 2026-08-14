import { forwardRef, HTMLAttributes } from 'react';

import { cn } from './utils';

interface NitroIconProps extends HTMLAttributes<HTMLDivElement> {
    className?: string;
    icon: string;
}

export const NitroIcon = forwardRef<HTMLDivElement, NitroIconProps>(
    ({ className, icon, ...props }, ref) => (
        <div
            ref={ref}
            className={cn('nitro-icon inline-block outline-0 bg-transparent bg-no-repeat bg-center shrink-0', icon, className)}
            {...props}
        />
    )
);

NitroIcon.displayName = 'NitroIcon';