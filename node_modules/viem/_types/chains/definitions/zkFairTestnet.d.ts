export declare const zkFairTestnet: import("../../types/utils.js").Assign<{
    readonly id: 43851;
    readonly name: "ZKFair Testnet";
    readonly network: "zkfair-testnet";
    readonly nativeCurrency: {
        readonly decimals: 18;
        readonly name: "USD Coin";
        readonly symbol: "USDC";
    };
    readonly rpcUrls: {
        readonly default: {
            readonly http: readonly ["https://testnet-rpc.zkfair.io"];
        };
        readonly public: {
            readonly http: readonly ["https://testnet-rpc.zkfair.io"];
        };
    };
    readonly blockExplorers: {
        readonly default: {
            readonly name: "zkFair Explorer";
            readonly url: "https://testnet-scan.zkfair.io";
        };
    };
    readonly testnet: true;
}, import("../../types/chain.js").ChainConfig<undefined>>;
//# sourceMappingURL=zkFairTestnet.d.ts.map