import type { IncomingPacketConstructor } from '@nitrodevco/nitro-api';
import { useEffect, useEffectEvent } from 'react';

import { useWebSocketContext } from '#base/context';

export const useMessageListener = <T extends object,>(event: IncomingPacketConstructor<T>, handler: (data: T) => void, enabled: boolean = true) => {
    const { subscribe } = useWebSocketContext();
    const onMessage = useEffectEvent((data: T) => handler(data));

    useEffect(() => {
        if (!enabled) return;

        return subscribe(event, onMessage);
    }, [event, enabled, subscribe]);
}
