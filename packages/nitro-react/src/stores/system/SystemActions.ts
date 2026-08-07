import { SystemStore } from "./SystemStore";

export const extractSystemActions = (store: SystemStore) => ({
    toggleWindow: store.toggleWindow,
    getLocalizationValue: store.getLocalizationValue,
    setLocalization: store.setLocalization,
    setLocalizationForFurniture: store.setLocalizationForFurniture,
});

export const extractFurnitureDataActions = (store: SystemStore) => ({
    parseFloorItems: store.parseFloorItems,
    parseWallItems: store.parseWallItems,
    parseProductData: store.parseProductData
});