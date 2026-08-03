import { useShallow } from "zustand/shallow";

import { useUserContext } from "#base/context";
import { extractUserWalletActions } from "#base/stores";

export const useUserWalletActions = () => useUserContext(useShallow(extractUserWalletActions));