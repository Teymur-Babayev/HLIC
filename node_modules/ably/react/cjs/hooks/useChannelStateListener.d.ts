import { Types } from 'ably';
import { ChannelNameAndOptions } from '../AblyReactHooks.js';
declare type ChannelStateListener = (stateChange: Types.ChannelStateChange) => any;
export declare function useChannelStateListener(channelName: string, listener?: ChannelStateListener): any;
export declare function useChannelStateListener(options: ChannelNameAndOptions | string, state?: Types.ChannelState | Types.ChannelState[], listener?: ChannelStateListener): any;
export {};
