import { useShallow } from "zustand/shallow";

import { selectOfflineFriends } from "#base/stores";

import { useUserContext } from "../../useUserContext";

export const useOfflineFriendsSelector = () => useUserContext(useShallow(selectOfflineFriends));
