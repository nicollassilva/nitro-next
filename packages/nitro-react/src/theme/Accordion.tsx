import { type HTMLAttributes, useState } from 'react';

import { AccordionContext, type AccordionType } from './AccordionContext';
import { cn } from './utils';

type AccordionBaseProps = Omit<HTMLAttributes<HTMLDivElement>, 'onChange' | 'defaultValue'> & {
    className?: string;
    unwrapped?: boolean;
}

type AccordionSingleProps = AccordionBaseProps & {
    type?: 'single';
    collapsible?: boolean;
    value?: string;
    defaultValue?: string;
    onValueChange?: (value: string) => void;
}

type AccordionMultipleProps = AccordionBaseProps & {
    type: 'multiple';
    value?: string[];
    defaultValue?: string[];
    onValueChange?: (value: string[]) => void;
}

type AccordionProps = AccordionSingleProps | AccordionMultipleProps;

type AccordionResolvedProps = AccordionBaseProps & {
    type?: AccordionType;
    collapsible?: boolean;
    value?: string | string[];
    defaultValue?: string | string[];
    onValueChange?: (value: string | string[]) => void;
}

const toValues = (value: string | string[] | undefined) => {
    if (Array.isArray(value)) return value;
    if (!value) return [];

    return [value];
}

export const Accordion = (props: AccordionProps) => {
    const { className, unwrapped, type, collapsible, value, defaultValue, onValueChange, children, ...rest } = props as AccordionResolvedProps;

    const isSingle = (type ?? 'single') === 'single';
    const isControlled = value !== undefined;

    const [internalValues, setInternalValues] = useState<string[]>(() => toValues(defaultValue));

    const openValues = isControlled ? toValues(value) : internalValues;

    const setValues = (values: string[]) => {
        if (!isControlled) setInternalValues(values);

        onValueChange?.(isSingle ? values[0] ?? '' : values);
    }

    const isOpen = (item: string) => openValues.includes(item);

    const toggle = (item: string) => {
        if (isSingle) {
            if (!isOpen(item)) return setValues([item]);
            if (collapsible) return setValues([]);

            return;
        }

        setValues(isOpen(item) ? openValues.filter(x => x !== item) : [...openValues, item]);
    }

    const context = { openValues, isOpen, toggle };

    if (unwrapped) {
        return (
            <AccordionContext.Provider value={context}>
                {children}
            </AccordionContext.Provider>
        );
    }

    return (
        <div className={cn('flex flex-col', className)} {...rest}>
            <AccordionContext.Provider value={context}>
                {children}
            </AccordionContext.Provider>
        </div>
    );
}

Accordion.displayName = 'Accordion';
