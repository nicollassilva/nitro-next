import { ReactNode } from "react";

import { AccordionContent, AccordionItem, AccordionTrigger, NitroIcon } from "#base/theme";

interface FriendListGroupProps {
    value: string;
    caption: string;
    children?: ReactNode;
    showArrows?: boolean;
}

export const FriendListGroup = (props: FriendListGroupProps) => {
    const { value, caption, children, showArrows = true } = props;

    return (
        <AccordionItem value={ value }>
            <AccordionTrigger className="font-bold px-1 flex gap-1 items-center py-0.5 h-5">
                { ({ isOpen }) => <>
                    { caption }
                    { showArrows && <NitroIcon className="mb-px" icon={ isOpen ? 'icon-arrow-down-black' : 'icon-arrow-right-black' } /> }
                </> }
            </AccordionTrigger>
            <AccordionContent unwrapped>
                { children }
            </AccordionContent>
        </AccordionItem>
    );
}
