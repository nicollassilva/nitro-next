import { FriendListUpdateComposer, MessengerInitComposer } from "@nitrodevco/nitro-shared";
import { useEffect } from "react";

import { useWebSocketContext } from "#base/context";
import { useFriendsSelector } from "#base/context/user"

export const MessengerComponent = () => {
    const friends = useFriendsSelector();
    const { send } = useWebSocketContext();

    useEffect(() => {
        send(new MessengerInitComposer({}));

        const interval = setInterval(() => send(new FriendListUpdateComposer({})), 120000);

        return () => {
            clearInterval(interval);
        }
    }, []);

    return null;
}