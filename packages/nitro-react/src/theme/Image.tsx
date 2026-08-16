import { forwardRef, HTMLAttributes, useEffect, useState } from "react";

import { useConfigValue } from "#base/context";

import { cn } from "./utils";

interface ImageProps extends HTMLAttributes<HTMLImageElement> {
    className?: string;
    wrapperClassName?: string;
    placeholderClassName?: string;
    src?: string;
}

export const Image = forwardRef<HTMLImageElement, ImageProps>(
    ({ className, wrapperClassName, placeholderClassName, src, onLoad, onError, ...props }, ref) => {
        const [status, setStatus] = useState<'loading' | 'loaded' | 'error'>('loading');
        const loadingIconUrl = useConfigValue<string>('loading.icon.url') ?? '';

        useEffect(() => {
            setStatus('loading');
        }, [src]);

        return (
            <div className={cn(`relative flex items-center justify-center`, wrapperClassName)}>
                <img
                    id="img-load"
                    src={loadingIconUrl}
                    className={cn(
                        'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 no-select [-webkit-user-drag:none] img-load',
                        placeholderClassName
                    )}
                />
                {status !== 'error' && <img
                    ref={ref}
                    src={src}
                    onLoad={e => {
                        e.currentTarget.parentElement?.querySelector('#img-load')?.remove();

                        setStatus('loaded');
                        onLoad?.(e);
                    }}
                    onError={e => {
                        setStatus('error');
                        onError?.(e);
                    }}
                    className={cn('absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 no-select [-webkit-user-drag:none]', className)}
                    {...props}
                />}
            </div>
        );
    }
);

Image.displayName = 'Image';