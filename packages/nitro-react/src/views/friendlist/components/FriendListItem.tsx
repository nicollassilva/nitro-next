import { AvatarGenderType } from "@nitrodevco/nitro-api";
import { MouseEventHandler, ReactNode } from "react";

import { AvatarImage } from "#base/components";
import { useFriendsActions } from "#base/context";
import { cn, NitroIcon } from "#base/theme";

interface FriendListItemUser {
    readonly name: string;
    readonly figure: string;
    readonly gender?: AvatarGenderType;
}

interface FriendListItemProps {
    user: FriendListItemUser;
    selected?: boolean;
    hideAvatarElement?: boolean;
    showAvatarHead?: boolean;
    children?: ReactNode;
    onClicked?: MouseEventHandler<HTMLDivElement>;
}

export const FriendListItem = (props: FriendListItemProps) => {
    const { user, selected = false, hideAvatarElement = false, showAvatarHead = true, onClicked, children } = props;

    const { tooltipHandlers } = useFriendsActions();

    return (
        <div className={cn('flex gap-1.5 items-center h-5', selected && 'bg-[#b8e2fc]!')} onClick={onClicked}>
            <div className="flex gap-0.5 items-center justify-center shrink-0">
                {!hideAvatarElement && <div className="w-5 h-5 overflow-hidden">
                    {showAvatarHead && <AvatarImage figure={user.figure} gender={user.gender ?? AvatarGenderType.Unisex} direction={2} />}
                </div>}
                <NitroIcon className="hover:brightness-150 cursor-pointer" icon="icon-profile-small" {...tooltipHandlers('infostand.profile.link.tooltip')} />
            </div>
            <span className="pt-0.5 flex-1 min-w-0 overflow-hidden whitespace-nowrap">
                {user.name}
            </span>
            <div className="flex gap-0.5 items-center justify-around shrink-0 min-w-11.25 max-w-13">
                {children}
            </div>
        </div>
    );
}
