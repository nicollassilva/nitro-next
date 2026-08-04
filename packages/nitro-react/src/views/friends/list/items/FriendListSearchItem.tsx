import { IMessengerSearchResult } from "@nitrodevco/nitro-shared";
import { memo } from "react";

import { NitroIcon } from "#base/theme";

import { FriendListItem } from "../components/FriendListItem";

interface FriendListSearchItemProps {
    result: IMessengerSearchResult;
}

export const FriendListSearchItem = memo((props: FriendListSearchItemProps) => {
    const { result } = props;

    return (
        <FriendListItem user={ result }>
            <NitroIcon className="cursor-pointer" icon="icon-add" />
        </FriendListItem>
    );
});

FriendListSearchItem.displayName = 'FriendListSearchItem';
