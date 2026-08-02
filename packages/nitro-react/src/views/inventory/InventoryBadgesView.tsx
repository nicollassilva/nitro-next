import { Border, Dropmenu } from "#base/theme";

export const InventoryBadgesView = () => {
    return (
        <Border tintColor="#CACACA" className="flex gap-1.5 p-1">
            <Border>
                <input type="text"></input>
            </Border>
            <Dropmenu />
        </Border>
    );
}