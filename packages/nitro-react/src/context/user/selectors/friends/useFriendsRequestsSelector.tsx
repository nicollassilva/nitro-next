import { useUserContext } from "../../useUserContext";

export const useFriendsRequestsSelector = () => useUserContext(x => x.requests);