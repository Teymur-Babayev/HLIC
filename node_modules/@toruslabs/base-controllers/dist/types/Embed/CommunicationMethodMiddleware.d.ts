import { JRPCMiddleware } from "@toruslabs/openlogin-jrpc";
import type { ProviderConfig } from "../Network/INetworkController";
import { ICommunicationProviderHandlers, Ihandler, TopupInput } from "./IEmbedController";
export declare function createChangeProviderMiddlewareMiddleware({ changeProvider, }: {
    changeProvider: ICommunicationProviderHandlers["changeProvider"];
}): JRPCMiddleware<ProviderConfig & {
    windowId: string;
}, boolean>;
export declare function createTopupMiddleware({ topup }: {
    topup: ICommunicationProviderHandlers["topup"];
}): JRPCMiddleware<TopupInput, boolean>;
export declare function createGenericJRPCMiddleware<T>(targetMethod: string, handler: (req: Ihandler<T>) => Promise<unknown>): JRPCMiddleware<T, unknown>;
export declare function createCommunicationMiddleware(providerHandlers: ICommunicationProviderHandlers): JRPCMiddleware<unknown, unknown>;
