import { SafeEventEmitter } from "@toruslabs/openlogin-jrpc";
import type { OPENLOGIN_NETWORK_TYPE } from "@toruslabs/openlogin-utils";
import { ADAPTER_STATUS_TYPE, CustomChainConfig, IAdapter, IProvider, IWeb3Auth, UserAuthInfo, UserInfo, WALLET_ADAPTER_TYPE } from "@web3auth/base";
import { IPlugin } from "@web3auth/base-plugin";
import { CommonJRPCProvider } from "@web3auth/base-provider";
export interface Web3AuthNoModalOptions {
    /**
     * Client id for web3auth.
     * You can obtain your client id from the web3auth developer dashboard.
     * You can set any random string for this on localhost.
     */
    clientId: string;
    /**
     * custom chain configuration for chainNamespace
     *
     * @defaultValue mainnet config of provided chainNamespace
     */
    chainConfig: Partial<CustomChainConfig> & Pick<CustomChainConfig, "chainNamespace">;
    /**
     * setting to true will enable logs
     *
     * @defaultValue false
     */
    enableLogging?: boolean;
    /**
     * setting to "local" will persist social login session accross browser tabs.
     *
     * @defaultValue "local"
     */
    storageKey?: "session" | "local";
    /**
     * sessionTime (in seconds) for idToken issued by Web3Auth for server side verification.
     * @defaultValue 86400
     *
     * Note: max value can be 7 days (86400 * 7) and min can be  1 day (86400)
     */
    sessionTime?: number;
    /**
     * Web3Auth Network to use for the session & the issued idToken
     * @defaultValue mainnet
     */
    web3AuthNetwork?: OPENLOGIN_NETWORK_TYPE;
    /**
     * Uses core-kit key with web3auth provider
     * @defaultValue false
     */
    useCoreKitKey?: boolean;
}
export declare class Web3AuthNoModal extends SafeEventEmitter implements IWeb3Auth {
    readonly coreOptions: Web3AuthNoModalOptions;
    connectedAdapterName: WALLET_ADAPTER_TYPE | null;
    status: ADAPTER_STATUS_TYPE;
    cachedAdapter: string | null;
    protected walletAdapters: Record<string, IAdapter<unknown>>;
    protected commonJRPCProvider: CommonJRPCProvider | null;
    private plugins;
    private storage;
    constructor(options: Web3AuthNoModalOptions);
    get connected(): boolean;
    get provider(): IProvider | null;
    set provider(_: IProvider | null);
    init(): Promise<void>;
    configureAdapter(adapter: IAdapter<unknown>): Web3AuthNoModal;
    clearCache(): void;
    addChain(chainConfig: CustomChainConfig): Promise<void>;
    switchChain(params: {
        chainId: string;
    }): Promise<void>;
    /**
     * Connect to a specific wallet adapter
     * @param walletName - Key of the walletAdapter to use.
     */
    connectTo<T>(walletName: WALLET_ADAPTER_TYPE, loginParams?: T): Promise<IProvider | null>;
    logout(options?: {
        cleanup: boolean;
    }): Promise<void>;
    getUserInfo(): Promise<Partial<UserInfo>>;
    authenticateUser(): Promise<UserAuthInfo>;
    addPlugin(plugin: IPlugin): Promise<IWeb3Auth>;
    protected subscribeToAdapterEvents(walletAdapter: IAdapter<unknown>): void;
    protected checkInitRequirements(): void;
    private cacheWallet;
}
