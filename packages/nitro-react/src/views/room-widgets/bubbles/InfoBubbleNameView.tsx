import { IRoomObjectNameData } from "@nitrodevco/nitro-api";

interface InfoBubbleNameProps {
    nameData: IRoomObjectNameData;
    className?: string;
}

export const InfoBubbleNameView = (props: InfoBubbleNameProps) => {
    const { nameData } = props;

    return (
        <div className="contextmenu-container name-only">
            {nameData.name}
        </div>
    );
}
