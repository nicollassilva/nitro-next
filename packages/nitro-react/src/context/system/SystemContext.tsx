import { createContext } from 'react';

type SystemContextStore = {
    isWindowVisible: (name: string) => boolean;
    toggleWindow: (name: string) => void;
}

export const SystemContext = createContext<SystemContextStore | undefined>(undefined);