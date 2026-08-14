import { useContext } from 'react';
import { useStore } from 'zustand';

import { CatalogContext } from './CatalogContext';
import { CatalogContextStore } from './CatalogContextStore';

export const useCatalogContext = <T,>(selector: (state: CatalogContextStore) => T) => {
    const store = useContext(CatalogContext);

    if (!store) throw new Error('useCatalogContext must be used within CatalogContextProvider');

    return useStore(store, selector);
}
