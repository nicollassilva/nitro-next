import { createContext } from 'react';
import { StoreApi } from 'zustand';

import { SystemStore } from '#base/stores';

export const SystemContext = createContext<StoreApi<SystemStore> | null>(null);