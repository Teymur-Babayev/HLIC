export declare const wemix: import("../../types/utils.js").Assign<{
    readonly id: 1111;
    readonly name: "WEMIX";
    readonly network: "wemix-mainnet";
    readonly nativeCurrency: {
        readonly name: "WEMIX";
        readonly symbol: "WEMIX";
        readonly decimals: 18;
    };
    readonly rpcUrls: {
        readonly default: {
            readonly http: readonly ["https://api.wemix.com"];
        };
        readonly public: {
            readonly http: readonly ["https://api.wemix.com"];
        };
    };
    readonly blockExplorers: {
        readonly etherscan: {
            readonly name: "wemixExplorer";
            readonly url: "https://explorer.wemix.com";
        };
        readonly default: {
            readonly name: "wemixExplorer";
            readonly url: "https://explorer.wemix.com";
        };
    };
}, import("../../types/chain.js").ChainConfig<undefined>>;
//# sourceMappingURL=wemix.d.ts.map