import { type RefObject, useEffect, useEffectEvent } from 'react';

export const useOutsideClick = <T extends HTMLElement>(ref: RefObject<T | null>, callback: () => void, enabled: boolean = true) => {
    const onOutsideClick = useEffectEvent(callback);

    useEffect(() => {
        if (!enabled) return;

        const onPointerDown = (event: PointerEvent) => {
            const element = ref.current;

            if (!element || element.contains(event.target as Node)) return;

            onOutsideClick();
        }

        document.addEventListener('pointerdown', onPointerDown);

        return () => document.removeEventListener('pointerdown', onPointerDown);
    }, [ref, enabled]);
}
