import { NitroLogger } from '@nitrodevco/nitro-api';
import { GetRoomContentLoader } from '@nitrodevco/nitro-renderer';
import { useEffect, useState } from 'react';

import { useSystemActions } from '#base/context';
import { useConfigurationStore, useFurnitureDataStore } from '#base/stores';

export const useFurnitureDataLoader = () => {
    const [needsUpdate, setNeedsUpdate] = useState(true);
    const floorItems = useFurnitureDataStore(x => x.floorItems);
    const wallItems = useFurnitureDataStore(x => x.wallItems);
    const furnidataUrl = useConfigurationStore(state => state.config['furnituredata.url']) as string | undefined;
    const parseFloorItems = useFurnitureDataStore(x => x.parseFloorItems);
    const parseWallItems = useFurnitureDataStore(x => x.parseWallItems);
    const { setLocalizationForFurniture } = useSystemActions();

    const isFurnitureDataReady = () => {
        return !needsUpdate;
    }

    useEffect(() => {
        const items = Object.values(floorItems);

        if (!items.length) return;

        setLocalizationForFurniture(items);
        GetRoomContentLoader().processFurnitureData(items);
    }, [floorItems]);

    useEffect(() => {
        const items = Object.values(wallItems);

        if (!items.length) return;

        setLocalizationForFurniture(items);
        GetRoomContentLoader().processFurnitureData(items);
    }, [wallItems]);

    useEffect(() => {
        if (!needsUpdate || !furnidataUrl || !furnidataUrl.length) return;

        const loadAsync = async (url: string) => {
            if (!url || !url.length) return;

            try {
                const response = await fetch(url);

                if (response.status !== 200) throw new Error('Invalid furnidata url');

                const responseData = await response.json();

                parseFloorItems(responseData.roomitemtypes.furnitype);
                parseWallItems(responseData.wallitemtypes.furnitype);
                setNeedsUpdate(false);
            } catch (e) {
                NitroLogger.error(e);
            }
        };

        void loadAsync(furnidataUrl);
    }, [needsUpdate, furnidataUrl]);

    return { isFurnitureDataReady };
};
