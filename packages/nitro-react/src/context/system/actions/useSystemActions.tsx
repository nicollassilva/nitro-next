import { useShallow } from "zustand/shallow";

import { useSystemContext } from "#base/context";
import { extractSystemActions } from "#base/stores";

export const useSystemActions = () => useSystemContext(useShallow(extractSystemActions));