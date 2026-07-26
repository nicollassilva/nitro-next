import { IRoomObjectNameData } from "@nitrodevco/nitro-api";

interface InfoBubbleNameProps {
    nameData: IRoomObjectNameData;
}

export const InfoBubbleNameView = (props: InfoBubbleNameProps) => {
    const { nameData } = props;

    if (!nameData) return null;

    return (
        <div className="contextmenu-container name-only">
            {nameData.name}
        </div>
    );
}
