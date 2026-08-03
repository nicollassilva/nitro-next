import { useUserContext } from "#base/context";
import { selectFriends } from "#base/stores/user";

export const useFriendsSelector = () => useUserContext(selectFriends);