import { RoomId } from "@nitrodevco/nitro-api";
import { GetRoomEngine } from "@nitrodevco/nitro-renderer";
import { RoomEngineEvent } from "@nitrodevco/nitro-shared";
import { useEffect, useRef, useState } from "react";

import { useRoomActions, useRoomSelector } from "#base/context";
import { useRoomEventDispatcher, useRoomMapping } from "#base/hooks";

import { RoomEventHandler } from "../room"
import { RoomPreviewerCanvas } from "./RoomPreviewerCanvas";

export const RoomPreviewerContainer = () => {
    const [isReady, setIsReady] = useState<boolean>(false);
    const room = useRoomSelector();
    const { setRoom } = useRoomActions();
    const { createMapForSize } = useRoomMapping();
    const elementRef = useRef<HTMLDivElement>(null);

    useRoomEventDispatcher(RoomEngineEvent.INITIALIZED, event => {
        setIsReady(true);
    });

    useRoomEventDispatcher(RoomEngineEvent.DISPOSED, event => {
        setIsReady(false);
    });

    useEffect(() => {
        if (!room) return;

        const map = createMapForSize(7);

        if (map.wallGeometry) room.setLegacyGeometry(map.wallGeometry);

        if (map.mapData) room.applyRoomMap(map.mapData);
    }, [room]);

    useEffect(() => {
        const roomId = ++RoomId.TEMP_ROOM_COUNTER;
        const inst = GetRoomEngine().createRoom(RoomId.makeRoomPreviewerId(roomId));

        setRoom(inst);

        return () => {
            inst.dispose();
        }
    }, []);

    if (!isReady) return null;

    return (
        <>
            <RoomEventHandler />
            <RoomPreviewerCanvas ref={elementRef} />
        </>
    )
}