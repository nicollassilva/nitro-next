import { useCatalogSelectors, useTranslation } from "#base/context";
import { useCatalogNavigation, useCatalogVisibility } from "#base/hooks";
import { Frame, TabButton, TabContent, TabContext } from "#base/theme";

import { CatalogHeaderView } from "./CatalogHeaderView";
import { CatalogNavigationView } from "./navigation/CatalogNavigationView";
import { CatalogSearchView } from "./navigation/CatalogSearchView";
import { CatalogActivePage } from "./page/CatalogActivePage";

export type CatalogViewWindowParams = { pageId?: number; pageName?: string; offerId?: number };

export const CatalogView = () => {
    const { rootNode, activeNodes } = useCatalogSelectors();
    const { activateNode } = useCatalogNavigation();
    const { hideCatalog } = useCatalogVisibility();
    const t = useTranslation();

    if (!rootNode) return null;

    return (
        <Frame id="catalog" resizeDirection="y" variant="3" className="w-142.5 h-150" caption={t('catalog.title')} onClose={hideCatalog}>
            <TabContext data-name="tabs">
                {rootNode.children.map(x =>
                    x.visible ? <TabButton key={x.pageId} className="w-full" aria-selected={x.isActive} onClick={_ => activateNode(x)}>{x.localization.length ? x.localization : x.pageName}</TabButton> : null)}
            </TabContext>
            <CatalogHeaderView />
            <TabContent className="flex gap-2">
                <div className="flex flex-col flex-4 size-full gap-0.5">
                    <CatalogSearchView />
                    <CatalogNavigationView node={activeNodes[0]?.children[0]} />
                </div>
                <div className="flex flex-col flex-8 size-full gap-1">
                    <CatalogActivePage />
                </div>
            </TabContent>
            {/* <div className="flex h-full p-2 gap-2 overflow-hidden">
                <div className="flex flex-col flex-4 size-full gap-0.5">
                    <CatalogSearchView />
                    <CatalogNavigationView node={activeNodes[0]?.children[0]} />
                </div>
                <div className="flex flex-col flex-8 size-full gap-1">
                    <CatalogActivePage />
                </div>
            </div> */}
        </Frame>
    );
}