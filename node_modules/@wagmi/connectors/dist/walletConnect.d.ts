import WalletConnectProvider from '@walletconnect/ethereum-provider';
import { EthereumProviderOptions } from '@walletconnect/ethereum-provider/dist/types/EthereumProvider';
import { Chain } from 'viem/chains';
import { C as Connector, c as WalletClient } from './base-24d0a67f.js';
import 'eventemitter3';
import 'viem';

type WalletConnectOptions = {
    /**
     * WalletConnect Cloud Project ID.
     * @link https://cloud.walletconnect.com/sign-in.
     */
    projectId: EthereumProviderOptions['projectId'];
    /**
     * If a new chain is added to a previously existing configured connector `chains`, this flag
     * will determine if that chain should be considered as stale. A stale chain is a chain that
     * WalletConnect has yet to establish a relationship with (ie. the user has not approved or
     * rejected the chain).
     *
     * Preface: Whereas WalletConnect v1 supported dynamic chain switching, WalletConnect v2 requires
     * the user to pre-approve a set of chains up-front. This comes with consequent UX nuances (see below) when
     * a user tries to switch to a chain that they have not approved.
     *
     * This flag mainly affects the behavior when a wallet does not support dynamic chain authorization
     * with WalletConnect v2.
     *
     * If `true` (default), the new chain will be treated as a stale chain. If the user
     * has yet to establish a relationship (approved/rejected) with this chain in their WalletConnect
     * session, the connector will disconnect upon the dapp auto-connecting, and the user will have to
     * reconnect to the dapp (revalidate the chain) in order to approve the newly added chain.
     * This is the default behavior to avoid an unexpected error upon switching chains which may
     * be a confusing user experience (ie. the user will not know they have to reconnect
     * unless the dapp handles these types of errors).
     *
     * If `false`, the new chain will be treated as a validated chain. This means that if the user
     * has yet to establish a relationship with the chain in their WalletConnect session, wagmi will successfully
     * auto-connect the user. This comes with the trade-off that the connector will throw an error
     * when attempting to switch to the unapproved chain. This may be useful in cases where a dapp constantly
     * modifies their configured chains, and they do not want to disconnect the user upon
     * auto-connecting. If the user decides to switch to the unapproved chain, it is important that the
     * dapp handles this error and prompts the user to reconnect to the dapp in order to approve
     * the newly added chain.
     *
     * @default true
     */
    isNewChainsStale?: boolean;
    /**
     * Metadata for your app.
     * @link https://docs.walletconnect.com/2.0/advanced/providers/ethereum#initialization
     */
    metadata?: EthereumProviderOptions['metadata'];
    /**
     * Whether or not to show the QR code modal.
     * @default true
     * @link https://docs.walletconnect.com/2.0/advanced/providers/ethereum#initialization
     */
    showQrModal?: EthereumProviderOptions['showQrModal'];
    /**
     * Options of QR code modal.
     * @link https://docs.walletconnect.com/2.0/advanced/walletconnectmodal/options
     */
    qrModalOptions?: EthereumProviderOptions['qrModalOptions'];
    /**
     * Option to override default relay url.
     * @link https://docs.walletconnect.com/2.0/advanced/providers/ethereum
     */
    relayUrl?: string;
};
type ConnectConfig = {
    /** Target chain to connect to. */
    chainId?: number;
    /** If provided, will attempt to connect to an existing pairing. */
    pairingTopic?: string;
};
declare class WalletConnectConnector extends Connector<WalletConnectProvider, WalletConnectOptions> {
    #private;
    readonly id = "walletConnect";
    readonly name = "WalletConnect";
    readonly ready = true;
    constructor(config: {
        chains?: Chain[];
        options: WalletConnectOptions;
    });
    connect({ chainId, pairingTopic }?: ConnectConfig): Promise<{
        account: `0x${string}`;
        chain: {
            id: number;
            unsupported: boolean;
        };
    }>;
    disconnect(): Promise<void>;
    getAccount(): Promise<`0x${string}`>;
    getChainId(): Promise<number>;
    getProvider({ chainId }?: {
        chainId?: number;
    }): Promise<WalletConnectProvider>;
    getWalletClient({ chainId, }?: {
        chainId?: number;
    }): Promise<WalletClient>;
    isAuthorized(): Promise<boolean>;
    switchChain(chainId: number): Promise<Chain>;
    protected onAccountsChanged: (accounts: string[]) => void;
    protected onChainChanged: (chainId: number | string) => void;
    protected onDisconnect: () => void;
    protected onDisplayUri: (uri: string) => void;
    protected onConnect: () => void;
}

export { WalletConnectConnector };
