import { FriendRequestStateType } from "./FriendRequestStateType";

export interface IFriendRequest {
    readonly requestId: number;
    readonly playerId: number;
    readonly name: string;
    state: FriendRequestStateType;
}