import { useRoomContext } from "#base/context";
import { selectOwnControllerLevel } from "#base/stores";

export const useOwnControllerLevel = () => useRoomContext(selectOwnControllerLevel);