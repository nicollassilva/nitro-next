
import { FurnitureSpecialType, FurnitureTypeEnum, RoomId, Vector3d } from "@nitrodevco/nitro-api";
import { GetAvatarRenderManager, GetRoomContentLoader } from "@nitrodevco/nitro-renderer";
import { MouseEvent, useEffect, useRef } from "react";

import { useCatalogSelectors, useOwnUserLook } from "#base/context"
import { useCatalogOfferActions, useRoomPreviewer } from "#base/hooks";
import { cn } from "#base/theme";

export const CatalogProductViewWidgetView = () => {
    const { activeOffer } = useCatalogSelectors();
    const { getOfferProduct } = useCatalogOfferActions();
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const { room, addFloorItemIntoRoom, addWallItemIntoRoom, addAvatarIntoRoom, changeObjectDirection, changeObjectState } = useRoomPreviewer(RoomId.TEMP_ROOM_CATALOG, canvasRef);
    const { ownFigure, ownGender } = useOwnUserLook();

    const onClick = (event: MouseEvent<HTMLCanvasElement>) => {
        if (!room) return;

        if (event.shiftKey) changeObjectDirection();
        else changeObjectState();
    }

    useEffect(() => {
        if (!room || !activeOffer) return;

        const product = getOfferProduct(activeOffer);

        if (!product) return;

        switch (product.productType) {
            case FurnitureTypeEnum.Floor: {
                if (!product.furnitureData) return;

                if (product.furnitureData.specialType === FurnitureSpecialType.FigurePurchasableSet) {
                    const customParts = product.furnitureData.customParams.split(',').map(value => parseInt(value));
                    const figureSets: number[] = [];

                    for (const part of customParts) {
                        if (GetAvatarRenderManager().isValidFigureSetForGender(part, ownGender)) figureSets.push(part);
                    }

                    const figureString = GetAvatarRenderManager().getFigureStringWithFigureIds(ownFigure, ownGender, figureSets);

                    addAvatarIntoRoom(figureString, product.classId);
                } else {
                    addFloorItemIntoRoom(product.classId, new Vector3d(90));
                }
                return;
            }
            case FurnitureTypeEnum.Wall: {
                if (!product.furnitureData) return;

                switch (product.furnitureData.specialType) {
                    case FurnitureSpecialType.Floor:
                        room.updateRoomPlaneType(product.extraParam, undefined, undefined);
                        return;
                    case FurnitureSpecialType.WallPaper:
                        room.updateRoomPlaneType(undefined, product.extraParam, undefined);
                        return;
                    case FurnitureSpecialType.Landscape: {
                        room.updateRoomPlaneType(undefined, undefined, product.extraParam);

                        const typeId = GetRoomContentLoader().getFurnitureWallTypeIdForName("window_double_default");

                        if (typeId > -1) addWallItemIntoRoom(typeId, new Vector3d(90), '');
                        return;
                    }
                    default:
                        room.updateRoomPlaneType('default', 'default', 'default');
                        addWallItemIntoRoom(product.classId, new Vector3d(90), product.extraParam);
                        return;
                }
                return;
            }
            case FurnitureTypeEnum.Robot:
                addAvatarIntoRoom(product.extraParam, 0);
                return;
            case FurnitureTypeEnum.Effect:
                addAvatarIntoRoom(ownFigure, product.classId);
                return;
        }
    }, [activeOffer]);

    return (
        <div className="relative flex overflow-hidden size-full">
            <canvas ref={canvasRef} className={cn(`absolute bg-black`, !activeOffer && 'hidden')} onClick={onClick} />
        </div>
    )
}