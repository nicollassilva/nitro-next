import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type MOTDNotificationEventMessageType = {
    messages: string[];
};

export class MOTDNotificationEventMessage implements IIncomingPacket<MOTDNotificationEventMessageType> {
    public parse(wrapper: IMessageDataWrapper): MOTDNotificationEventMessageType {
        const messages: string[] = [];

        let totalMessages = wrapper.readInt();

        while (totalMessages > 0) {
            messages.push(wrapper.readString());

            totalMessages--;
        }

        const packet: MOTDNotificationEventMessageType = {
            messages
        };

        return packet;
    }
}
