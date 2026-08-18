import { useShallow } from "zustand/shallow";

import { useNotificationContext } from "../useNotificationContext";

export const useExtensions = () => useNotificationContext(useShallow(x => x.extensions));
