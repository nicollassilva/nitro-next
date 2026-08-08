import { useCatalogSelectors } from "#base/context"

import { CatalogItemGridWidgetView } from "../widgets/CatalogItemGridWidgetView";

export const CatalogLayoutDefaultView = () => {
    const { activePage } = useCatalogSelectors();

    return (
        <div className="flex flex-col h-full">
            <div className="flex h-full">
                test
            </div>
            <div className="min-h-47.5 max-h-47.5">
                <CatalogItemGridWidgetView />
            </div>
        </div>
    );
}