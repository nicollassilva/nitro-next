import { FurniturePickupMode, FurnitureUsagePolicyEnum, ISimpleRoomObjectData, RoomControllerLevelEnum, RoomObjectOperationType, RoomWidgetEnumItemExtradataParameter } from "@nitrodevco/nitro-api";

import { Button } from "#base/components";
import { FurnitureImage } from "#base/components/FurnitureImage";
import { useOwnIsModerator, useOwnUserId, useRoomPermissionsSelector } from "#base/context";
import { useRoomFurnitureData, useRoomObjectInteraction, useRoomObjectModify } from "#base/hooks";
import { useLocalizationStore } from "#base/stores";

type InfostandFurniViewProps = {
    objectData: ISimpleRoomObjectData;
    onClose: () => void;
}

export const InfostandFurniView = (props: InfostandFurniViewProps) => {
    const { objectData, onClose } = props;
    const { objectId, category } = objectData;
    const furniData = useRoomFurnitureData(objectId, category);
    const ownUserId = useOwnUserId();
    const isModerator = useOwnIsModerator();
    const { controllerLevel, isRoomOwner } = useRoomPermissionsSelector();
    const getLocalizationValue = useLocalizationStore(x => x.getLocalizationValue);
    const getLocalizationValueParams = useLocalizationStore(x => x.getLocalizationValueParams);
    const { modifyRoomObject } = useRoomObjectModify();
    const { changeItemState } = useRoomObjectInteraction();

    if (!furniData?.furnitureData) return null;

    let canMove = false;
    let canRotate = false;
    let canSeeFurniId = false;
    let canUse = false;
    let pickupMode = FurniturePickupMode.None;
    let godMode = false;

    const isValidController = controllerLevel >= RoomControllerLevelEnum.Guest;

    if (isValidController || furniData.ownerId === ownUserId || isRoomOwner || isModerator) {
        canMove = true;
        canRotate = !furniData.isWallItem;

        if (controllerLevel >= RoomControllerLevelEnum.Moderator) godMode = true;
    }

    if (furniData.ownerId === ownUserId || isModerator) pickupMode = FurniturePickupMode.Full;
    else if (isRoomOwner || controllerLevel >= RoomControllerLevelEnum.GuildAdmin) pickupMode = FurniturePickupMode.Eject;

    if (furniData.isStickie) pickupMode = FurniturePickupMode.None;

    if (isModerator) canSeeFurniId = true;

    if (furniData.usagePolicy === FurnitureUsagePolicyEnum.Everybody || (furniData.usagePolicy === FurnitureUsagePolicyEnum.Controller && isValidController) || (furniData.extraParam === RoomWidgetEnumItemExtradataParameter.JUKEBOX && isValidController) || (furniData.extraParam === RoomWidgetEnumItemExtradataParameter.USABLE_PRODUCT && isValidController)) canUse = true;

    const hasButtons = canMove || canRotate || pickupMode !== FurniturePickupMode.None || canUse;

    return (
        <div className="flex flex-col items-end gap-2">
            <div className="infostand-container">
                <div className="infostand-header">
                    {furniData.name}
                    <i className="infostand-close" onClick={onClose} />
                </div>
                <hr className="infostand-separator" />
                <div className="flex-1 gap-1 p-1 size-full">
                    <div className="flex items-center justify-center w-full py-1 overflow-hidden">
                        <FurnitureImage type={furniData.furnitureData.className} colorIndex={furniData.furnitureData.colorIndex} direction={4} />
                    </div>
                </div>
                <hr className="infostand-separator" />
                <div className="flex w-full gap-1 p-1">
                    <p className="text-[9px] text-white font-goldfish-bold">{getLocalizationValueParams('furni.owner', ['name'], [furniData.ownerName])}</p>
                    {canSeeFurniId && <p className="text-[9px] text-white font-goldfish-bold">ID: {furniData.id}</p>}
                </div>
            </div>
            {hasButtons && <div className="flex justify-end gap-2">
                {canMove && <Button variant="infostand" size="sm" onClick={() => modifyRoomObject(objectId, category, RoomObjectOperationType.OBJECT_MOVE)}>{getLocalizationValue('infostand.button.move')}</Button>}
                {canRotate && <Button variant="infostand" size="sm" onClick={() => modifyRoomObject(objectId, category, RoomObjectOperationType.OBJECT_ROTATE_POSITIVE)}>{getLocalizationValue('infostand.button.rotate')}</Button>}
                {pickupMode === FurniturePickupMode.Eject && <Button variant="infostand" size="sm" onClick={() => modifyRoomObject(objectId, category, RoomObjectOperationType.OBJECT_EJECT)}>{getLocalizationValue(`infostand.button.eject`)}</Button>}
                {pickupMode === FurniturePickupMode.Full && <Button variant="infostand" size="sm" onClick={() => modifyRoomObject(objectId, category, RoomObjectOperationType.OBJECT_PICKUP)}>{getLocalizationValue(`infostand.button.pickup`)}</Button>}
                {canUse && <Button variant="infostand" size="sm" onClick={() => changeItemState(objectId, category, 0, false)}>{getLocalizationValue('infostand.button.use')}</Button>}
            </div>}
        </div>
    );
}