import { useCatalogNavigation, useCatalogSelectors, useTranslation } from "#base/context";
import { Frame, TabButton, TabContent, TabContext } from "#base/theme";

export const CatalogView = () => {
    const { rootNode } = useCatalogSelectors();
    const { activateNode, hideCatalog } = useCatalogNavigation();
    const t = useTranslation();

    if (!rootNode) return null;

    return (
        <Frame id="catalog" variant="3" className="w-142.5 h-150" caption={t('catalog.title')} onClose={hideCatalog}>
            <TabContext data-name="tabs">
                {rootNode.children.map(x =>
                    x.visible ? <TabButton key={x.pageId} className="w-full" aria-selected={x.isActive} onClick={_ => activateNode(x)}>{x.localization.length ? x.localization : x.pageName}</TabButton> : null)}
            </TabContext>
            <TabContent>
            </TabContent>
        </Frame>
    );
}