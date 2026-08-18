import { useShallow } from "zustand/shallow";

import { useNotificationContext } from "../useNotificationContext";

export const useExtensionActions = () => useNotificationContext(useShallow(x => ({
    attachExtension: x.attachExtension,
    detachExtension: x.detachExtension,
    revealExtensionLink: x.revealExtensionLink,
})));
