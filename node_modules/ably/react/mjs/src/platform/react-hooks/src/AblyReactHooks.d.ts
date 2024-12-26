import { Types } from '../../../../ably.js';
export declare type ChannelNameAndOptions = {
    channelName: string;
    options?: Types.ChannelOptions;
    id?: string;
    subscribeOnly?: boolean;
    skip?: boolean;
    onConnectionError?: (error: Types.ErrorInfo) => unknown;
    onChannelError?: (error: Types.ErrorInfo) => unknown;
};
export declare type ChannelNameAndId = {
    channelName: string;
    id?: string;
};
export declare type ChannelParameters = string | ChannelNameAndOptions;
export declare const version = "1.2.47";
export declare function channelOptionsWithAgent(options?: Types.ChannelOptions): {
    params: {
        agent: string;
    };
    cipher?: Types.CipherParamOptions | Types.CipherParams;
    modes?: Types.ChannelModes;
};
