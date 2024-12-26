import { Types } from 'ably';
import { ChannelNameAndOptions } from '../AblyReactHooks.js';
export declare function useStateErrors(params: ChannelNameAndOptions): {
    connectionError: Types.ErrorInfo;
    channelError: Types.ErrorInfo;
};
