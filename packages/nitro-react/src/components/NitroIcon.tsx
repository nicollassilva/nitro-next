import { forwardRef, HTMLAttributes } from 'react';

import { cn } from '#base/utils';

interface NitroIconProps extends HTMLAttributes<HTMLDivElement> {
    className?: string;
    icon: string;
}

export const NitroIcon = forwardRef<HTMLDivElement, NitroIconProps>(
    ({ className, icon, ...props }, ref) => (
        <div
            ref={ref}
            className={cn('nitro-icon', icon, className)}
            {...props}
        />
    )
);

NitroIcon.displayName = 'NitroIcon';