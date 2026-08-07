import { useShallow } from "zustand/shallow";

import { useSystemContext } from "#base/context";
import { selectFurnitureData } from "#base/stores";

export const useFurnitureData = () => useSystemContext(useShallow(selectFurnitureData));