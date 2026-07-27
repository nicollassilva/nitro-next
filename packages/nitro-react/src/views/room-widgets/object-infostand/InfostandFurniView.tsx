import { FurniturePickupMode, IRoomFurnitureData } from "@nitrodevco/nitro-api";

import { Border, Button } from "#base/components";
import { CloseButton } from "#base/components/Closebutton";
import { FurnitureImage } from "#base/components/FurnitureImage";
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
                <div className="infostand-header">
                    {furniData.name}
                    <CloseButton variant="1" onClick={onClose} />
                </div>
                <hr className="infostand-separator" />
                <div className="flex-1 gap-1 p-1 size-full">
                    <div className="flex items-center justify-center w-full py-1 overflow-hidden">
                        <FurnitureImage type={furniData.furnitureData.className} colorIndex={furniData.furnitureData.colorIndex} direction={4} />
                    </div>
                </div>
                <hr className="infostand-separator" />
                <div className="flex w-full gap-1 p-1">
                    <p className="text-[9px] font-goldfish-bold">{getLocalizationValueParams('furni.owner', ['name'], [furniData.ownerName])}</p>
                    {canSeeFurniId && <p className="text-[9px] font-goldfish-bold">ID: {furniData.id}</p>}
                </div>
                <div className="flex w-full gap-1 p-1">
                    <Button>{getLocalizationValue('infostand.button.buy')}</Button>
                </div>
            </Border>
            {hasButtons && <div className="flex justify-end gap-2">
                {canMove && <Button variant="1" onClick={() => processAction('move')}>{getLocalizationValue('infostand.button.move')}</Button>}
                {canRotate && <Button variant="1" onClick={() => processAction('rotate')}>{getLocalizationValue('infostand.button.rotate')}</Button>}
                {pickupMode === FurniturePickupMode.Eject && <Button onClick={() => processAction('eject')}>{getLocalizationValue(`infostand.button.eject`)}</Button>}
                {pickupMode === FurniturePickupMode.Full && <Button onClick={() => processAction('pickup')}>{getLocalizationValue(`infostand.button.pickup`)}</Button>}
                {canUse && <Button onClick={() => processAction('use')}>{getLocalizationValue('infostand.button.use')}</Button>}
            </div>}
            <div className="flex justify-end gap-2">
                <Button variant="0">variant 0</Button>
                <Button variant="1">variant 1</Button>
                <Button variant="2">variant 2</Button>
                <Button variant="3">variant 3</Button>
                <Button variant="4">variant 4</Button>
                <Button variant="5">variant 5</Button>
                <Button variant="6">variant 6</Button>
                <Button variant="100">variant 100</Button>
                <Button variant="101">variant 101</Button>
            </div>
        </div>
    );
}