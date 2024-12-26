import { SendOptions } from "@solana/web3.js";
import TorusCommunicationProvider from "./communicationProvider";
import TorusInPageProvider from "./inPageProvider";
import { LOGIN_PROVIDER_TYPE, NetworkInterface, PAYMENT_PROVIDER_TYPE, PaymentParams, TorusCtorArgs, TorusLoginParams, TorusParams, TransactionOrVersionedTransaction, UserInfo, WALLET_PATH } from "./interfaces";
declare class Torus {
    isInitialized: boolean;
    torusAlert: HTMLDivElement;
    modalZIndex: number;
    alertZIndex: number;
    requestedLoginProvider?: LOGIN_PROVIDER_TYPE;
    provider: TorusInPageProvider;
    communicationProvider: TorusCommunicationProvider;
    dappStorageKey: string;
    isTopupHidden: boolean;
    private torusAlertContainer;
    private torusUrl;
    private torusIframe;
    private styleLink;
    constructor({ modalZIndex }?: TorusCtorArgs);
    get isLoggedIn(): boolean;
    init({ buildEnv, enableLogging, network, showTorusButton, useLocalStorage, buttonPosition, apiKey, extraParams, whiteLabel, }?: TorusParams): Promise<void>;
    login(params?: TorusLoginParams): Promise<string[]>;
    loginWithPrivateKey(loginParams: {
        privateKey: string;
        userInfo: UserInfo;
    }): Promise<void>;
    logout(): Promise<void>;
    cleanUp(): Promise<void>;
    clearInit(): void;
    hideTorusButton(): void;
    showTorusButton(): void;
    setProvider(params: NetworkInterface): Promise<void>;
    showWallet(path: WALLET_PATH, params?: Record<string, string>): Promise<void>;
    getUserInfo(): Promise<UserInfo>;
    initiateTopup(provider: PAYMENT_PROVIDER_TYPE, params: PaymentParams): Promise<boolean>;
    getAccounts(): Promise<string[]>;
    sendTransaction(transaction: TransactionOrVersionedTransaction): Promise<string>;
    signAndSendTransaction(transaction: TransactionOrVersionedTransaction, options?: SendOptions): Promise<{
        signature: string;
    }>;
    signTransaction(transaction: TransactionOrVersionedTransaction): Promise<TransactionOrVersionedTransaction>;
    signAllTransactions(transactions: TransactionOrVersionedTransaction[]): Promise<TransactionOrVersionedTransaction[]>;
    signMessage(data: Uint8Array): Promise<Uint8Array>;
    getGaslessPublicKey(): Promise<string>;
    private handleDappStorageKey;
    private _setupWeb3;
}
export default Torus;
