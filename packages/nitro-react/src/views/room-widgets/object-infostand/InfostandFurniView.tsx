import { FurniturePickupMode, IRoomFurnitureData } from "@nitrodevco/nitro-api";

import { Border, Button, CloseButton, FurnitureImage } from "#base/components";
import { useLocalizationStore } from "#base/stores";

type InfostandFurniViewProps = {
    furniData: IRoomFurnitureData;
    canMove: boolean;
    canRotate: boolean;
    canUse: boolean;
    pickupMode: FurniturePickupMode;
    hasButtons: boolean;
    canSeeFurniId: boolean;
    godMode: boolean;
    processAction: (action: string) => void;
    onClose: () => void;
}

export const InfostandFurniView = (props: InfostandFurniViewProps) => {
    const { furniData, canMove, canRotate, canUse, pickupMode, hasButtons, canSeeFurniId, godMode, processAction, onClose } = props;
    const getLocalizationValue = useLocalizationStore(x => x.getLocalizationValue);
    const getLocalizationValueParams = useLocalizationStore(x => x.getLocalizationValueParams);

    if (!furniData?.furnitureData) return null;

    return (
        <div className="flex flex-col items-end gap-2">
            <Border variant="1" className="infostand-container">
                <CloseButton variant="1" className="infostand-close" onClick={onClose} />
                <div className="infostand-header">
                    {furniData.name}
                </div>
                <hr className="infostand-separator" />
                <div className="flex w-full overflow-hidden items-center justify-center py-1.25">
                    <FurnitureImage type={furniData.furnitureData.className} colorIndex={furniData.furnitureData.colorIndex} direction={2} />
                </div>
                <hr className="infostand-separator" />
                <div className="flex w-full gap-1">
                    <p className="text-[9px] font-goldfish-bold">{getLocalizationValueParams('furni.owner', ['name'], [furniData.ownerName])}</p>
                    {canSeeFurniId && <p className="text-[9px] font-goldfish-bold">ID: {furniData.id}</p>}
                </div>
                <div className="flex w-full gap-1">
                    <Button>{getLocalizationValue('infostand.button.buy')}</Button>
                </div>
            </Border>
            {hasButtons && <div className="flex justify-end gap-2">
                {canMove && <Button variant="1" onClick={() => processAction('move')}>{getLocalizationValue('infostand.button.move')}</Button>}
                {canRotate && <Button variant="1" onClick={() => processAction('rotate')}>{getLocalizationValue('infostand.button.rotate')}</Button>}
                {pickupMode === FurniturePickupMode.Eject && <Button variant="1" onClick={() => processAction('eject')}>{getLocalizationValue(`infostand.button.eject`)}</Button>}
                {pickupMode === FurniturePickupMode.Full && <Button onClick={() => processAction('pickup')}>{getLocalizationValue(`infostand.button.pickup`)}</Button>}
                {canUse && <Button variant="1" onClick={() => processAction('use')}>{getLocalizationValue('infostand.button.use')}</Button>}
            </div>}
        </div>
    );
}