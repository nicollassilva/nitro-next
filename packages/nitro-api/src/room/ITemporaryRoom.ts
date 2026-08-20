import { ImageLike } from "pixi.js";
import { IVector3D } from "../utils";
import { RoomGeometryScaleType } from "./enum";
import { IGetImageListener } from "./IGetImageListener";
import { IObjectData } from "./object";

export interface ITemporaryRoom {
    getGenericRoomObjectImage(
        type: string,
        value: string,
        direction: IVector3D,
        scale: RoomGeometryScaleType,
        listener?: IGetImageListener | undefined,
        extras?: number,
        objectData?: IObjectData | undefined,
        state?: number,
        frameCount?: number,
        posture?: string,
    ): Promise<ImageLike | undefined>;
    initalizeTemporaryObjectsByType(type: string): void;
}