import { useRoomContext } from "#base/context";
import { selectOwnRoomIndex } from "#base/stores";

export const useOwnRoomObjectId = () => useRoomContext(selectOwnRoomIndex);