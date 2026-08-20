import { ImageLike } from 'pixi.js';

export interface IGetImageListener {
    imageReady(result: ImageLike): void;
    imageFailed(): void;
}
