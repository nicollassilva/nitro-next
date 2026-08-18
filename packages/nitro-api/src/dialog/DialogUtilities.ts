import { DialogFlagEnum } from "./DialogFlagEnum";

export class DialogUtilities {
    public static readonly DEFAULT_FLAGS = DialogFlagEnum.ButtonOk | DialogFlagEnum.TextTitle | DialogFlagEnum.TextSummary;

    private static readonly LOCALIZATION_KEY_REGEX = /^\$\{(.+)\}$/;

    public static resolveFlags(flags: number) {
        return flags === 0 ? DialogUtilities.DEFAULT_FLAGS : flags;
    }

    public static hasFlag(flags: number, flag: DialogFlagEnum) {
        return (flags & flag) !== 0;
    }

    public static unwrapLocalizationKey(value: string) {
        if (!value) return "";

        return DialogUtilities.LOCALIZATION_KEY_REGEX.exec(value)?.[1] ?? value;
    }
}
