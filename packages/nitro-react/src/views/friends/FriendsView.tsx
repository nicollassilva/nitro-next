import { FriendsContextProvider } from "#base/context";

import { FriendListRoomInviteView } from "./list/dialogs/FriendListRoomInviteView";
import { FriendListView } from "./list/FriendListView";

export const FriendsView = () => {
    return (
        <>
            <FriendsContextProvider>
                <FriendListView />
                <FriendListRoomInviteView />
            </FriendsContextProvider>
        </>
    );
}