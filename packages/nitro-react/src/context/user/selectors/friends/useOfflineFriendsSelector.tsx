import { selectOfflineFriends } from "#base/stores";

import { useUserContext } from "../../useUserContext";

export const useOfflineFriendsSelector = () => useUserContext(selectOfflineFriends);
