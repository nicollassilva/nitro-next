import { useNotification } from "#base/context/notification";

import { NotificationBaseView } from "./NotificationBaseView";
import { NOTIFICATION_TIMINGS } from "./NotificationViewConfigs";

type NotificationItemViewProps = {
    id: number;
}

export const NotificationItemView = ({ id }: NotificationItemViewProps) => {
    const notification = useNotification(id);

    if (!notification) return null;

    return <NotificationBaseView notification={ notification } { ...NOTIFICATION_TIMINGS[notification.styleName] } />;
}
