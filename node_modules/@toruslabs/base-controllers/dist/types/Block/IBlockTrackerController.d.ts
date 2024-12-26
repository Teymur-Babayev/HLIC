import { SafeEventEmitterProvider } from "@toruslabs/openlogin-jrpc";
import { BaseConfig, BaseState } from "../interfaces";
export interface BaseBlockTrackerConfig extends BaseConfig {
    blockResetDuration?: number;
}
export interface PollingBlockTrackerConfig extends BaseBlockTrackerConfig {
    provider: SafeEventEmitterProvider;
    pollingInterval: number;
    retryTimeout: number;
    setSkipCacheFlag: boolean;
}
export interface BaseBlockTrackerState<T extends {
    idempotencyKey: string;
}> extends BaseState {
    _currentBlock?: T;
    _isRunning?: boolean;
}
