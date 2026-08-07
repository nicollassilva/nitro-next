import { ReactNode } from "react";

import { useFriendsContext, useTranslation } from "#base/context";
import { AccordionContent, AccordionItem, AccordionTrigger, cn, NitroIcon } from "#base/theme";

interface FriendListTabProps {
    value: string;
    caption: string;
    tooltip?: string;
    triggerClassName?: string;
    darkHeader?: boolean;
    contentClassName?: string;
    children?: ReactNode;
}

export const FriendListTab = (props: FriendListTabProps) => {
    const { value, caption, tooltip, triggerClassName, darkHeader, contentClassName, children } = props;

    const t = useTranslation();

    const { tooltipHandlers } = useFriendsContext();

    return (
        <AccordionItem value={value}>
            <AccordionTrigger className={cn('h-4.5 shrink-0 bg-linear-to-b from-50% to-50% border-b flex justify-start items-center pt-px px-2 gap-1.5', triggerClassName)} {...(tooltip ? tooltipHandlers(tooltip) : {})}>
                {({ isOpen }) => <>
                    <span className={cn('text-[0.68rem]', darkHeader ? 'text-white' : 'text-black')}>{t(caption)}</span>
                    <NitroIcon className={cn('mb-px', darkHeader && 'brightness-0 invert')} icon={isOpen ? 'icon-arrow-down-black' : 'icon-arrow-right-black'} />
                </>}
            </AccordionTrigger>
            <AccordionContent className={cn('flex flex-col flex-1 overflow-hidden border-b', contentClassName)}>
                {children}
            </AccordionContent>
        </AccordionItem>
    );
}
