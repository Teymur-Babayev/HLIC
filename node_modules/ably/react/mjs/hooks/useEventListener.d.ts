import { Types } from 'ably';
declare type EventListener<T> = (stateChange: T) => any;
export declare function useEventListener<S extends Types.ConnectionState | Types.ChannelState, C extends Types.ConnectionStateChange | Types.ChannelStateChange>(emitter: Types.EventEmitter<EventListener<C>, C, S>, listener: EventListener<C>, event?: S | S[]): void;
export {};
