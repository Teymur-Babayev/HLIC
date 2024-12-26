import { ChainNamespaceType, CustomChainConfig } from "./IChainInterface";
export declare const getEvmChainConfig: (chainId: number) => CustomChainConfig | null;
export declare const getSolanaChainConfig: (chainId: number) => CustomChainConfig | null;
export declare const getChainConfig: (chainNamespace: ChainNamespaceType, chainId?: number | string) => CustomChainConfig | null;
