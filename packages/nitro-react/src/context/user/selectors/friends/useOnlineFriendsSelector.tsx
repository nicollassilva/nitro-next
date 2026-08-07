import { selectOnlineFriends } from "#base/stores";

import { useUserContext } from "../../useUserContext";

export const useOnlineFriendsSelector = () => useUserContext(selectOnlineFriends);
