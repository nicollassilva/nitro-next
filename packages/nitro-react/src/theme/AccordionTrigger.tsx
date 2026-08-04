import { forwardRef, type HTMLAttributes, type MouseEvent as ReactMouseEvent, type ReactNode } from 'react';

import { useAccordionItem } from './AccordionContext';
import { cn } from './utils';

interface AccordionTriggerProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
    className?: string;
    children?: ReactNode | ((state: { isOpen: boolean }) => ReactNode);
}

export const AccordionTrigger = forwardRef<HTMLDivElement, AccordionTriggerProps>(
    ({ className, children, onClick, ...props }, ref) => {
        const { isOpen, toggle } = useAccordionItem();

        const onTriggerClick = (event: ReactMouseEvent<HTMLDivElement>) => {
            onClick?.(event);

            if (event.defaultPrevented) return;

            toggle();
        }

        return (
            <div
                ref={ref}
                role="button"
                aria-expanded={isOpen}
                data-state={isOpen ? 'open' : 'closed'}
                className={cn('cursor-pointer', className)}
                onClick={onTriggerClick}
                {...props}
            >
                {typeof children === 'function' ? children({ isOpen }) : children}
            </div>
        );
    }
);

AccordionTrigger.displayName = 'AccordionTrigger';
