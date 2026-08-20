import { NitroEvent } from '@nitrodevco/nitro-api';
import { useEffect, useEffectEvent } from 'react';

import { useRoomSelector } from '#base/context';

export const useRoomEventDispatcher = <T extends NitroEvent>(
    type: string | string[],
    handler: (event: T) => void,
    enabled: boolean = true,
) => {
    const room = useRoomSelector();
    const onEvent = useEffectEvent((event: T) => handler(event));

    useEffect(() => {
        if (!room || !enabled) return;

        if (Array.isArray(type)) {
            type.map(name => room.eventDispatcher.addEventListener(name, onEvent));
        } else {
            room.eventDispatcher.addEventListener(type, onEvent);
        }

        return () => {
            if (Array.isArray(type)) {
                type.map(name => room.eventDispatcher.removeEventListener(name, onEvent));
            } else {
                room.eventDispatcher.removeEventListener(type, onEvent);
            }
        };
    }, [room, type, enabled]);
};
