import EventEmitter from 'eventemitter3';
import { EIP1193Provider, Transport, Chain, Account, WalletClient as WalletClient$1, Address } from 'viem';
import { Chain as Chain$1 } from 'viem/chains';

type InjectedProviderFlags = {
    isApexWallet?: true;
    isAvalanche?: true;
    isBackpack?: true;
    isBifrost?: true;
    isBitKeep?: true;
    isBitski?: true;
    isBlockWallet?: true;
    isBraveWallet?: true;
    isCoin98?: true;
    isCoinbaseWallet?: true;
    isDawn?: true;
    isDefiant?: true;
    isDesig?: true;
    isEnkrypt?: true;
    isExodus?: true;
    isFordefi?: true;
    isFrame?: true;
    isFrontier?: true;
    isGamestop?: true;
    isHaloWallet?: true;
    isHaqqWallet?: true;
    isHyperPay?: true;
    isImToken?: true;
    isKuCoinWallet?: true;
    isMathWallet?: true;
    isMetaMask?: true;
    isNovaWallet?: true;
    isOkxWallet?: true;
    isOKExWallet?: true;
    isOktoWallet?: true;
    isOneInchAndroidWallet?: true;
    isOneInchIOSWallet?: true;
    isOneKey?: true;
    isOpera?: true;
    isPhantom?: true;
    isPortal?: true;
    isRabby?: true;
    isRainbow?: true;
    isSafePal?: true;
    isStatus?: true;
    isSubWallet?: true;
    isTalisman?: true;
    isTally?: true;
    isTokenPocket?: true;
    isTokenary?: true;
    isTrust?: true;
    isTrustWallet?: true;
    isTTWallet?: true;
    isXDEFI?: true;
    isZeal?: true;
    isZerion?: true;
};
type InjectedProviders = InjectedProviderFlags & {
    isMetaMask: true;
    /** Only exists in MetaMask as of 2022/04/03 */
    _events: {
        connect?: () => void;
    };
    /** Only exists in MetaMask as of 2022/04/03 */
    _state?: {
        accounts?: string[];
        initialized?: boolean;
        isConnected?: boolean;
        isPermanentlyDisconnected?: boolean;
        isUnlocked?: boolean;
    };
};
interface WindowProvider extends InjectedProviders, EIP1193Provider {
    providers?: WindowProvider[];
}
type WalletClient<TTransport extends Transport = Transport, TChain extends Chain = Chain, TAccount extends Account = Account> = WalletClient$1<TTransport, TChain, TAccount>;
type Storage = {
    getItem<T>(key: string, defaultState?: T | null): T | null;
    setItem<T>(key: string, value: T | null): void;
    removeItem(key: string): void;
};

type ConnectorData = {
    account?: Address;
    chain?: {
        id: number;
        unsupported: boolean;
    };
};
interface ConnectorEvents {
    change(data: ConnectorData): void;
    connect(data: ConnectorData): void;
    message({ type, data }: {
        type: string;
        data?: unknown;
    }): void;
    disconnect(): void;
    error(error: Error): void;
}
declare abstract class Connector<Provider = any, Options = any> extends EventEmitter<ConnectorEvents> {
    /** Unique connector id */
    abstract readonly id: string;
    /** Connector name */
    abstract readonly name: string;
    /** Chains connector supports */
    readonly chains: Chain$1[];
    /** Options to use with connector */
    readonly options: Options;
    /** Connector storage. */
    protected storage?: Storage;
    /** Whether connector is usable */
    abstract readonly ready: boolean;
    constructor({ chains, options, }: {
        chains?: Chain$1[];
        options: Options;
    });
    abstract connect(config?: {
        chainId?: number;
    }): Promise<Required<ConnectorData>>;
    abstract disconnect(): Promise<void>;
    abstract getAccount(): Promise<Address>;
    abstract getChainId(): Promise<number>;
    abstract getProvider(config?: {
        chainId?: number;
    }): Promise<Provider>;
    abstract getWalletClient(config?: {
        chainId?: number;
    }): Promise<WalletClient>;
    abstract isAuthorized(): Promise<boolean>;
    switchChain?(chainId: number): Promise<Chain$1>;
    watchAsset?(asset: {
        address: string;
        decimals?: number;
        image?: string;
        symbol: string;
    }): Promise<boolean>;
    protected abstract onAccountsChanged(accounts: Address[]): void;
    protected abstract onChainChanged(chain: number | string): void;
    protected abstract onDisconnect(error: Error): void;
    protected getBlockExplorerUrls(chain: Chain$1): string[] | undefined;
    protected isChainUnsupported(chainId: number): boolean;
    setStorage(storage: Storage): void;
}

export { Connector as C, WindowProvider as W, ConnectorData as a, ConnectorEvents as b, WalletClient as c };
