import { Border, ScrollbarSliderBarVertical, ScrollbarSliderButtonDown, ScrollbarSliderButtonUp, ScrollbarSliderTrackVertical } from "#base/components";
import { Dropmenu } from "#base/components/Dropmenu";

export const InventoryFurniView = () => {
    return (
        <div className="flex flex-col gap-1 h-full">
            <Border variant="3" tintColor="#CACACA" className="flex gap-1.5 p-1">
                <Border variant="0">
                    <input type="text"></input>
                </Border>
                <Dropmenu variant="100" />
            </Border>
            <div className="flex h-full gap-1">
                <div className="flex flex-8 gap-1">
                    <span className="flex-1">test</span>
                    <div className={`relative w-4.25`}>
                        <ScrollbarSliderButtonUp data-name="decrement" className="absolute left-0 top-0 w-4.25 h-4" />
                        <ScrollbarSliderTrackVertical data-name="slider_track" className="absolute left-0 top-4 bottom-4 w-4.25">
                            <ScrollbarSliderBarVertical data-name="slider_bar" className="absolute left-0 top-0 w-4.25 h-2" />
                        </ScrollbarSliderTrackVertical>
                        <ScrollbarSliderButtonDown data-name="increment" className="absolute left-0 bottom-0 w-4.25 h-4" />
                    </div>
                </div>
                <div className="flex-4">
                    test
                </div>
            </div>
        </div>
    );
}