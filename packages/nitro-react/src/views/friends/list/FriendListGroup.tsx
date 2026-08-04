import { IMessengerFriend } from "@nitrodevco/nitro-shared";

import { useLocalizationStore } from "#base/stores";
import { AccordionContent, AccordionItem, AccordionTrigger, NitroIcon } from "#base/theme";

import { FriendListItem } from "./FriendListItem";

interface FriendListGroupProps {
    value: string;
    caption: string;
    friends: IMessengerFriend[];
}

export const FriendListGroup = (props: FriendListGroupProps) => {
    const { value, caption, friends } = props;

    const getLocalizationValue = useLocalizationStore(x => x.getLocalizationValue);

    return (
        <AccordionItem value={ value }>
            <AccordionTrigger className="font-bold px-1 flex gap-1 items-center py-0.5">
                { ({ isOpen }) => <>
                    { getLocalizationValue(caption) } ({ friends.length })
                    <NitroIcon className="mb-px" icon={ isOpen ? 'icon-arrow-down-black' : 'icon-arrow-right-black' } />
                </> }
            </AccordionTrigger>
            <AccordionContent unwrapped>
                { friends.map(friend => (
                    <FriendListItem key={ friend.playerId } friend={ friend } />
                )) }
            </AccordionContent>
        </AccordionItem>
    );
}
