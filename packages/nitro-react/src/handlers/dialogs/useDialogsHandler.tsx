import { DialogFlagEnum, DialogUtilities } from "@nitrodevco/nitro-api";
import { GenericErrorMessage, HabboBroadcastMessage, ModeratorMessage, NotificationDialogMessage } from "@nitrodevco/nitro-packets";

import { useTranslation } from "#base/context";
import { useDialogActions } from "#base/context/dialog";
import { useMessageListener } from "#base/hooks";

export const useDialogsHandler = () => {
    const { alert, alertWithLink, alertWithModal } = useDialogActions();

    const t = useTranslation();

    useMessageListener(HabboBroadcastMessage, data => {
        alert('generic.alert.title', data.message, DialogUtilities.DEFAULT_FLAGS | DialogFlagEnum.TextHtml, null);
    });

    useMessageListener(NotificationDialogMessage, data => {
        const titleKey = `notification.${ data.type }.title`;
        const messageKey = `notification.${ data.type }.message`;

        alert(t(titleKey, titleKey, data.parameters), t(messageKey, messageKey, data.parameters), DialogUtilities.DEFAULT_FLAGS | DialogFlagEnum.TextHtml, null);
    });

    useMessageListener(ModeratorMessage, data => {
        const flags = DialogUtilities.DEFAULT_FLAGS | DialogFlagEnum.TextHtml;

        if (data.url?.length) {
            alertWithLink('mod.alert.title', data.message, 'mod.alert.link', data.url, flags, null);

            return;
        }

        alertWithModal('mod.alert.title', data.message, flags, null);
    });

    useMessageListener(GenericErrorMessage, data => {
        alert('generic.alert.title', `generic.error.${ data.errorCode }`, 0, null);
    });
}
