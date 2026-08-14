import { type CSSProperties, useEffect, useState } from 'react';

import { tintImage } from './pixiTint';
import { THEME_URLS } from './themeUrls';

export const useTintedVars = (varNames: string[] | undefined, tintColor: string | undefined, blend: number = 0) => {
    const key = varNames && varNames.length > 0 ? varNames.join(',') : undefined;
    const [style, setStyle] = useState<CSSProperties | undefined>(undefined);

    useEffect(() => {
        if (!key || (!tintColor && blend < 0)) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setStyle(undefined);

            return;
        }

        let cancelled = false;

        const promise = async () => {
            const results = await Promise.all(
                key.split(',').map(async (x: string) => {
                    const url = THEME_URLS[x];

                    if (!url) return undefined;

                    return [x, await tintImage(url, tintColor, blend)] as const;
                })
            );

            const next: Record<string, string> = {};

            for (const result of results) {
                if (!result) continue;

                const [name, dataUrl] = result;

                next[`--${name}`] = `url(${dataUrl})`;
            }

            if (!cancelled) setStyle(next);
        }

        void promise();

        return () => {
            cancelled = true;
        }
    }, [key, tintColor, blend]);

    return style;
}
