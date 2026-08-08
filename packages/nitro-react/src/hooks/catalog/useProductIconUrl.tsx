import { FurnitureTypeEnum, IProduct } from "@nitrodevco/nitro-api";
import { GetRoomEngine } from "@nitrodevco/nitro-renderer";

import { useConfigurationStore } from "#base/stores";

export const useProductIconUrl = (product: IProduct | undefined | null) => {
    const catalogAssetUrl = useConfigurationStore(x => x.config['catalog.asset.url'] as string) ?? undefined;

    if (!product) return '';

    switch (product.productType) {
        case FurnitureTypeEnum.Floor:
            return GetRoomEngine().getFurnitureFloorIconUrl(product.classId);
        case FurnitureTypeEnum.Wall: {
            let iconName = '';

            switch (product.furnitureData.className) {
                case 'floor':
                    iconName = ['th', product.furnitureData.className, product.extraParam].join('_');
                    break;
                case 'wallpaper':
                    iconName = ['th', 'wall', product.extraParam].join('_');
                    break;
                case 'landscape':
                    iconName = ['th', product.furnitureData.className, (product.extraParam || '').replace('.', '_'), '001'].join('_');
                    break;
            }

            if (iconName.length) return `${catalogAssetUrl}/${iconName}.png`;

            return GetRoomEngine().getFurnitureWallIconUrl(product.classId, product.extraParam);
        }
        case FurnitureTypeEnum.Effect:
            return '';
        case FurnitureTypeEnum.HabboClub:
            return '';
        case FurnitureTypeEnum.Badge:
            return '';
        case FurnitureTypeEnum.Robot:
            return '';
    }

    return '';
}