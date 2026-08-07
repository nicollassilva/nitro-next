import { forwardRef, type HTMLAttributes } from 'react';

import { useAccordionItem } from './AccordionContext';
import { cn } from './utils';

interface AccordionContentProps extends HTMLAttributes<HTMLDivElement> {
    className?: string;
    unwrapped?: boolean;
}

export const AccordionContent = forwardRef<HTMLDivElement, AccordionContentProps>(
    ({ className, unwrapped, children, ...props }, ref) => {
        const { isOpen } = useAccordionItem();

        if (!isOpen) return null;

        if (unwrapped) return <>{children}</>;

        return (
            <div ref={ref} data-state="open" className={cn(className)} {...props}>
                {children}
            </div>
        );
    }
);

AccordionContent.displayName = 'AccordionContent';
