import { RoomPreviewerWrapper } from "#base/components/room-preview/RoomPreviewerWrapper";
import { useCatalogSelectors } from "#base/context"

import { CatalogItemGridWidgetView } from "../widgets/CatalogItemGridWidgetView";

export const CatalogLayoutDefaultView = () => {
    const { activePage } = useCatalogSelectors();

    return (
        <>
            <RoomPreviewerWrapper />
            <div className="min-h-47.5 max-h-47.5">
                <CatalogItemGridWidgetView />
            </div>
        </>
    );
}