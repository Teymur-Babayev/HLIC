import { Types } from '../../../../../ably.js';
import { ChannelParameters } from '../AblyReactHooks.js';
export interface PresenceResult<T> {
    presenceData: PresenceMessage<T>[];
    updateStatus: (messageOrPresenceObject: T) => void;
    connectionError: Types.ErrorInfo | null;
    channelError: Types.ErrorInfo | null;
}
export declare type OnPresenceMessageReceived<T> = (presenceData: PresenceMessage<T>) => void;
export declare type UseStatePresenceUpdate = (presenceData: Types.PresenceMessage[]) => void;
export declare function usePresence<T = any>(channelNameOrNameAndOptions: ChannelParameters, messageOrPresenceObject?: T, onPresenceUpdated?: OnPresenceMessageReceived<T>): PresenceResult<T>;
interface PresenceMessage<T = any> {
    action: Types.PresenceAction;
    clientId: string;
    connectionId: string;
    data: T;
    encoding: string;
    id: string;
    timestamp: number;
}
export {};
