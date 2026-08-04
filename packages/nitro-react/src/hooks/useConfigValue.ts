import { useConfigurationStore } from '#base/stores';

export const useConfigValue = <T = unknown>(
    key: string,
    defaultValue: T | undefined = undefined
): T | undefined => useConfigurationStore(x => (x.config[key] as T) ?? defaultValue);
