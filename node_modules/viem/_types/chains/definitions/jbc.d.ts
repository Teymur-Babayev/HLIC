export declare const jbc: import("../../types/utils.js").Assign<{
    readonly id: 8899;
    readonly name: "JIBCHAIN L1";
    readonly network: "jbc";
    readonly nativeCurrency: {
        readonly name: "JBC";
        readonly symbol: "JBC";
        readonly decimals: 18;
    };
    readonly rpcUrls: {
        readonly default: {
            readonly http: readonly ["https://rpc-l1.jibchain.net"];
        };
        readonly public: {
            readonly http: readonly ["https://rpc-l1.jibchain.net"];
        };
    };
    readonly blockExplorers: {
        readonly default: {
            readonly name: "Blockscout";
            readonly url: "https://exp-l1.jibchain.net";
        };
    };
    readonly contracts: {
        readonly multicall3: {
            readonly address: "0xc0C8C486D1466C57Efe13C2bf000d4c56F47CBdC";
            readonly blockCreated: 2299048;
        };
    };
    readonly testnet: false;
}, import("../../types/chain.js").ChainConfig<undefined>>;
//# sourceMappingURL=jbc.d.ts.map