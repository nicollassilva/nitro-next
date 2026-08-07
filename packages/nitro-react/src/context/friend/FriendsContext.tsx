import { createContext } from 'react';
import type { StoreApi } from 'zustand';

import { FriendsContextStore } from './FriendsContextStore';

export const FriendsContext = createContext<StoreApi<FriendsContextStore> | null>(null);
