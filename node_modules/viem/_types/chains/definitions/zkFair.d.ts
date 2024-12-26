export declare const zkFair: import("../../types/utils.js").Assign<{
    readonly id: 42766;
    readonly name: "ZKFair Mainnet";
    readonly network: "zkfair-mainnet";
    readonly nativeCurrency: {
        readonly decimals: 18;
        readonly name: "USD Coin";
        readonly symbol: "USDC";
    };
    readonly rpcUrls: {
        readonly default: {
            readonly http: readonly ["https://rpc.zkfair.io"];
        };
        readonly public: {
            readonly http: readonly ["https://rpc.zkfair.io"];
        };
    };
    readonly blockExplorers: {
        readonly default: {
            readonly name: "zkFair Explorer";
            readonly url: "https://scan.zkfair.io";
        };
    };
    readonly testnet: false;
}, import("../../types/chain.js").ChainConfig<undefined>>;
//# sourceMappingURL=zkFair.d.ts.map