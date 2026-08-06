import { IRoomObjectNameData } from "@nitrodevco/nitro-api";

import { Bubble } from "#base/theme";

interface InfoBubbleNameProps {
    nameData: IRoomObjectNameData;
}

export const InfoBubbleNameView = (props: InfoBubbleNameProps) => {
    const { nameData } = props;

    if (!nameData) return null;

    return (
        <Bubble className="flex items-center justify-center w-17.5 py-1.5" variant="0" tintColor="#3d3d3d">
            <span className="text-style-u-regular font-[11px] text-white">{nameData.name}</span>
        </Bubble>
    );
}
