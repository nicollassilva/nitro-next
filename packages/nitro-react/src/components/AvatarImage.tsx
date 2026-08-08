import type { AvatarGenderType } from '@nitrodevco/nitro-api';
import { AvatarScaleType, AvatarSetType } from '@nitrodevco/nitro-api';
import { GetAvatarRenderManager } from '@nitrodevco/nitro-renderer';
import { forwardRef, useEffect, useState } from 'react';

type AvatarImageProps = {
    figure: string;
    gender: AvatarGenderType;
    headOnly?: boolean;
    direction?: number;
    scale?: number;
};

export const AvatarImage = forwardRef<HTMLDivElement, AvatarImageProps>(
    (props, ref) => {
        const { figure, gender, headOnly = false, direction = 0, scale = 1 } = props;
        const [randomValue, setRandomValue] = useState<number>(-1);
        const [imageData, setImageData] = useState<{
            width: number;
            height: number;
            url: string;
        }>({ width: 0, height: 0, url: '' });

        useEffect(() => {
            if (!figure) return;

            let cancelled = false;

            const avatarImage = GetAvatarRenderManager().createAvatarImage(
                figure,
                AvatarScaleType.Large,
                gender,
                {
                    resetFigure: (figure: string) => {
                        if (cancelled) return;

                        setRandomValue(Math.random());
                    },
                },
                {
                    resetEffect: (effect: number) => {
                        if (cancelled) return;

                        setRandomValue(Math.random());
                    },
                },
            );

            if (!avatarImage) return;

            let setType = AvatarSetType.Full;

            if (headOnly) setType = AvatarSetType.Head;

            avatarImage.setDirection(setType, direction);

            const load = async () => {
                try {
                    const image = await avatarImage.getCroppedImageAsync(setType, false, 1);

                    if (!image || cancelled) return;

                    setImageData({
                        width: image.width,
                        height: image.height,
                        url: image.src,
                    });
                } catch {
                    // avatar image was disposed mid-load (prop change/unmount) — ignore
                }
            };

            void load();

            return () => {
                cancelled = true;
                avatarImage.dispose();
            };
        }, [figure, gender, headOnly, direction, randomValue]);

        return (
            <div
                className="avatar-image-container"
                ref={ref}
                style={{
                    width: imageData.width,
                    height: imageData.height,
                    backgroundImage: `url(${imageData.url})`,
                    backgroundPosition: 'center -8px',
                    backgroundRepeat: 'no-repeat',
                    pointerEvents: 'none',
                }}
            />
        );
    },
);
