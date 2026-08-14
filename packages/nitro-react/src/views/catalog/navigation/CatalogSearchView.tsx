import { MouseEvent, useState } from "react";

import { useTranslation } from "#base/context";
import { Border, NitroIcon } from "#base/theme";

export const CatalogSearchView = () => {
    const [searchValue, setSearchValue] = useState('');
    const t = useTranslation();

    const onIconClick = (e: MouseEvent) => {
        if (searchValue.length > 0) setSearchValue('');
    }

    return (
        <Border variant="105" className="flex items-center justify-center min-h-6 max-h-6 px-1.5 gap-1.5">
            <input type="text" className="flex-1 min-w-0 text-[0.75rem] text-[#666666]" placeholder={t('catalog.search')} value={searchValue} onChange={e => setSearchValue(e.target.value)} />
            <NitroIcon icon={searchValue.length > 0 ? "catalog-icon-clear" : "pencil-icon"} className="cursor-pointer shrink-0" onClick={onIconClick} />
        </Border>
    );
}