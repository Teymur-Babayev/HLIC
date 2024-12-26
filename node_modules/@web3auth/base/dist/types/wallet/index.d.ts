export declare const MULTI_CHAIN_ADAPTERS: {
    OPENLOGIN: string;
    WALLET_CONNECT_V2: string;
};
export declare const SOLANA_ADAPTERS: {
    OPENLOGIN: string;
    WALLET_CONNECT_V2: string;
    TORUS_SOLANA: string;
    PHANTOM: string;
    SOLFLARE: string;
    SLOPE: string;
};
export declare const EVM_ADAPTERS: {
    OPENLOGIN: string;
    WALLET_CONNECT_V2: string;
    TORUS_EVM: string;
    METAMASK: string;
    COINBASE: string;
};
export declare const WALLET_ADAPTERS: {
    OPENLOGIN: string;
    WALLET_CONNECT_V2: string;
    TORUS_SOLANA: string;
    PHANTOM: string;
    SOLFLARE: string;
    SLOPE: string;
    TORUS_EVM: string;
    METAMASK: string;
    COINBASE: string;
};
export type WALLET_ADAPTER_TYPE = (typeof WALLET_ADAPTERS)[keyof typeof WALLET_ADAPTERS];
export type SOLANA_ADAPTER_TYPE = (typeof SOLANA_ADAPTERS)[keyof typeof SOLANA_ADAPTERS];
export type EVM_ADAPTER_TYPE = (typeof EVM_ADAPTERS)[keyof typeof EVM_ADAPTERS];
export type MULTI_CHAIN_ADAPTER_TYPE = (typeof MULTI_CHAIN_ADAPTERS)[keyof typeof MULTI_CHAIN_ADAPTERS];
export declare const ADAPTER_NAMES: {
    [x: string]: string;
};
