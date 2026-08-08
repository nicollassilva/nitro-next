import { GetAssetManager, TextureUtils } from '@nitrodevco/nitro-renderer';
import { Sprite } from 'pixi.js';

const cache = new Map<string, Promise<string | undefined>>();
const resolvedCache = new Map<string, string>();

// Synchronous lookup for an already-resolved tint, so consumers can paint the correct value on
// first render (no untinted flash) once a given url+color has been tinted at least once.
export function getTintedImageSync(url: string, tintColor: string): string | undefined {
    return resolvedCache.get(`${url}::${tintColor}`);
}

export function tintImage(url: string, tintColor: string): Promise<string | undefined> {
    const key = `${url}::${tintColor}`;
    const cached = cache.get(key);

    if (cached) return cached;

    const promise = (async () => {
        let texture = GetAssetManager().getTexture(key);

        if (!texture) {
            await GetAssetManager().downloadAsset(url);

            texture = GetAssetManager().getTexture(url);
        }

        if (!texture) return undefined;

        const sprite = new Sprite(texture);

        sprite.tint = tintColor;

        try {
            const dataUrl = await TextureUtils.generateImageUrl({ target: sprite, resolution: 1 });

            if (dataUrl) resolvedCache.set(key, dataUrl);

            return dataUrl;
        } finally {
            sprite.destroy();
        }
    })();

    cache.set(key, promise);

    return promise;
}
