import { IObjectData } from "../room";

export interface IPurchaseOptions {
    quantity: number;
    extraData: string;
    extraParamRequired: boolean;
    objectData: IObjectData | undefined;
}