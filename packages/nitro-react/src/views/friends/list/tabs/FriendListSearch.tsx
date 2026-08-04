import { ScrollArea } from "#base/theme";

import { FriendListTab } from "../components/FriendListTab";
import { FriendListSearchFooter } from "../footers/FriendListSearchFooter";

interface FriendListSearchProps {
    value: string;
}

export const FriendListSearch = (props: FriendListSearchProps) => (
    <FriendListTab
        darkHeader
        value={ props.value }
        caption="people.search.title"
        triggerClassName="from-[#6b6b6b] to-[#555555]"
        contentClassName="bg-[#b6b6b6]"
    >
        <ScrollArea
            className="flex-1 min-h-0 p-1 pb-0 gap-1 text-[0.68rem]"
            contentClassName="flex flex-col [&>*:nth-child(odd)]:bg-[#eeeeee] [&>*:nth-child(even)]:bg-white"
        >
            area
        </ScrollArea>
        <FriendListSearchFooter />
    </FriendListTab>
);
