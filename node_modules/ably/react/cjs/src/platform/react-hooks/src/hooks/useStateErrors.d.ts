import { Types } from '../../../../../ably.js';
import { ChannelNameAndOptions } from '../AblyReactHooks.js';
export declare function useStateErrors(params: ChannelNameAndOptions): {
    connectionError: Types.ErrorInfo;
    channelError: Types.ErrorInfo;
};
