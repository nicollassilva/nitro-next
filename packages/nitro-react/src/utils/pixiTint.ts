import { GetAssetManager, TextureUtils } from '@nitrodevco/nitro-renderer';
import { Sprite } from 'pixi.js';

const cache = new Map<string, Promise<string | undefined>>();

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
            return await TextureUtils.generateImageUrl({ target: sprite, resolution: 1 });
        } finally {
            sprite.destroy();
        }
    })();

    cache.set(key, promise);

    return promise;
}
