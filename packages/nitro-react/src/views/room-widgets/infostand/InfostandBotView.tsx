import type { IRoomUserData } from "@nitrodevco/nitro-api";

type InfostandBotViewProps = {
    data: IRoomUserData | undefined;
    onClose: () => void;
}

export const InfostandBotView = (props: InfostandBotViewProps) => {
    const { data } = props;

    return (
        <div className="infostand-container"></div>
    );
}