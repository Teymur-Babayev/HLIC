import { Types } from '../../../../../ably.js';
declare type ConnectionStateListener = (stateChange: Types.ConnectionStateChange) => any;
export declare function useConnectionStateListener(listener: ConnectionStateListener, id?: string): any;
export declare function useConnectionStateListener(state: Types.ConnectionState | Types.ConnectionState[], listener: ConnectionStateListener, id?: string): any;
export {};
