import { useIsWindowVisible } from "#base/context";
import { FriendListView } from "#base/views/friends/list/FriendListView";

export const FriendListComponent = () => {
    const isVisible = useIsWindowVisible('friendlist123');

    if (!isVisible) return null;

    return <FriendListView />;
}