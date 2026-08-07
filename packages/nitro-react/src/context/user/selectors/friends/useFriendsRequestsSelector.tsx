
import { useUserContext } from "#base/context";
import { selectRequests } from "#base/stores/user";

export const useFriendsRequestsSelector = () => useUserContext(selectRequests);