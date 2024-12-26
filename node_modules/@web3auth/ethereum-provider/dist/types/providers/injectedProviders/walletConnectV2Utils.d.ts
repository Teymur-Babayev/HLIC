import type { ISignClient } from "@walletconnect/types";
import { IProviderHandlers } from "../../rpc/interfaces";
export declare function sendJrpcRequest<T, U>(signClient: ISignClient, chainId: number, method: string, params: U): Promise<T>;
export declare function getAccounts(signClient: ISignClient): Promise<string[]>;
export declare function getProviderHandlers({ connector, chainId }: {
    connector: ISignClient;
    chainId: number;
}): IProviderHandlers;
