import { RoomGeometryScaleType, RoomRenderedEvent } from '@nitrodevco/nitro-api';
import { GetRenderer, GetStage, GetTicker } from '@nitrodevco/nitro-renderer';
import { type Ticker } from 'pixi.js';
import { forwardRef, useEffect, useRef } from 'react';

import { useConfigValue, useRoomSelector } from '#base/context';
import { useRoomCamera, useRoomMouse } from '#base/hooks';
import { GetPixelRatio } from '#base/utils';

export const RoomPreviewerCanvas = forwardRef<HTMLDivElement>((props, ref) => {
    const room = useRoomSelector();
    const { mouseDataRef } = useRoomMouse();
    const maxFPS = useConfigValue<number>('fps.limit') ?? 60;
    const { updateRoomCamera } = useRoomCamera();
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        if (!room) return;

        const renderer = GetRenderer();
        const stage = GetStage();
        const ticker = GetTicker();

        const handleSize = (width: number, height: number, resolution: number) => {
            const canvas = room.canvas;

            if (!canvas) room.getRoomCanvas(width, height, RoomGeometryScaleType.ZoomedIn);
            else canvas.initialize(width, height);

            if (canvasRef.current && room.canvas) room.canvas.canvasElement = canvasRef.current;

            updateRoomCamera(-1);

            if (canvasRef.current) {
                canvasRef.current.width = width;
                canvasRef.current.height = height;
                canvasRef.current.style.width = `${width}px`;
                canvasRef.current.style.height = `${height}px`;
            }
        }

        let timer: ReturnType<typeof setTimeout>;

        const observer = new ResizeObserver(x => {
            const width = ~~x[0]?.contentRect.width;
            const height = ~~x[0]?.contentRect.height;
            const resolution = GetPixelRatio();

            clearTimeout(timer);

            timer = setTimeout(() => handleSize(width, height, resolution), 5);
        });

        if (ref && ('current' in ref) && ref.current) {
            const rect = ref.current.getBoundingClientRect();

            handleSize(~~rect.width, ~~rect.height, GetPixelRatio());

            observer.observe(ref.current);
        }

        const tick = (ticker: Ticker) => {
            if (!room || !room.canvas?.master || !canvasRef.current) return;

            const mouseData = mouseDataRef.current;
            const time = ticker.lastTime;
            const update = false;

            room.update(time, update);

            if (!mouseData.isDragged) updateRoomCamera(time);

            if (mouseData.wasDragged) {
                const offsetX = ~~(room.canvas?.screenOffsetX || 0);
                const offsetY = ~~(room.canvas?.screenOffsetY || 0);

                room.setRoomInstanceRenderingCanvasOffset({ x: (offsetX + mouseData.dragXY.x), y: (offsetY + mouseData.dragXY.y) });

                mouseData.dragXY = { x: 0, y: 0 }
            }

            const extracted = renderer.extract.canvas({ target: room.canvas.master });
            const ctx = canvasRef.current.getContext('2d');

            if (ctx) {
                ctx.clearRect(0, 0, room.canvas.master.width, room.canvas.master.height);
                ctx.drawImage(extracted as unknown as CanvasImageSource, 0, 0, room.canvas.master.width, room.canvas.master.height);
            }

            room.dispatchEvent(new RoomRenderedEvent(room.roomId, time));
        }

        ticker.add(tick);

        return () => {
            if (observer) observer.disconnect();
            if (timer) clearTimeout(timer);
            if (ticker) ticker.remove(tick);
        }
    }, [room, mouseDataRef, updateRoomCamera]);

    return (
        <div ref={ref} className="relative flex overflow-hidden size-full bg-black">
            <canvas ref={canvasRef} className="absolute" />
        </div>
    );
});
