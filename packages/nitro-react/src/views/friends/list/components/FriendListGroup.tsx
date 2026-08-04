import { ReactNode } from "react";

import { useLocalizationStore } from "#base/stores";
import { AccordionContent, AccordionItem, AccordionTrigger, NitroIcon } from "#base/theme";

interface FriendListGroupProps {
    value: string;
    caption: string;
    count: number;
    children?: ReactNode;
}

export const FriendListGroup = (props: FriendListGroupProps) => {
    const { value, caption, count, children } = props;

    const getLocalizationValue = useLocalizationStore(x => x.getLocalizationValue);

    return (
        <AccordionItem value={ value }>
            <AccordionTrigger className="font-bold px-1 flex gap-1 items-center py-0.5 h-5">
                { ({ isOpen }) => <>
                    { getLocalizationValue(caption) } ({ count })
                    <NitroIcon className="mb-px" icon={ isOpen ? 'icon-arrow-down-black' : 'icon-arrow-right-black' } />
                </> }
            </AccordionTrigger>
            <AccordionContent unwrapped>
                { children }
            </AccordionContent>
        </AccordionItem>
    );
}
