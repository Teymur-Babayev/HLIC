import { Types } from '../../../../../ably.js';
import { ChannelParameters } from '../AblyReactHooks.js';
export declare type AblyMessageCallback = Types.messageCallback<Types.Message>;
export interface ChannelResult {
    channel: Types.RealtimeChannelPromise;
    ably: Types.RealtimePromise;
    connectionError: Types.ErrorInfo | null;
    channelError: Types.ErrorInfo | null;
}
export declare function useChannel(channelNameOrNameAndOptions: ChannelParameters, callbackOnMessage?: AblyMessageCallback): ChannelResult;
export declare function useChannel(channelNameOrNameAndOptions: ChannelParameters, event: string, callbackOnMessage?: AblyMessageCallback): ChannelResult;
