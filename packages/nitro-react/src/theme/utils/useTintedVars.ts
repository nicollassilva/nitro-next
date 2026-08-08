import { type CSSProperties, useEffect, useState } from 'react';

import { getTintedImageSync, tintImage } from './pixiTint';
import { THEME_URLS } from './themeUrls';

// Build the CSS vars synchronously from already-resolved tints (if any), so a warm cache paints
// the tinted border on first render instead of flashing the untinted one.
const computeSyncStyle = (key: string | undefined, tintColor: string | undefined): CSSProperties | undefined => {
    if (!key || !tintColor) return undefined;

    const next: Record<string, string> = {};
    let any = false;

    for (const name of key.split(',')) {
        const url = THEME_URLS[name];

        if (!url) continue;

        const dataUrl = getTintedImageSync(url, tintColor);

        if (dataUrl) {
            next[`--${name}`] = `url(${dataUrl})`;
            any = true;
        }
    }

    return any ? next : undefined;
};

export const useTintedVars = (varNames: string[] | undefined, tintColor: string | undefined) => {
    const key = varNames && varNames.length > 0 ? varNames.join(',') : undefined;
    const [style, setStyle] = useState<CSSProperties | undefined>(() => computeSyncStyle(key, tintColor));

    useEffect(() => {
        if (!key || !tintColor) {
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

                    return [x, await tintImage(url, tintColor)] as const;
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
    }, [key, tintColor]);

    return style;
}
