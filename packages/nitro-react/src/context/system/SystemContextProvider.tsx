import type { ReactNode } from 'react';
import { useState } from 'react';

import { SystemContext } from './SystemContext';

type ProviderProps = {
    children: ReactNode;
}

export const SystemContextProvider = ({ children }: ProviderProps) => {
    const [visibleWindows, setVisibleWindows] = useState<string[]>([]);

    const isWindowVisible = (name: string) => {
        return visibleWindows.indexOf(name) >= 0;
    }

    const toggleWindow = (name: string) => {
        setVisibleWindows(x => {
            const results = [...x];

            const index = results.indexOf(name);

            if (index >= 0) results.splice(index, 1);
            else results.push(name);

            return results;
        });
    }

    return (
        <SystemContext value={{ isWindowVisible, toggleWindow }}>
            {children}
        </SystemContext>
    );
};