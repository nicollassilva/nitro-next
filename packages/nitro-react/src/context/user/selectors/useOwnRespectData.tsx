import { useShallow } from "zustand/shallow";

import { useUserContext } from "#base/context";
import { selectOwnRespectData } from "#base/stores";

export const useOwnRespectData = () => useUserContext(useShallow(selectOwnRespectData));