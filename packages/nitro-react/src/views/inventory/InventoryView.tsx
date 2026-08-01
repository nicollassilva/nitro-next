import { useState } from "react";

import { Frame, TabContext } from "#base/components"
import { TabButton } from "#base/components/TabButton";
import { TabContent } from "#base/components/TabContent";
import { useLocalizationStore } from "#base/stores";

import { InventoryBadgesView } from "./InventoryBadgesView";
import { InventoryBotsView } from "./InventoryBotsView";
import { InventoryFurniView } from "./InventoryFurniView";
import { InventoryPetsView } from "./InventoryPetsView";

export const InventoryView = () => {
    const [activeTab, setActiveTab] = useState<string>('furni');
    const getLocalizationValue = useLocalizationStore(x => x.getLocalizationValue);

    return (
        <Frame id="inventory" variant="3" className="absolute left-5 top-5 w-112.5 h-62.5" caption={getLocalizationValue('inventory.title')}>
            <TabContext variant="3" data-name="tabs">
                <TabButton variant="3" onClick={() => setActiveTab('furni')} aria-selected={activeTab === 'furni'}>
                    {getLocalizationValue('inventory.furni')}
                </TabButton>
                <TabButton variant="3" onClick={() => setActiveTab('pets')} aria-selected={activeTab === 'pets'}>
                    {getLocalizationValue('inventory.furni.tab.pets')}
                </TabButton>
                <TabButton variant="3" onClick={() => setActiveTab('bots')} aria-selected={activeTab === 'bots'}>
                    {getLocalizationValue('inventory.bots')}
                </TabButton>
                <TabButton variant="3" onClick={() => setActiveTab('badges')} aria-selected={activeTab === 'badges'}>
                    {getLocalizationValue('inventory.badges')}
                </TabButton>
            </TabContext>
            <TabContent variant="3">
                {activeTab === 'furni' && <InventoryFurniView />}
                {activeTab === 'pets' && <InventoryPetsView />}
                {activeTab === 'bots' && <InventoryBotsView />}
                {activeTab === 'badges' && <InventoryBadgesView />}
            </TabContent>
        </Frame>
    )
}