import { IFriendRequest } from "@nitrodevco/nitro-shared";

import { useFriendsRequestsSelector } from "#base/context/user";
import { Accordion, ScrollArea } from "#base/theme";

import { FriendListTab } from "../components/FriendListTab";
import { FriendListRequestsFooter } from "../footers/FriendListRequestsFooter";
import { FriendListRequestItem } from "../items/FriendListRequestItem";

interface FriendListRequestsProps {
    value: string;
}

const MOCK_REQUESTS: IFriendRequest[] = [
    { playerId: -1, name: 'Nicollas', figure: 'hd-180-1.ch-255-66.lg-280-110.sh-305-62.hr-828-61' },
    { playerId: -2, name: 'Lails', figure: 'hd-600-1.ch-635-70.lg-716-66.sh-735-68.hr-3163-61' },
    { playerId: -3, name: 'UmNomeMuitoLongoParaTestarOOverflow', figure: 'hd-190-7.ch-210-66.lg-270-82.sh-290-91.hr-125-45' }
];

export const FriendListRequests = (props: FriendListRequestsProps) => {
    const requests = useFriendsRequestsSelector()

    const visibleRequests: IFriendRequest[] = Object.values(requests);

    return (
        <FriendListTab
            darkHeader
            value={ props.value }
            caption="friendlist.tab.friendrequests"
            triggerClassName="from-[#ff9302] to-[#ea8000]"
        >
            <ScrollArea
                className="flex-1 min-h-0 p-1 pb-0 gap-1 text-[0.68rem]"
                contentClassName="flex flex-col [&>*:nth-child(odd)]:bg-[#eeeeee] [&>*:nth-child(even)]:bg-white"
            >
                <Accordion unwrapped type="single">
                    { (visibleRequests.length ? visibleRequests : MOCK_REQUESTS).map(request => <FriendListRequestItem key={ request.playerId } request={ request } /> ) }
                </Accordion>
            </ScrollArea>
            <FriendListRequestsFooter />
        </FriendListTab>
    );
}
