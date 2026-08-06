import { useSystemContext } from "#base/context"
import { InventoryView } from "#base/views/inventory/InventoryView"

export const InventoryComponent = () => {
    const { isWindowVisible } = useSystemContext();

    if (!isWindowVisible('inventory')) return null;

    return <InventoryView />;
}