import { DialogEventTypeEnum } from "./DialogEventTypeEnum";

export interface IDialogEvent {
    readonly type: DialogEventTypeEnum;
}

export interface IAlertDialogHandle {
    readonly id: number;
    readonly disposed: boolean;
    readonly title: string;
    readonly summary: string;
    callback: DialogCallback | null;
    dispose(): void;
}

export interface IAlertLinkDialogHandle extends IAlertDialogHandle {
    readonly linkTitle: string;
    readonly linkUrl: string;
}

export type DialogCallback = (dialog: IAlertDialogHandle, event: IDialogEvent) => void;
