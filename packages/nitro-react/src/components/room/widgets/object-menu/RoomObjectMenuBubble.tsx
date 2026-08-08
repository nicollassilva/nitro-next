import { ISimpleRoomObjectData, RoomObjectUserType } from "@nitrodevco/nitro-api";
import { RoomRenderedEvent } from "@nitrodevco/nitro-shared";
import { PointData, Rectangle } from "pixi.js";
import { ReactNode, useEffect, useRef } from "react";

import { useRoomSelector } from "#base/context";
import { useRoomEventDispatcher } from "#base/hooks";
import { FixedSizeStack } from "#base/utils";

const LOCATION_STACK_SIZE: number = 25;
const BUBBLE_DROP_SPEED: number = 3;
const FADE_DELAY = 5000;
const FADE_LENGTH = 75;
const SPACE_AROUND_EDGES = 10;

type RoomObjectInfoBubbleProps = {
    objectData: ISimpleRoomObjectData;
    userType: RoomObjectUserType;
    fades?: boolean;
    children?: ReactNode;
    onClose?: () => void;
}

export const RoomObjectMenuBubble = (props: RoomObjectInfoBubbleProps) => {
    const { objectData, userType, fades = false, children, onClose = undefined } = props;
    const { objectId, category } = objectData;
    const room = useRoomSelector();
    const isFading = useRef<boolean>(false);
    const fadeTime = useRef<number>(1);
    const lastFrameTime = useRef<number | undefined>(undefined);
    const elementRef = useRef<HTMLDivElement>(null);
    // Per-instance position smoothing state; must not be shared across bubbles.
    const fixedStackRef = useRef<FixedSizeStack | undefined>(undefined);
    const maxStackRef = useRef<number>(-1000000);

    const updateFade = (time: number) => {
        if (!onClose || !isFading.current || !elementRef?.current) return;

        // `time` is the ticker's absolute timestamp, not a per-frame delta. Accumulate the
        // delta between frames; without this, fadeTime jumps to a huge value on the first
        // frame and the bubble closes instantly instead of fading.
        if (lastFrameTime.current === undefined) {
            lastFrameTime.current = time;

            return;
        }

        fadeTime.current += (time - lastFrameTime.current);
        lastFrameTime.current = time;

        const newOpacity = ((1 - (fadeTime.current / FADE_LENGTH)) * 1);

        if (newOpacity <= 0) {
            if (onClose) onClose();

            return;
        }

        elementRef.current.style.opacity = `${newOpacity ?? 0}`;
    }

    const updatePosition = (bounds: Rectangle, location: PointData) => {
        if (!bounds || !location || !fixedStackRef.current || !elementRef?.current) return;

        let offset = -(elementRef.current.offsetHeight ?? 0);

        if (userType === RoomObjectUserType.User || userType === RoomObjectUserType.Bot || userType === RoomObjectUserType.RentableBot) offset = (offset + ((bounds.height > 50) ? 15 : 0));
        else offset = (offset - 14);

        fixedStackRef.current.addValue((location.y - bounds.top));

        let maxStack = fixedStackRef.current.getMax();

        if (maxStack < (maxStackRef.current - BUBBLE_DROP_SPEED)) maxStack = (maxStackRef.current - BUBBLE_DROP_SPEED);

        maxStackRef.current = maxStack;

        const deltaY = (location.y - maxStack);

        let x = (location.x - (elementRef.current.offsetWidth / 2));
        let y = (deltaY + offset);

        const maxLeft = ((window.innerWidth - elementRef.current.offsetWidth) - SPACE_AROUND_EDGES);
        const maxTop = ((window.innerHeight - elementRef.current.offsetHeight) - SPACE_AROUND_EDGES);

        if (x < SPACE_AROUND_EDGES) x = SPACE_AROUND_EDGES;
        else if (x > maxLeft) x = maxLeft;

        if (y < SPACE_AROUND_EDGES) y = SPACE_AROUND_EDGES;
        else if (y > maxTop) y = maxTop;

        elementRef.current.style.left = `${~~x}px`;
        elementRef.current.style.top = `${~~y}px`;
    }

    useRoomEventDispatcher<RoomRenderedEvent>(RoomRenderedEvent.ROOM_RENDERED, event => {
        if (!room || !elementRef.current || !objectData) return;

        updateFade(event.time);

        const bounds = room.getRoomObjectBoundingRectangle(objectId, category);
        const location = room.getRoomObjectScreenLocation(objectId, category);

        if (!bounds || !location) return;

        updatePosition(bounds, location);

        elementRef.current.style.visibility = 'visible';
    });

    useEffect(() => {
        if (!fades) return;

        const timeout = setTimeout(() => isFading.current = true, FADE_DELAY);

        return () => clearTimeout(timeout);
    }, [fades]);

    useEffect(() => {
        fixedStackRef.current = new FixedSizeStack(LOCATION_STACK_SIZE);
        maxStackRef.current = -1000000;
        fadeTime.current = 1;
        lastFrameTime.current = undefined;
    }, []);

    return <div ref={elementRef} className="absolute z-50 invisible">{children}</div>
}