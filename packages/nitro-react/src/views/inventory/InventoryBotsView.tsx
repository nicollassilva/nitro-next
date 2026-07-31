import { Border } from "#base/components";
import { Dropmenu } from "#base/components/Dropmenu";

export const InventoryBotsView = () => {
    return (
        <Border variant="3" tintColor="#CACACA" className="flex gap-1.5 p-1">
            <Border variant="0">
                <input type="text"></input>
            </Border>
            <Dropmenu variant="100" />
        </Border>
    );
}