import { useCatalogSelectors } from "#base/context";

import { CatalogLayoutDefaultView } from "./layouts/CatalogLayoutDefaultView";

export const CatalogActivePage = () => {
    const { activePage } = useCatalogSelectors();

    if (!activePage) return null;

    switch (activePage.layoutCode) {
        case 'default_3x3': {
            return <CatalogLayoutDefaultView />;
        }
    }
}