
import { FurnitureSpecialType, FurnitureTypeEnum, RoomId, Vector3d } from "@nitrodevco/nitro-api";
import { GetAvatarRenderManager } from "@nitrodevco/nitro-renderer";
import { useEffect, useRef } from "react";

import { useCatalogSelectors, useOwnUserLook } from "#base/context"
import { useCatalogOfferActions, useRoomPreviewer } from "#base/hooks";

export const CatalogProductViewWidgetView = () => {
    const { activeOffer } = useCatalogSelectors();
    const { getOfferProduct } = useCatalogOfferActions();
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const { room, addFurnitureIntoRoom } = useRoomPreviewer(RoomId.TEMP_ROOM_CATALOG, canvasRef);
    const { ownFigure, ownGender } = useOwnUserLook();

    useEffect(() => {
        if (!activeOffer) return;

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

                    //add avatar
                } else {
                    addFurnitureIntoRoom(product.classId, new Vector3d(90));
                }
            }
        }
    }, [activeOffer]);

    return (
        <div className="relative flex overflow-hidden size-full bg-black">
            <canvas ref={canvasRef} className="absolute" />
        </div>
    )
}