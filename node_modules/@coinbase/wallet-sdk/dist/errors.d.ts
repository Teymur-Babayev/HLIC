import { EthereumProviderError, ethErrors } from "eth-rpc-errors";
import { JSONRPCRequest } from "./provider/JSONRPC";
declare type StandardErrorsType = typeof ethErrors & {
    provider: {
        unsupportedChain: (chainId?: string | number) => EthereumProviderError<undefined>;
    };
};
export declare const standardErrorCodes: Readonly<{
    provider: Readonly<{
        unsupportedChain: number;
        userRejectedRequest: 4001;
        unauthorized: 4100;
        unsupportedMethod: 4200;
        disconnected: 4900;
        chainDisconnected: 4901;
    }>;
    rpc: {
        readonly invalidInput: -32000;
        readonly resourceNotFound: -32001;
        readonly resourceUnavailable: -32002;
        readonly transactionRejected: -32003;
        readonly methodNotSupported: -32004;
        readonly limitExceeded: -32005;
        readonly parse: -32700;
        readonly invalidRequest: -32600;
        readonly methodNotFound: -32601;
        readonly invalidParams: -32602;
        readonly internal: -32603;
    };
}>;
export declare function standardErrorMessage(code: number | undefined): string;
export declare const standardErrors: StandardErrorsType;
interface SerializedError {
    code: number;
    message: string;
    docUrl: string;
    data?: unknown;
    stack?: string;
}
export declare type ErrorType = Error | SerializedError;
export declare type ErrorHandler = (error?: ErrorType) => void;
/**
 * Serializes an error to a format that is compatible with the Ethereum JSON RPC error format.
 * See https://docs.cloud.coinbase.com/wallet-sdk/docs/errors
 * for more information.
 */
export declare function serializeError(error: unknown, requestOrMethod?: JSONRPCRequest | JSONRPCRequest[] | string): SerializedError;
/**
 * Returns the error code from an error object.
 */
export declare function getErrorCode(error: unknown): number | undefined;
export {};
