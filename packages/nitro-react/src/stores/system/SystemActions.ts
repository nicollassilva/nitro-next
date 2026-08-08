import { SystemStore } from "./SystemStore";

export const extractSystemActions = (store: SystemStore) => ({
    toggleWindow: store.toggleWindow,
    hideWindow: store.hideWindow,
    getLocalizationValue: store.getLocalizationValue,
    setLocalization: store.setLocalization,
    setLocalizationForFurniture: store.setLocalizationForFurniture,
});

export const extractFurnitureDataActions = (store: SystemStore) => ({
    getFurnitureData: store.getFurnitureData,
    getProductData: store.getProductData,
    parseFloorItems: store.parseFloorItems,
    parseWallItems: store.parseWallItems,
    parseProductData: store.parseProductData
});