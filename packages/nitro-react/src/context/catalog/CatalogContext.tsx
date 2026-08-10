import { createContext } from 'react';
import type { StoreApi } from 'zustand';

import { CatalogContextStore } from './CatalogContextStore';

export const CatalogContext = createContext<StoreApi<CatalogContextStore> | null>(null);
