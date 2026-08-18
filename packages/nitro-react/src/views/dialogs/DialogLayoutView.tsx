import { DialogKindEnum } from "@nitrodevco/nitro-api";

import { useDialog } from "#base/context/dialog";

import { AlertDialogView } from "./AlertDialogView";
import { AlertLinkDialogView } from "./AlertLinkDialogView";
import { ConfirmDialogView } from "./ConfirmDialogView";

type DialogLayoutViewProps = {
    id: number;
}

export const DialogLayoutView = ({ id }: DialogLayoutViewProps) => {
    const dialog = useDialog(id);

    if (!dialog) return null;

    switch (dialog.kind) {
        case DialogKindEnum.Confirm:
            return <ConfirmDialogView dialog={ dialog } />;
        case DialogKindEnum.AlertLink:
            return <AlertLinkDialogView dialog={ dialog } />;
        default:
            return <AlertDialogView dialog={ dialog } />;
    }
}
