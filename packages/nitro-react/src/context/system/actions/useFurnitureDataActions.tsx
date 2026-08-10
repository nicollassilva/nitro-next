import { useShallow } from "zustand/shallow";

import { useSystemContext } from "#base/context";
import { extractFurnitureDataActions } from "#base/stores";

export const useFurnitureDataActions = () => useSystemContext(useShallow(extractFurnitureDataActions));