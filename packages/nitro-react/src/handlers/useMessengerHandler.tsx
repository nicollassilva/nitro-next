import { AcceptFriendResultMessage, ConsoleMessageHistoryMessage, FindFriendsProcessResultMessage, FollowFriendFailedMessage, FriendListFragmentMessage, FriendListUpdateMessage, FriendNotificationMessage, FriendRequestsMessage, HabboSearchResultMessage, InstantMessageErrorMessage, MessengerErrorMessage, MessengerInitMessage, MiniMailNewMessage, MiniMailUnreadCountMessage, NewConsoleMessageMessage, NewFriendRequestMessage, RoomInviteErrorMessage, RoomInviteMessage } from "@nitrodevco/nitro-shared";

import { useWebSocketContext } from "#base/context";
import { useUserMessengerActions } from "#base/context/user";
import { useMessageListener } from "#base/hooks";

export const useMessengerHandler = () => {
    const { setLimits, setFriendCategories, processFriends, processFriendUpdates } = useUserMessengerActions();
    const { send } = useWebSocketContext();

    useMessageListener(AcceptFriendResultMessage, data => {
    });

    useMessageListener(ConsoleMessageHistoryMessage, data => {
    });

    useMessageListener(FindFriendsProcessResultMessage, data => {
    });

    useMessageListener(FollowFriendFailedMessage, data => {
    });

    useMessageListener(FriendListFragmentMessage, data => {
        if (!data.fragment.length) return;

        processFriends(data.fragment);
    });

    useMessageListener(FriendListUpdateMessage, data => {
        if (data.friendCategories) setFriendCategories(data.friendCategories);

        if (data.updates && data.updates.length > 0) processFriendUpdates(data.updates);
    });

    useMessageListener(FriendNotificationMessage, data => {
    });

    useMessageListener(FriendRequestsMessage, data => {
    });

    useMessageListener(HabboSearchResultMessage, data => {
    });

    useMessageListener(InstantMessageErrorMessage, data => {
    });

    useMessageListener(MessengerErrorMessage, data => {
    });

    useMessageListener(MessengerInitMessage, data => {
        setLimits(data.userFriendLimit, data.normalFriendLimit, data.extendedFriendLimit);

        if (data.friendCategories) setFriendCategories(data.friendCategories);
    });

    useMessageListener(MiniMailNewMessage, data => {
    });

    useMessageListener(MiniMailUnreadCountMessage, data => {
    });

    useMessageListener(NewConsoleMessageMessage, data => {
    });

    useMessageListener(NewFriendRequestMessage, data => {
    });

    useMessageListener(RoomInviteErrorMessage, data => {
    });

    useMessageListener(RoomInviteMessage, data => {
    });
}