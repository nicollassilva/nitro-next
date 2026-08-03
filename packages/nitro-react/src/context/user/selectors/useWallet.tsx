
import { useShallow } from "zustand/shallow";

import { selectCurrencyData } from "#base/stores";

import { useUserContext } from "../useUserContext";

export const useWallet = () => useUserContext(useShallow(selectCurrencyData));