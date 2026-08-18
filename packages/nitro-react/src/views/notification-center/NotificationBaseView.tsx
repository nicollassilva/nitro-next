import { INotificationItem, NotificationPhaseEnum } from "@nitrodevco/nitro-api";
import type { MouseEvent, ReactNode } from "react";
import { useEffect } from "react";

import { useNotificationActions } from "#base/context/notification";
import { Border, cn } from "#base/theme";

import { getNotificationHeight } from "./NotificationViewConfigs";

export type NotificationBaseViewProps = {
    notification: INotificationItem;
    icon?: string | null;
    children?: ReactNode;
    className?: string;
    timeFadeIn?: number;
    timeDisplay?: number;
    timeFadeOut?: number;
    timeSwipeOut?: number;
    distanceSwipeOut?: number;
}

export const NotificationBaseView = ({
    notification,
    icon = null,
    children,
    className,
    timeFadeIn = 1000,
    timeDisplay = 15000,
    timeFadeOut = 1000,
    timeSwipeOut = 300,
    distanceSwipeOut = 340
}: NotificationBaseViewProps) => {
    const { id, phase, content } = notification;

    const { setNotificationPhase, setNotificationHovering, expireNotification, clickNotification, removeNotification } = useNotificationActions();

    const resolvedIcon = notification.icon ?? (notification.useStyleConfig ? icon : null);

    const onClick = (event: MouseEvent<HTMLDivElement>) => {
        const slideAway = !!(event.target as HTMLElement | null)?.closest('[data-slide-away]');

        clickNotification(id, slideAway);
    }

    useEffect(() => {
        switch (phase) {
            case NotificationPhaseEnum.FadeIn: {
                const timeout = window.setTimeout(() => setNotificationPhase(id, NotificationPhaseEnum.Display), timeFadeIn);

                return () => window.clearTimeout(timeout);
            }
            case NotificationPhaseEnum.Display: {
                const timeout = window.setTimeout(() => expireNotification(id), timeDisplay);

                return () => window.clearTimeout(timeout);
            }
            case NotificationPhaseEnum.FadeOut: {
                const timeout = window.setTimeout(() => removeNotification(id), timeFadeOut);

                return () => window.clearTimeout(timeout);
            }
            case NotificationPhaseEnum.SwipeOut: {
                const timeout = window.setTimeout(() => removeNotification(id), timeSwipeOut);

                return () => window.clearTimeout(timeout);
            }
            default:
                return;
        }
    }, [id, phase, timeFadeIn, timeDisplay, timeFadeOut, timeSwipeOut, setNotificationPhase, expireNotification, removeNotification]);

    const isVisible = phase !== NotificationPhaseEnum.Idle && phase !== NotificationPhaseEnum.FadeIn;
    const isSwiping = phase === NotificationPhaseEnum.SwipeOut;
    const isFadingOut = phase === NotificationPhaseEnum.FadeOut;

    return (
        <Border
            variant="1"
            className={ cn('pointer-events-auto cursor-pointer w-47.5 overflow-hidden flex gap-2 p-2 transition-all ease-linear', className) }
            style={ {
                minHeight: getNotificationHeight(notification.styleName),
                opacity: (isVisible && !isFadingOut) ? 1 : 0,
                transform: isSwiping ? `translateX(${ distanceSwipeOut }px)` : undefined,
                transitionDuration: `${ isSwiping ? timeSwipeOut : (isFadingOut ? timeFadeOut : timeFadeIn) }ms`
            } }
            onClick={ onClick }
            onMouseEnter={ () => setNotificationHovering(id, true) }
            onMouseLeave={ () => setNotificationHovering(id, false) }>
            { !!resolvedIcon?.length && (
                <div className="shrink-0 self-start size-12.5 flex items-center justify-center">
                    <img src={ resolvedIcon } alt="" className="max-w-full max-h-full pixel-art" />
                </div>
            ) }
            <div className="font-goldfish-bold text-[0.56rem] text-white leading-3 flex-1 min-w-0 wrap-break-word whitespace-pre-wrap min-h-5.5">{ content }</div>
            { children }
        </Border>
    );
}
