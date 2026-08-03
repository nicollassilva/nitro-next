import { InfoRetrieveComposer } from "@nitrodevco/nitro-shared";
import { useEffect, useState } from "react";

import { MessengerComponent, RoomWrapper } from "./components";
import { useWebSocketContext } from "./context";
import { useMessengerHandler, useNavigatorHandler, useUserInfoHandler } from "./handlers";
import { InventoryView } from "./views/inventory/InventoryView";
import { ToolbarView } from "./views/toolbar/ToolbarView";

export const MainView = () => {
    const [isReady, setIsReady] = useState(false);
    const { setReady, send } = useWebSocketContext();

    useUserInfoHandler();
    useNavigatorHandler();
    useMessengerHandler();

    useEffect(() => {
        if (!isReady) return;

        send(new InfoRetrieveComposer({}));
    }, [isReady]);

    useEffect(() => {
        if (!isReady) return;

        setReady();
    }, [isReady]);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setIsReady(true);
    }, []);

    if (!isReady) return null;

    return (
        <>
            <RoomWrapper />
            <div
                id="ui-container"
                className="absolute top-0 left-0 z-10 overflow-hidden pointer-events-none size-full">
                <ToolbarView />
                <InventoryView />
                <MessengerComponent />
            </div>
        </>
    );
}