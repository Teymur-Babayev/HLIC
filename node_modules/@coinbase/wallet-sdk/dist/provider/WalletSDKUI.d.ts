import { ErrorHandler } from "../errors";
import { EthereumAddressFromSignedMessageRequest, SignEthereumMessageRequest, SignEthereumTransactionRequest, SubmitEthereumTransactionRequest } from "../relay/Web3Request";
import { EthereumAddressFromSignedMessageResponse, SignEthereumMessageResponse, SignEthereumTransactionResponse, SubmitEthereumTransactionResponse } from "../relay/Web3Response";
import { WalletUI, WalletUIOptions } from "./WalletUI";
export declare class WalletSDKUI implements WalletUI {
    private readonly linkFlow;
    private readonly snackbar;
    private standalone;
    private attached;
    private appSrc;
    constructor(options: Readonly<WalletUIOptions>);
    attach(): void;
    setConnectDisabled(connectDisabled: boolean): void;
    addEthereumChain(_options: {
        onCancel: ErrorHandler;
        onApprove: () => void;
        chainId: string;
        rpcUrls: string[];
        blockExplorerUrls?: string[];
        chainName?: string;
        iconUrls?: string[];
        nativeCurrency?: {
            name: string;
            symbol: string;
            decimals: number;
        };
    }): void;
    watchAsset(_options: {
        onCancel: ErrorHandler;
        onApprove: () => void;
        type: string;
        address: string;
        symbol?: string;
        decimals?: number;
        image?: string;
    }): void;
    switchEthereumChain(_options: {
        onCancel: ErrorHandler;
        onApprove: () => void;
        chainId: string;
        address?: string;
    }): void;
    requestEthereumAccounts(options: {
        onCancel: ErrorHandler;
    }): void;
    hideRequestEthereumAccounts(): void;
    signEthereumMessage(_: {
        request: SignEthereumMessageRequest;
        onSuccess: (response: SignEthereumMessageResponse) => void;
        onCancel: ErrorHandler;
    }): void;
    signEthereumTransaction(_: {
        request: SignEthereumTransactionRequest;
        onSuccess: (response: SignEthereumTransactionResponse) => void;
        onCancel: ErrorHandler;
    }): void;
    submitEthereumTransaction(_: {
        request: SubmitEthereumTransactionRequest;
        onSuccess: (response: SubmitEthereumTransactionResponse) => void;
        onCancel: ErrorHandler;
    }): void;
    ethereumAddressFromSignedMessage(_: {
        request: EthereumAddressFromSignedMessageRequest;
        onSuccess: (response: EthereumAddressFromSignedMessageResponse) => void;
    }): void;
    showConnecting(options: {
        isUnlinkedErrorState?: boolean;
        onCancel: ErrorHandler;
        onResetConnection: () => void;
    }): () => void;
    setAppSrc(appSrc: string): void;
    reloadUI(): void;
    inlineAccountsResponse(): boolean;
    inlineAddEthereumChain(_chainId: string): boolean;
    inlineWatchAsset(): boolean;
    inlineSwitchEthereumChain(): boolean;
    setStandalone(status: boolean): void;
    isStandalone(): boolean;
}
