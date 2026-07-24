import { RoomObjectVariableEnum } from "@nitrodevco/nitro-api";

import { useOwnRoomObject } from "./useOwnRoomObject";

export const useOwnRidingHorse = () => {
    const roomObject = useOwnRoomObject();

    if (!roomObject) return false;

    return roomObject.model.getValue<number>(RoomObjectVariableEnum.FigureEffect) === 77;
}