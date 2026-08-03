import { useShallow } from "zustand/shallow";

import { useUserContext } from "#base/context";
import { extractUserMessengerActions } from "#base/stores/user";

export const useUserMessengerActions = () => useUserContext(useShallow(extractUserMessengerActions));