import { type IMessageDataWrapper } from "@nitrodevco/nitro-api";
import { IFriendRequest } from "./IFriendRequest";
import { FriendRequestStateType } from "./FriendRequestStateType";

export const FriendRequestParser = (wrapper: IMessageDataWrapper): IFriendRequest => {
    const packet = {
        requestId: wrapper.readInt(),
        name: wrapper.readString(),
        playerId: wrapper.readInt(),
        state: FriendRequestStateType.Open,
    } as IFriendRequest;

    return packet;
}