
import {
    IGetImageListener,
    IObjectData,
    IRoom,
    IRoomEngine,
    ITemporaryRoom,
    IVector3D,
    RoomGeometryScaleType
} from '@nitrodevco/nitro-api';
import { type ImageLike } from 'pixi.js';

import { GetRoomContentLoader } from './GetRoomContentLoader';
import { Room } from './Room';
import { TemporaryRoom } from './TemporaryRoom';

export class RoomEngine implements IRoomEngine {
    public static TEMPORARY_ROOM_ID: number = -1;

    private _rooms: Map<number, IRoom> = new Map();

    public async init(): Promise<void> {
        await GetRoomContentLoader().init();
    }

    public createRoom(roomId: number): IRoom {
        let room = this._rooms.get(roomId);

        if (room) return room;

        if (roomId === RoomEngine.TEMPORARY_ROOM_ID) room = new TemporaryRoom(roomId);
        else room = new Room(roomId);

        this._rooms.set(roomId, room);

        return room;
    }

    public getFurnitureFloorIconUrl(typeId: number): string | undefined {
        const type = GetRoomContentLoader().getFurnitureFloorNameForTypeId(typeId);
        const color = GetRoomContentLoader().getFurnitureFloorColorIndex(typeId).toString();

        return GetRoomContentLoader().getAssetIconUrl(type, color);
    }

    public getFurnitureWallIconUrl(typeId: number, extra: string | undefined): string | undefined {
        const type = GetRoomContentLoader().getFurnitureWallNameForTypeId(typeId, extra);
        const color = GetRoomContentLoader().getFurnitureWallColorIndex(typeId).toString();

        return GetRoomContentLoader().getAssetIconUrl(type, color);
    }

    public async getGenericRoomObjectImage(
        type: string,
        value: string,
        direction: IVector3D,
        scale: RoomGeometryScaleType,
        listener: IGetImageListener | undefined = undefined,
        extras: number = NaN,
        objectData: IObjectData | undefined = undefined,
        state: number = -1,
        frameCount: number = -1,
        posture: string = '',
    ): Promise<ImageLike | undefined> {
        return await this.getTemporaryRoom().getGenericRoomObjectImage(type, value, direction, scale, listener, extras, objectData, state, frameCount, posture);
    }

    public initalizeTemporaryObjectsByType(type: string): void {
        this.getTemporaryRoom().initalizeTemporaryObjectsByType(type);
    }

    public getTemporaryRoom(): ITemporaryRoom {
        const room = this.createRoom(RoomEngine.TEMPORARY_ROOM_ID);

        // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
        return room as unknown as ITemporaryRoom;
    }
}
