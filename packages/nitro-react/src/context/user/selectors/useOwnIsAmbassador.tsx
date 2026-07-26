
import { selectOwnIsAmbassador } from "#base/stores";

import { useUserContext } from "../useUserContext";

export const useOwnIsAmbassador = () => useUserContext(selectOwnIsAmbassador);