import { type HTMLAttributes, type ReactNode } from 'react';

import { cn, DYNAMIC_ART_CLASS, DYNAMIC_TEXT_CLASS, type DynamicStyleName, useDynamicStyle } from '#base/utils';

interface DynamicChildProps extends HTMLAttributes<HTMLDivElement> {
    dynamicStyle?: DynamicStyleName;
    tag?: string;
    asText?: boolean;
    children?: ReactNode;
}

export const DynamicChild = ({ dynamicStyle, tag = '#icon', asText, className, style, children, ...props }: DynamicChildProps) => {
    const dynamicVars = useDynamicStyle(dynamicStyle, tag);

    return (
        <div
            className={cn(dynamicVars && (asText ? DYNAMIC_TEXT_CLASS : DYNAMIC_ART_CLASS), className)}
            style={{ ...style, ...dynamicVars }}
            {...props}
        >
            {children}
        </div>
    );
};

DynamicChild.displayName = 'DynamicChild';
