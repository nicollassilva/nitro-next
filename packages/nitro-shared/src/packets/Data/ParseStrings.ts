import { IMessageDataWrapper } from "@nitrodevco/nitro-api";

export const ParseStrings = (wrapper: IMessageDataWrapper): string[] => {
    const results: string[] = [];

    let count = wrapper.readInt();

    while (count > 0) {
        results.push(wrapper.readString());

        count--;
    }

    return results;
}