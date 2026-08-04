import { IMessengerFriend } from "@nitrodevco/nitro-shared";
import { memo, useState } from "react";

import { Border, NitroIcon } from "#base/theme";

import { FriendListItem } from "../components/FriendListItem";

interface FriendListFriendItemProps {
    friend: IMessengerFriend;
    showRelationshipIcon?: boolean;
    showFollowIcon?: boolean;
    showMessageIcon?: boolean;
}

export const FriendListFriendItem = memo((props: FriendListFriendItemProps) => {
    const { friend, showRelationshipIcon = true, showFollowIcon = true, showMessageIcon = true } = props;

    const [showDropdown, setShowDropdown] = useState<boolean>(false);

    return (
        <FriendListItem user={ friend } showAvatarHead={ friend.isOnline }>
            <div className="w-4 h-1.25 shrink-0 relative flex items-center justify-end">
                { showRelationshipIcon && <>
                    <NitroIcon className="cursor-pointer w-3.5! h-4!" icon="icon-arrow-down-black" onClick={ () => setShowDropdown(true) } />
                    { showDropdown && <Border variant="100" className="w-7.5 p-0.5 absolute right-0 -top-1.25 bg-white rounded-lg [&>*:nth-child(odd)]:bg-[#eee]!" onClick={ () => setShowDropdown(false) }>
                        <div className="cursor-pointer h-3.5"></div>
                        <div className="cursor-pointer"><NitroIcon className="cursor-pointer" icon="icon-heart-relationship" /></div>
                        <div className="cursor-pointer"><NitroIcon className="cursor-pointer" icon="icon-smile-relationship" /></div>
                        <div className="cursor-pointer"><NitroIcon className="cursor-pointer" icon="icon-bobba-relationship" /></div>
                    </Border> }
                </> }
            </div>
            <div className="w-4 h-3.5 shrink-0">
                { showFollowIcon && <NitroIcon className="cursor-pointer" icon="icon-follow" /> }
            </div>
            <div className="w-4 h-3.5 shrink-0">
                { showMessageIcon && <NitroIcon className="cursor-pointer" icon="icon-message-small" /> }
            </div>
        </FriendListItem>
    );
});

FriendListFriendItem.displayName = 'FriendListFriendItem';
