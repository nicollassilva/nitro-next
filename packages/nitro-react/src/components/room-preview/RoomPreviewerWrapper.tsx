import { RoomContextProvider } from "#base/context";

import { RoomPreviewerContainer } from "./RoomPreviewerContainer";

export const RoomPreviewerWrapper = () => {
    return (
        <RoomContextProvider>
            <RoomPreviewerContainer />
        </RoomContextProvider>
    );
}