import { DialogButtonEnum, DialogUtilities, IDialogData } from "@nitrodevco/nitro-api";

import { useTranslation } from "#base/context";
import { useDialogEventDispatch } from "#base/context/dialog";
import { Button } from "#base/theme";

import { AlertDialogView } from "./AlertDialogView";

type AlertLinkDialogViewProps = {
    dialog: IDialogData;
}

export const AlertLinkDialogView = ({ dialog }: AlertLinkDialogViewProps) => {
    const dispatchDialogEvent = useDialogEventDispatch();

    const t = useTranslation();

    const linkKey = DialogUtilities.unwrapLocalizationKey(dialog.linkTitle);

    return (
        <AlertDialogView dialog={ dialog }>
            <Button className="h-5.5" onClick={ () => dispatchDialogEvent(dialog.id, DialogButtonEnum.Link) }>
                { t(linkKey, linkKey) }
            </Button>
        </AlertDialogView>
    );
}
