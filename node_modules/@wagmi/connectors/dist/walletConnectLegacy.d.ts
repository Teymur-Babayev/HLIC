import WalletConnectProvider from '@walletconnect/legacy-provider';
import { C as Connector, c as WalletClient } from './base-24d0a67f.js';
import 'eventemitter3';
import 'viem';
import 'viem/chains';

type WalletConnectOptions = ConstructorParameters<typeof WalletConnectProvider>[0];
declare class WalletConnectLegacyConnector extends Connector<WalletConnectProvider, WalletConnectOptions> {
    #private;
    readonly id = "walletConnectLegacy";
    readonly name = "WalletConnectLegacy";
    readonly ready = true;
    connect({ chainId }?: {
        chainId?: number;
    }): Promise<{
        account: `0x${string}`;
        chain: {
            id: number;
            unsupported: boolean;
        };
    }>;
    disconnect(): Promise<void>;
    getAccount(): Promise<`0x${string}`>;
    getChainId(): Promise<number>;
    getProvider({ chainId, create, }?: {
        chainId?: number;
        create?: boolean;
    }): Promise<WalletConnectProvider>;
    getWalletClient({ chainId, }?: {
        chainId?: number;
    }): Promise<WalletClient>;
    isAuthorized(): Promise<boolean>;
    protected onAccountsChanged: (accounts: string[]) => void;
    protected onChainChanged: (chainId: number | string) => void;
    protected onDisconnect: () => void;
}

export { WalletConnectLegacyConnector };
