import { Chain } from 'viem/chains';
import { c as WalletClient, C as Connector, a as ConnectorData } from '../base-24d0a67f.js';
import EventEmitter from 'eventemitter3';
import 'viem';

type MockProviderOptions = {
    chainId: number;
    flags?: {
        isAuthorized?: boolean;
        failConnect?: boolean;
        failSwitchChain?: boolean;
        noSwitchChain?: boolean;
    };
    walletClient: WalletClient;
};
type Events = {
    accountsChanged(accounts: string[]): void;
    chainChanged(chainId: number | string): void;
    disconnect(): void;
};
type Event = keyof Events;
declare class MockProvider {
    #private;
    events: EventEmitter<Events, any>;
    chainId: number;
    constructor(options: MockProviderOptions);
    enable(): Promise<`0x${string}`[]>;
    disconnect(): Promise<void>;
    getAccounts(): Promise<`0x${string}`[]>;
    getWalletClient(): WalletClient;
    switchChain(chainId: number): Promise<void>;
    switchWalletClient(walletClient: WalletClient): Promise<void>;
    watchAsset(_asset: {
        address: string;
        decimals?: number;
        image?: string;
        symbol: string;
    }): Promise<boolean>;
    request({ method, params }: any): Promise<unknown>;
    on(event: Event, listener: (...args: any[]) => void): this;
    removeListener(event: Event, listener: (...args: any[]) => void): this;
    toJSON(): string;
}

type MockConnectorOptions = Omit<MockProviderOptions, 'chainId'> & {
    chainId?: number;
};
declare class MockConnector extends Connector<MockProvider, MockConnectorOptions> {
    #private;
    readonly id = "mock";
    readonly name = "Mock";
    readonly ready = true;
    constructor({ chains, options, }: {
        chains?: Chain[];
        options: MockConnectorOptions;
    });
    connect({ chainId }?: {
        chainId?: number;
    }): Promise<Required<ConnectorData>>;
    disconnect(): Promise<void>;
    getAccount(): Promise<`0x${string}`>;
    getChainId(): Promise<number>;
    getProvider({ chainId }?: {
        chainId?: number;
    }): Promise<MockProvider>;
    getWalletClient(): Promise<WalletClient>;
    isAuthorized(): Promise<boolean>;
    watchAsset(asset: {
        address: string;
        decimals?: number;
        image?: string;
        symbol: string;
    }): Promise<boolean>;
    protected onAccountsChanged: (accounts: string[]) => void;
    protected onChainChanged: (chainId: number | string) => void;
    protected onDisconnect: () => void;
    toJSON(): string;
}

export { MockConnector, MockProvider, MockProviderOptions };
