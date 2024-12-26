export declare const bahamut: import("../../types/utils.js").Assign<{
    readonly id: 5165;
    readonly network: "bahamut";
    readonly name: "Bahamut";
    readonly nativeCurrency: {
        readonly name: "Fasttoken";
        readonly symbol: "FTN";
        readonly decimals: 18;
    };
    readonly rpcUrls: {
        readonly default: {
            readonly http: readonly ["https://rpc1.bahamut.io", "https://bahamut.publicnode.com", "https://rpc2.bahamut.io"];
            readonly webSocket: readonly ["wss://ws1.sahara.bahamutchain.com", "wss://bahamut.publicnode.com", "wss://ws2.sahara.bahamutchain.com"];
        };
        readonly public: {
            readonly http: readonly ["https://rpc1.bahamut.io", "https://bahamut.publicnode.com", "https://rpc2.bahamut.io"];
            readonly webSocket: readonly ["wss://ws1.sahara.bahamutchain.com", "wss://bahamut.publicnode.com", "wss://ws2.sahara.bahamutchain.com"];
        };
    };
    readonly blockExplorers: {
        readonly default: {
            readonly name: "Ftnscan";
            readonly url: "https://www.ftnscan.com";
        };
    };
}, import("../../types/chain.js").ChainConfig<undefined>>;
//# sourceMappingURL=bahamut.d.ts.map