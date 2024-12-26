export declare const oasisTestnet: import("../../types/utils.js").Assign<{
    readonly id: 4090;
    readonly network: "oasis-testnet";
    readonly name: "Oasis Testnet";
    readonly nativeCurrency: {
        readonly name: "Fasttoken";
        readonly symbol: "FTN";
        readonly decimals: 18;
    };
    readonly rpcUrls: {
        readonly default: {
            readonly http: readonly ["https://rpc1.oasis.bahamutchain.com"];
        };
        readonly public: {
            readonly http: readonly ["https://rpc1.oasis.bahamutchain.com"];
        };
    };
    readonly blockExplorers: {
        readonly default: {
            readonly name: "Ftnscan";
            readonly url: "https://oasis.ftnscan.com";
        };
    };
    readonly testnet: true;
}, import("../../types/chain.js").ChainConfig<undefined>>;
//# sourceMappingURL=oasisTestnet.d.ts.map