import { SystemStore } from "./SystemStore";

export type SystemActions = {
    toggleWindow: SystemStore['toggleWindow'];
    getLocalizationValue: SystemStore['getLocalizationValue'];
    setLocalization: SystemStore['setLocalization'];
    setLocalizationForFurniture: SystemStore['setLocalizationForFurniture'];
}

export const extractSystemActions = (store: SystemStore) => ({
    toggleWindow: store.toggleWindow,
    getLocalizationValue: store.getLocalizationValue,
    setLocalization: store.setLocalization,
    setLocalizationForFurniture: store.setLocalizationForFurniture
});