import { FriendListUpdateComposer, MessengerInitComposer } from "@nitrodevco/nitro-shared";
import { useEffect, useState } from "react";

import { createFriendsContextStore, FriendsContext, useIsWindowVisible, useWebSocketContext } from "#base/context";
import { FriendListRemoveConfirmationView } from "#base/views/friendlist/dialogs/FriendListRemoveConfirmationView";
import { FriendListRoomInviteView } from "#base/views/friendlist/dialogs/FriendListRoomInviteView";
import { FriendListView } from "#base/views/friendlist/FriendListView";

import { MessengerComponent } from "./MessengerComponent";

export const FriendListComponent = () => {
    const isVisible = useIsWindowVisible('friendlist');
    const [friendCtx] = useState(() => createFriendsContextStore());
    const { send } = useWebSocketContext();

    useEffect(() => {
        send(new MessengerInitComposer({}));

        const interval = setInterval(() => send(new FriendListUpdateComposer({})), 120000);

        return () => {
            clearInterval(interval);
        }
    }, []);

    return (
        <FriendsContext value={friendCtx}>
            {isVisible && (
                <>
                    <FriendListView />
                    <FriendListRoomInviteView />
                    <FriendListRemoveConfirmationView />
                </>
            )}
            <MessengerComponent />
        </FriendsContext>
    );
}
