import { ISimpleRoomObjectData } from "@nitrodevco/nitro-api";

type InfostandBotViewProps = {
    objectData: ISimpleRoomObjectData;
    onClose: () => void;
}

export const InfostandBotView = (props: InfostandBotViewProps) => {
    const { objectData, onClose } = props;
    const { objectId, category } = objectData;

    return (
        <div className="infostand-container"></div>
    );
}