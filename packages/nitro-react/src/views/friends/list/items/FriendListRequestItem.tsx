import { IFriendRequest } from "@nitrodevco/nitro-shared";
import { memo } from "react";

import { useFriendsContext } from "#base/context";
import { NitroIcon } from "#base/theme";

import { FriendListItem } from "../components/FriendListItem";

interface FriendListRequestItemProps {
    request: IFriendRequest;
}

export const FriendListRequestItem = memo((props: FriendListRequestItemProps) => {
    const { request } = props;

    const { tooltipHandlers } = useFriendsContext();

    return (
        <FriendListItem user={ request } hideAvatarElement={ true }>
            <NitroIcon className="cursor-pointer" icon="icon-accept-check" { ...tooltipHandlers('friendlist.tip.accept') } />
            <NitroIcon className="cursor-pointer" icon="icon-decline-x" { ...tooltipHandlers('friendlist.tip.decline') } />
        </FriendListItem>
    );
});

FriendListRequestItem.displayName = 'FriendListRequestItem';
