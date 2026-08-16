import { forwardRef, HTMLAttributes } from 'react';

import { useConfigValue } from '#base/context';

import { Image } from './Image';

interface NitroCurrencyIconProps extends HTMLAttributes<HTMLImageElement> {
    className?: string;
    type: string;
    mini?: boolean;
    small?: boolean;
}

export const NitroCurrencyIcon = forwardRef<HTMLImageElement, NitroCurrencyIconProps>(
    ({ className, type, mini = false, small = false, ...props }, ref) => {
        let iconUrl = useConfigValue<string>('currency.icon.url') ?? '';

        let size = "big";

        if (mini) size = "mini";

        if (small) size = "small";

        iconUrl = iconUrl.replace('%type%', type);
        iconUrl = iconUrl.replace('%size%', size);

        return <Image ref={ref} className={className} src={iconUrl} {...props} />;
    }
);

NitroCurrencyIcon.displayName = 'NitroCurrencyIcon';