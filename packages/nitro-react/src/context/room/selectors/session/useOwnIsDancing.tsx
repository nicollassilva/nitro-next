import { useRoomContext } from "#base/context";
import { selectIsOwnDancing } from "#base/stores";

export const useOwnIsDancing = () => useRoomContext(selectIsOwnDancing);