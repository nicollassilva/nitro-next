import { RoomGeometryScaleType } from '@nitrodevco/nitro-api';
import { GetRenderer, GetStage, GetTicker } from '@nitrodevco/nitro-renderer';
import { RoomRenderedEvent } from '@nitrodevco/nitro-shared';
import type { Ticker } from 'pixi.js';
import { forwardRef, useEffect, useRef } from 'react';

import { useRoomMouseActions, useRoomSelector } from '#base/context';
import { useRoomCamera, useRoomMouse } from '#base/hooks';
import { useConfigurationStore } from '#base/stores';
import { GetPixelRatio } from '#base/utils';

export const RoomCanvas = forwardRef<HTMLDivElement>((props, ref) => {
    const room = useRoomSelector();
    const { mouseDataRef } = useRoomMouse();
    const maxFPS = useConfigurationStore<number>(state => state.config['fps.limit'] as number) ?? 60;
    const { updateRoomCamera } = useRoomCamera();
    const { hasAndResetCursorUpdate, hasCursorOwners } = useRoomMouseActions();

    // The tick loop reads these through refs so the loop's effect can depend on [room] alone.
    // Otherwise updateRoomCamera's identity changes on every camera-target change, tearing down and
    // rebuilding the ticker/ResizeObserver/canvas-append each time (frame hitch + camera snap).
    const updateRoomCameraRef = useRef(updateRoomCamera);
    const hasAndResetCursorUpdateRef = useRef(hasAndResetCursorUpdate);
    const hasCursorOwnersRef = useRef(hasCursorOwners);

    useEffect(() => {
        updateRoomCameraRef.current = updateRoomCamera;
        hasAndResetCursorUpdateRef.current = hasAndResetCursorUpdate;
        hasCursorOwnersRef.current = hasCursorOwners;
    });

    useEffect(() => {
        if (!room) return;

        const renderer = GetRenderer();
        const stage = GetStage();
        const ticker = GetTicker();

        const handleSize = (width: number, height: number, resolution: number) => {
            let canvas = room.canvas;

            if (!canvas) canvas = room.getRoomCanvas(width, height, RoomGeometryScaleType.ZoomedIn);
            else {
                canvas.initialize(width, height);
            }

            updateRoomCameraRef.current(-1);

            if (canvas.master && canvas.master.parent !== stage) stage.addChild(canvas.master);

            renderer.canvas.style.width = `${width}px`;
            renderer.canvas.style.height = `${height}px`;

            renderer.resize(width, height, resolution);

            renderer.render(stage);
        }

        let timer: ReturnType<typeof setTimeout>;

        const observer = new ResizeObserver(x => {
            const width = x[0]?.contentRect.width;
            const height = x[0]?.contentRect.height;
            const resolution = GetPixelRatio();

            clearTimeout(timer);

            timer = setTimeout(() => handleSize(width, height, resolution), 5);
        });

        if (ref && ('current' in ref) && ref.current) {
            ref.current.appendChild(renderer.canvas);

            observer.observe(ref.current);
        }

        const tick = (ticker: Ticker) => {
            if (!room) return;

            const mouseData = mouseDataRef.current;
            const time = ticker.lastTime;
            const update = false;

            room.update(time, update);

            if (!mouseData.isDragged) updateRoomCameraRef.current(time);

            if (mouseData.wasDragged) {
                const offsetX = ~~(room.canvas?.screenOffsetX || 0);
                const offsetY = ~~(room.canvas?.screenOffsetY || 0);

                room.setRoomInstanceRenderingCanvasOffset({ x: (offsetX + mouseData.dragXY.x), y: (offsetY + mouseData.dragXY.y) });

                mouseData.dragXY = { x: 0, y: 0 }
            }

            if (hasAndResetCursorUpdateRef.current()) renderer.canvas.style.cursor = hasCursorOwnersRef.current() ? 'pointer' : 'auto';

            renderer.render(stage);

            room.dispatchEvent(new RoomRenderedEvent(room.roomId, time));
        }

        ticker.add(tick);

        return () => {
            observer.disconnect();
            clearTimeout(timer);
            ticker.remove(tick);
        }
    }, [room, mouseDataRef]);

    useEffect(() => {
        const ticker = GetTicker();

        ticker.maxFPS = maxFPS;
    }, [maxFPS]);

    return null;
});
