import { SystemStore } from "./SystemStore";

export const selectVisibleWindows = (state: SystemStore) => state.visibleWindows;

export const selectLocalizations = (state: SystemStore) => state.localizations;