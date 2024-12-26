import { CoinbaseWalletProvider } from '@coinbase/wallet-sdk';
import { CoinbaseWalletSDKOptions } from '@coinbase/wallet-sdk/dist/CoinbaseWalletSDK';
import { Chain } from 'viem/chains';
import { C as Connector, c as WalletClient } from './base-24d0a67f.js';
import 'eventemitter3';
import 'viem';

type Options = Omit<CoinbaseWalletSDKOptions, 'reloadOnDisconnect'> & {
    /**
     * Fallback Ethereum JSON RPC URL
     * @default ""
     */
    jsonRpcUrl?: string;
    /**
     * Fallback Ethereum Chain ID
     * @default 1
     */
    chainId?: number;
    /**
     * Whether or not to reload dapp automatically after disconnect.
     */
    reloadOnDisconnect?: boolean;
};
declare class CoinbaseWalletConnector extends Connector<CoinbaseWalletProvider, Options> {
    #private;
    readonly id = "coinbaseWallet";
    readonly name = "Coinbase Wallet";
    readonly ready = true;
    constructor({ chains, options }: {
        chains?: Chain[];
        options: Options;
    });
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
    getProvider(): Promise<CoinbaseWalletProvider>;
    getWalletClient({ chainId, }?: {
        chainId?: number;
    }): Promise<WalletClient>;
    isAuthorized(): Promise<boolean>;
    switchChain(chainId: number): Promise<Chain>;
    watchAsset({ address, decimals, image, symbol, }: {
        address: string;
        decimals?: number;
        image?: string;
        symbol: string;
    }): Promise<boolean>;
    protected onAccountsChanged: (accounts: string[]) => void;
    protected onChainChanged: (chainId: number | string) => void;
    protected onDisconnect: () => void;
}

export { CoinbaseWalletConnector };
