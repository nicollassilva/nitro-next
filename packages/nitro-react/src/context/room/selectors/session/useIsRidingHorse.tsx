import { RoomObjectCategoryEnum, RoomObjectVariableEnum } from "@nitrodevco/nitro-api";

import { useRoomSelector } from "../useRoomSelector"
import { useOwnRoomObjectId } from "./useOwnRoomObjectId";

export const useIsRidingHorse = () => {
    const room = useRoomSelector();
    const ownObjectId = useOwnRoomObjectId();

    if (!room || ownObjectId < 0) return undefined;

    const roomObject = room.getRoomObject(ownObjectId, RoomObjectCategoryEnum.Unit);

    if (!roomObject) return undefined;

    const effectId = roomObject.model.getValue<number>(RoomObjectVariableEnum.FigureEffect);

    return effectId === 77;
}