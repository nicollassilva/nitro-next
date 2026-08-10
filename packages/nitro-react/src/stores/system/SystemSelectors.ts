import { SystemStore } from "./SystemStore";

export const selectVisibleWindows = (state: SystemStore) => state.visibleWindows;

export const selectLocalizations = (state: SystemStore) => state.localizations;

export const selectFloorItems = (state: SystemStore) => state.floorItems;

export const selectWallItems = (state: SystemStore) => state.wallItems;

export const selectFurnitureData = (state: SystemStore) => ({
    floorItems: state.floorItems,
    wallItems: state.wallItems,
    productData: state.productData
});