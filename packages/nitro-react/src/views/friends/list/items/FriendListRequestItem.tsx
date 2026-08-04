import { IFriendRequest } from "@nitrodevco/nitro-shared";
import { memo } from "react";

import { NitroIcon } from "#base/theme";

import { FriendListItem } from "../components/FriendListItem";

interface FriendListRequestItemProps {
    request: IFriendRequest;
}

export const FriendListRequestItem = memo((props: FriendListRequestItemProps) => {
    const { request } = props;

    return (
        <FriendListItem user={ request } hideAvatarElement={ true }>
            <NitroIcon className="cursor-pointer" icon="icon-accept-check" />
            <NitroIcon className="cursor-pointer" icon="icon-decline-x" />
        </FriendListItem>
    );
});

FriendListRequestItem.displayName = 'FriendListRequestItem';
