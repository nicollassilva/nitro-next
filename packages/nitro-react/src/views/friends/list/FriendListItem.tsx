import { IMessengerFriend } from "@nitrodevco/nitro-shared";
import { memo } from "react";

import { AvatarImage } from "#base/components";

interface FriendListItemProps {
    friend: IMessengerFriend;
}

export const FriendListItem = memo((props: FriendListItemProps) => {
    const { friend } = props;

    return (
        <div className="px-1 py-0.5 flex gap-1">
            <AvatarImage figure={friend.figure} gender={friend.gender} direction={2} headOnly={true} small />
        </div>
    );
});

FriendListItem.displayName = 'FriendListItem';
