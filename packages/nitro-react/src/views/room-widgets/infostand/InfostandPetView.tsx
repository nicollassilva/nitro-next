import type { IRoomPetData } from "@nitrodevco/nitro-api";

type InfostandPetViewProps = {
    data: IRoomPetData | undefined;
    onClose: () => void;
}

export const InfostandPetView = (props: InfostandPetViewProps) => {
    const { data } = props;

    return (
        <div className="infostand-container"></div>
    );
}