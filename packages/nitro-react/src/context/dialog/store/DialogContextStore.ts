import { DialogButtonEnum, DialogCallback, DialogEventTypeEnum, DialogKindEnum, DialogTypeEnum, DialogUtilities, IAlertDialogHandle, IAlertLinkDialogHandle, IDialogData } from '@nitrodevco/nitro-api';
import { createStore } from 'zustand';

type State = {
    dialogs: IDialogData[];
}

type Actions = {
    notify: (title: string, summary: string, callback: DialogCallback | null, flags?: number) => IAlertDialogHandle;
    alert: (title: string, summary: string, flags: number, callback: DialogCallback | null) => IAlertDialogHandle;
    alertWithModal: (title: string, summary: string, flags: number, callback: DialogCallback | null) => IAlertDialogHandle;
    alertWithLink: (title: string, summary: string, linkTitle: string, linkUrl: string, flags: number, callback: DialogCallback | null) => IAlertLinkDialogHandle;
    confirm: (title: string, summary: string, flags: number, callback: DialogCallback | null) => IAlertDialogHandle;
    confirmWithModal: (title: string, summary: string, flags: number, callback: DialogCallback | null) => IAlertDialogHandle;
    closeDialog: (id: number) => void;
    dispatchDialogEvent: (id: number, button: DialogButtonEnum) => void;
}

type DialogLink = {
    linkTitle: string;
    linkUrl: string;
}

const initialState: State = {
    dialogs: []
};

export type DialogContextStore = State & Actions;

export const createDialogContextStore = () => {
    const callbacks = new Map<number, DialogCallback | null>();

    let nextId = 1;

    return createStore<DialogContextStore>()((set, get) => {
        const read = (id: number) => get().dialogs.find(dialog => dialog.id === id);

        const createHandle = ({ id, title, summary, linkTitle, linkUrl }: IDialogData): IAlertLinkDialogHandle => ({
            id,
            title,
            summary,
            linkTitle,
            linkUrl,
            get disposed() {
                return read(id) === undefined;
            },
            get callback() {
                return callbacks.get(id) ?? null;
            },
            set callback(value: DialogCallback | null) {
                callbacks.set(id, value);
            },
            dispose: () => get().closeDialog(id)
        });

        const openDialog = (kind: DialogKindEnum, modal: boolean, title: string, summary: string, flags: number, callback: DialogCallback | null, link?: DialogLink) => {
            const id = nextId++;

            const dialog: IDialogData = {
                id,
                kind,
                type: modal ? DialogTypeEnum.Modal : DialogTypeEnum.Default,
                modal,
                flags: DialogUtilities.resolveFlags(flags),
                title,
                summary,
                titleBarColor: null,
                captions: {},
                linkTitle: link?.linkTitle ?? '',
                linkUrl: link?.linkUrl ?? ''
            };

            callbacks.set(id, callback);

            set(x => ({ dialogs: [...x.dialogs, dialog] }));

            return createHandle(dialog);
        };

        return {
            ...initialState,
            notify: (title: string, summary: string, callback: DialogCallback | null, flags: number = 0) => openDialog(DialogKindEnum.Alert, false, title, summary, flags, callback),
            alert: (title: string, summary: string, flags: number, callback: DialogCallback | null) => openDialog(DialogKindEnum.Alert, false, title, summary, flags, callback),
            alertWithModal: (title: string, summary: string, flags: number, callback: DialogCallback | null) => openDialog(DialogKindEnum.Alert, true, title, summary, flags, callback),
            alertWithLink: (title: string, summary: string, linkTitle: string, linkUrl: string, flags: number, callback: DialogCallback | null) => openDialog(DialogKindEnum.AlertLink, false, title, summary, flags, callback, { linkTitle, linkUrl }),
            confirm: (title: string, summary: string, flags: number, callback: DialogCallback | null) => openDialog(DialogKindEnum.Confirm, false, title, summary, flags, callback),
            confirmWithModal: (title: string, summary: string, flags: number, callback: DialogCallback | null) => openDialog(DialogKindEnum.Confirm, true, title, summary, flags, callback),
            closeDialog: (id: number) => {
                if (!read(id)) return;

                callbacks.delete(id);

                set(x => ({ dialogs: x.dialogs.filter(dialog => dialog.id !== id) }));
            },
            dispatchDialogEvent: (id: number, button: DialogButtonEnum) => {
                const dialog = read(id);

                if (!dialog) return;

                if (dialog.kind === DialogKindEnum.AlertLink && button === DialogButtonEnum.Link) {
                    window.open(dialog.linkUrl, '_empty');
                    return;
                }

                if (button === DialogButtonEnum.Custom) return;

                const callback = callbacks.get(id) ?? null;
                const type = button === DialogButtonEnum.Ok ? DialogEventTypeEnum.Ok : DialogEventTypeEnum.Cancel;

                if (callback) {
                    callback(createHandle(dialog), { type });
                    return;
                }

                if (dialog.kind !== DialogKindEnum.Confirm) get().closeDialog(id);
            }
        };
    });
};
