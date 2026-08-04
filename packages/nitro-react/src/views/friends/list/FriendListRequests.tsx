import { useLocalizationStore } from "#base/stores";
import { AccordionContent, AccordionItem, AccordionTrigger, Border, NitroIcon, ScrollArea } from "#base/theme";

export const FriendListRequests = () => {
    const tabName = 'requests';

    const getLocalizationValue = useLocalizationStore(x => x.getLocalizationValue);

    return (
        <AccordionItem value={ tabName }>
            <AccordionTrigger className="h-4.5 shrink-0 bg-linear-to-b from-[#ff9302] from-50% to-[#ea8000] to-50% border-b flex justify-start items-center pt-px px-2 gap-1.5">
                { ({ isOpen }) => <>
                    <span className="text-white text-[0.68rem]">{ getLocalizationValue('friendlist.tab.friendrequests') }</span>
                    <NitroIcon className="brightness-0 invert mb-px" icon={ isOpen ? 'icon-arrow-down-black' : 'icon-arrow-right-black' } />
                </> }
            </AccordionTrigger>
            <AccordionContent className="flex flex-col flex-1 overflow-hidden border-b">
                <ScrollArea className="flex-1 min-h-0 p-1 pb-0 gap-1 text-[0.68rem]" contentClassName="flex flex-col [&>*:nth-child(odd)]:bg-[#eeeeee] [&>*:nth-child(even)]:bg-white">
                    area
                </ScrollArea>
                <div className="h-10 shrink-0 px-1.5 py-1.25">
                    <Border tintColor="#d8d8d8" className="h-full flex justify-center items-center px-1.25"></Border>
                </div>
            </AccordionContent>
        </AccordionItem>
    );
}
