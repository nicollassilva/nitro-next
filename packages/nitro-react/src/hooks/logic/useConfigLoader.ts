import { NitroLogger } from '@nitrodevco/nitro-api';
import { useEffect, useState } from 'react';

import { useConfigurationStore } from '#base/stores';

export const useConfigLoader = () => {
    const [isConfigReady, setIsConfigReady] = useState(false);
    const setConfig = useConfigurationStore(x => x.setConfig);

    useEffect(() => {
        if (!window.NitroConfig) throw new Error('NitroConfig is not defined!');

        const urls: string[] = [];

        if (Array.isArray(window.NitroConfig['nitro.config.url'])) window.NitroConfig['nitro.config.url'].forEach((url: string) => urls.push(url));
        else urls.push(window.NitroConfig['nitro.config.url']);

        const load = async (urls: string[]) => {
            let data: Record<string, object> = {};

            for (const url of urls) {
                try {
                    const response = await fetch(url);
                    const responseData = await response.json() as Record<string, object>;

                    data = { ...data, ...responseData };
                }

                catch (err) {
                    NitroLogger.error(`Trouble loading the configuration using: ${url}`, err.message);
                }
            }

            const dataToProcess = { ...data, ...window.NitroConfig };
            const urlParams = new URLSearchParams(window.location.search);

            if (urlParams.size > 0) urlParams.forEach((value, key) => dataToProcess[key] = value);

            setConfig(dataToProcess);
            setIsConfigReady(true);
        }

        void load(urls);
    }, []);
    return { isConfigReady };
};
