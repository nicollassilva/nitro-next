import { ISimpleRoomObjectData } from "@nitrodevco/nitro-api";

type InfostandPetViewProps = {
    objectData: ISimpleRoomObjectData;
    onClose: () => void;
}

export const InfostandPetView = (props: InfostandPetViewProps) => {
    const { objectData, onClose } = props;
    const { objectId, category } = objectData;

    return (
        <div className="infostand-container"></div>
    );
}