export declare const wemixTestnet: import("../../types/utils.js").Assign<{
    readonly id: 1112;
    readonly name: "WEMIX Testnet";
    readonly network: "wemix-testnet";
    readonly nativeCurrency: {
        readonly name: "WEMIX";
        readonly symbol: "tWEMIX";
        readonly decimals: 18;
    };
    readonly rpcUrls: {
        readonly default: {
            readonly http: readonly ["https://api.test.wemix.com"];
        };
        readonly public: {
            readonly http: readonly ["https://api.test.wemix.com"];
        };
    };
    readonly blockExplorers: {
        readonly etherscan: {
            readonly name: "wemixExplorer";
            readonly url: "https://testnet.wemixscan.com";
        };
        readonly default: {
            readonly name: "wemixExplorer";
            readonly url: "https://testnet.wemixscan.com";
        };
    };
    readonly testnet: true;
}, import("../../types/chain.js").ChainConfig<undefined>>;
//# sourceMappingURL=wemixTestnet.d.ts.map