import { useCatalogSelectors, useConfigValue } from "#base/context";

export const CatalogHeaderView = () => {
    const { activePage, activeNodes } = useCatalogSelectors();
    const activeNode = activeNodes.find(x => x.pageId === activePage?.pageId);
    const catalogIconUrl = useConfigValue<string>('catalog.icons.url') ?? '';
    const catalogImageUrl = useConfigValue<string>('asset.urls.catalog') ?? '';

    let headerImageUrl = catalogImageUrl.replace('%name%', 'catalog_header_roombuilder');

    const headerData = activePage?.localization.imageDatas[0] ?? '';

    if (headerData && headerData.length) headerImageUrl = catalogImageUrl.replace('%name%', headerData);

    return (
        <div className="relative flex w-full min-h-22.5 max-h-22.5 z-30 px-px">
            <div className="absolute top-0 left-0 bg-cover bg-no-repeat bg-position-[50%] size-full opacity-[0.1]" style={{ backgroundImage: `url(${headerImageUrl})` }} />
            <div className="flex size-full border-[#376275] bg-[#0e3f52] border-2 gap-4 px-5">
                <div className="flex items-center justify-center">
                    <img className="scale-200" src={catalogIconUrl?.replace('%name%', activeNode?.icon.toString() ?? '1')} />
                </div>
                <div className="flex items-center">
                    <span className="text-style-headline-big text-white">{activeNode?.localization ?? ''}</span>
                </div>
            </div>
        </div>
    );
}