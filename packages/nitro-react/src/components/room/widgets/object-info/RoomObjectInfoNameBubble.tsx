import { IRoomObjectNameData } from "@nitrodevco/nitro-api";

import { InfoBubbleNameView } from "#base/views/room-widgets/bubbles/InfoBubbleNameView";

import { RoomObjectInfoBubble } from "./RoomObjectInfoBubble";

type RoomObjectInfoNameBubbleProps = {
    nameData: IRoomObjectNameData;
    onClose?: () => void;
}

export const RoomObjectInfoNameBubble = (props: RoomObjectInfoNameBubbleProps) => {
    const { nameData, onClose } = props;

    return (
        <RoomObjectInfoBubble objectData={nameData} fades={true} onClose={onClose}>
            <InfoBubbleNameView nameData={nameData} />
        </RoomObjectInfoBubble>);
}