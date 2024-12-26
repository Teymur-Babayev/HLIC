import { Chain } from 'viem/chains';
import { InjectedConnectorOptions, InjectedConnector } from './injected.js';
import { W as WindowProvider } from './base-24d0a67f.js';
import 'viem';
import 'eventemitter3';

type MetaMaskConnectorOptions = Pick<InjectedConnectorOptions, 'shimDisconnect'> & {
    /**
     * While "disconnected" with `shimDisconnect`, allows user to select a different MetaMask account (than the currently connected account) when trying to connect.
     */
    UNSTABLE_shimOnConnectSelectAccount?: boolean;
};
declare class MetaMaskConnector extends InjectedConnector {
    #private;
    readonly id = "metaMask";
    protected shimDisconnectKey: string;
    constructor({ chains, options: options_, }?: {
        chains?: Chain[];
        options?: MetaMaskConnectorOptions;
    });
    connect({ chainId }?: {
        chainId?: number;
    }): Promise<{
        account: `0x${string}`;
        chain: {
            id: number;
            unsupported: boolean;
        };
        provider: WindowProvider;
    }>;
}

export { MetaMaskConnector, MetaMaskConnectorOptions };
