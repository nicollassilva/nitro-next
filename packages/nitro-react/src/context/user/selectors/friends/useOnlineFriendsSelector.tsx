import { useShallow } from "zustand/shallow";

import { selectOnlineFriends } from "#base/stores";

import { useUserContext } from "../../useUserContext";

export const useOnlineFriendsSelector = () => useUserContext(useShallow(selectOnlineFriends));
