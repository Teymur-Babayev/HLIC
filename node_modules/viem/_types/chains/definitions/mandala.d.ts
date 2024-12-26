export declare const mandala: import("../../types/utils.js").Assign<{
    readonly id: 595;
    readonly name: "Mandala TC9";
    readonly network: "mandala";
    readonly nativeCurrency: {
        readonly name: "Mandala";
        readonly symbol: "mACA";
        readonly decimals: 18;
    };
    readonly rpcUrls: {
        readonly public: {
            readonly http: readonly ["https://eth-rpc-tc9.aca-staging.network"];
            readonly webSocket: readonly ["wss://eth-rpc-tc9.aca-staging.network"];
        };
        readonly default: {
            readonly http: readonly ["https://eth-rpc-tc9.aca-staging.network"];
            readonly webSocket: readonly ["wss://eth-rpc-tc9.aca-staging.network"];
        };
    };
    readonly blockExplorers: {
        readonly default: {
            readonly name: "Mandala Blockscout";
            readonly url: "https://blockscout.mandala.aca-staging.network";
        };
    };
    readonly testnet: true;
}, import("../../types/chain.js").ChainConfig<undefined>>;
//# sourceMappingURL=mandala.d.ts.map