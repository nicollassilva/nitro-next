import { forwardRef, type HTMLAttributes, type KeyboardEvent as ReactKeyboardEvent, type MouseEvent as ReactMouseEvent, type ReactNode } from 'react';

import { useAccordion, useAccordionItem } from './AccordionContext';
import { cn } from './utils';

interface AccordionTriggerProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
    className?: string;
    children?: ReactNode | ((state: { isOpen: boolean }) => ReactNode);
}

export const AccordionTrigger = forwardRef<HTMLDivElement, AccordionTriggerProps>(
    ({ className, children, onClick, onKeyDown, ...props }, ref) => {
        const { alwaysOpen } = useAccordion();
        const { isOpen, toggle } = useAccordionItem();

        const onTriggerClick = (event: ReactMouseEvent<HTMLDivElement>) => {
            onClick?.(event);

            if (event.defaultPrevented) return;

            toggle();
        }

        const onTriggerKeyDown = (event: ReactKeyboardEvent<HTMLDivElement>) => {
            onKeyDown?.(event);

            if (event.defaultPrevented) return;
            if (event.key !== 'Enter' && event.key !== ' ') return;

            event.preventDefault();
            toggle();
        }

        return (
            <div
                ref={ref}
                role={alwaysOpen ? undefined : 'button'}
                tabIndex={alwaysOpen ? undefined : 0}
                aria-expanded={alwaysOpen ? undefined : isOpen}
                data-state={isOpen ? 'open' : 'closed'}
                className={cn(!alwaysOpen && 'cursor-pointer', className)}
                onClick={onTriggerClick}
                onKeyDown={onTriggerKeyDown}
                {...props}
            >
                {typeof children === 'function' ? children({ isOpen }) : children}
            </div>
        );
    }
);

AccordionTrigger.displayName = 'AccordionTrigger';
