import { DialogButtonEnum, DialogFlagEnum, DialogUtilities, IDialogData } from "@nitrodevco/nitro-api";
import DOMPurify from "dompurify";
import type { ReactNode } from "react";

import { useTranslation } from "#base/context";
import { useDialogEventDispatch } from "#base/context/dialog";
import { Border, Button, Frame } from "#base/theme";

type AlertDialogViewProps = {
    dialog: IDialogData;
    children?: ReactNode;
}

export const AlertDialogView = ({ dialog, children }: AlertDialogViewProps) => {
    const { id, flags, title, summary, titleBarColor, captions } = dialog;

    const dispatchDialogEvent = useDialogEventDispatch();

    const t = useTranslation();

    const resolve = (value: string) => {
        const key = DialogUtilities.unwrapLocalizationKey(value);

        return t(key, key);
    }

    const body = resolve(summary);

    return (
        <Frame
            variant="0"
            resizable={ false }
            className="w-52.75 h-fit max-w-100"
            caption={ resolve(title) }
            tintColor={ titleBarColor ?? undefined }
            onClose={ () => dispatchDialogEvent(id, DialogButtonEnum.Close) }>
            <Border className="px-2.25 py-1 overflow-hidden">
                { DialogUtilities.hasFlag(flags, DialogFlagEnum.TextHtml)
                    ? <div className="text-[0.7rem] leading-3.5" dangerouslySetInnerHTML={ { __html: DOMPurify.sanitize(body) } } />
                    : <div className="text-[0.7rem] leading-3.5 whitespace-pre-wrap">{ body }</div> }
            </Border>
            <div className="flex justify-between items-center gap-1 mt-0.75">
                { children }
                { DialogUtilities.hasFlag(flags, DialogFlagEnum.ButtonOk) && (
                    <Button className="h-5.5" title={ captions[DialogFlagEnum.ButtonOk]?.toolTip } onClick={ () => dispatchDialogEvent(id, DialogButtonEnum.Ok) }>
                        { captions[DialogFlagEnum.ButtonOk]?.text ?? t('generic.ok', 'generic.ok') }
                    </Button>
                ) }
                { DialogUtilities.hasFlag(flags, DialogFlagEnum.ButtonCancel) && (
                    <Button className="h-5.5" title={ captions[DialogFlagEnum.ButtonCancel]?.toolTip } onClick={ () => dispatchDialogEvent(id, DialogButtonEnum.Cancel) }>
                        { captions[DialogFlagEnum.ButtonCancel]?.text ?? t('generic.cancel', 'generic.cancel') }
                    </Button>
                ) }
                { DialogUtilities.hasFlag(flags, DialogFlagEnum.ButtonCustom) && (
                    <Button className="h-5.5" title={ captions[DialogFlagEnum.ButtonCustom]?.toolTip } onClick={ () => dispatchDialogEvent(id, DialogButtonEnum.Custom) }>
                        { captions[DialogFlagEnum.ButtonCustom]?.text ?? '' }
                    </Button>
                ) }
            </div>
        </Frame>
    );
}
