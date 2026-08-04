import { IMessengerFriend } from "@nitrodevco/nitro-shared";
import { useState } from "react";

import { useOfflineFriendsSelector, useOnlineFriendsSelector } from "#base/context/user";
import { Accordion, ScrollArea } from "#base/theme";

import { FriendListGroup } from "../components/FriendListGroup";
import { FriendListTab } from "../components/FriendListTab";
import { FriendListFriendsFooter } from "../footers/FriendListFriendsFooter";
import { FriendListFriendItem } from "../items/FriendListFriendItem";

interface FriendListFriendsProps {
    value: string;
    onTooltipChanged: (tooltip: string) => void;
}

export const FriendListFriends = (props: FriendListFriendsProps) => {
    const { value, onTooltipChanged } = props;

    const onlineFriends = useOnlineFriendsSelector();
    const offlineFriends = useOfflineFriendsSelector();

    const [showSearch, setShowSearch] = useState<boolean>(false);

    const [searchValue, setSearchValue] = useState<string>('');
    const [searchDraft, setSearchDraft] = useState<string>('');

    const search = searchValue.trim().toLowerCase();

    const onSearchToggled = (showSearch: boolean) => {
        setShowSearch(showSearch);

        if (showSearch) return;

        setSearchDraft('');
        setSearchValue('');
    }

    const groups = [
        {
            value: 'online',
            caption: 'friendlist.friends',
            friends: onlineFriends
        },
        {
            value: 'offline',
            caption: 'friendlist.friends.offlinecaption',
            friends: offlineFriends
        }
    ].map(group => ({
        ...group,
        friends: !search ? group.friends : group.friends.filter(
            (friend: IMessengerFriend) => friend.name.toLowerCase().includes(search)
        )
    }));

    return (
        <FriendListTab
            value={ value }
            caption="friendlist.friends"
            triggerClassName="from-[#8adaff] to-[#59bfff]"
        >
            <ScrollArea
                className="flex-1 min-h-0 p-1 pb-0 gap-1 text-[0.68rem]"
                contentClassName="flex flex-col [&>*:nth-child(odd)]:bg-[#eee] [&>*:nth-child(even)]:bg-white"
            >
                <Accordion unwrapped type="multiple" defaultValue={ ['online'] }>
                    { groups.map(group => (
                        <FriendListGroup key={ group.value } value={ group.value } caption={ group.caption } count={ group.friends.length }>
                            { group.friends.map((friend: IMessengerFriend) => <FriendListFriendItem key={ friend.playerId } friend={ friend } /> ) }
                        </FriendListGroup>
                    )) }
                </Accordion>
            </ScrollArea>
            <FriendListFriendsFooter
                showSearch={ showSearch }
                onSearchToggled={ onSearchToggled }
                searchDraft={ searchDraft }
                onSearchDraftChanged={ setSearchDraft }
                onSearchSubmitted={ () => setSearchValue(searchDraft) }
                onTooltipChanged={ onTooltipChanged }
            />
        </FriendListTab>
    );
}
