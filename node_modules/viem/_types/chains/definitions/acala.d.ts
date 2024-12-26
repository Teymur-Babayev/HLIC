export declare const acala: import("../../types/utils.js").Assign<{
    readonly id: 787;
    readonly name: "Acala";
    readonly network: "acala";
    readonly nativeCurrency: {
        readonly name: "Acala";
        readonly symbol: "ACA";
        readonly decimals: 18;
    };
    readonly rpcUrls: {
        readonly public: {
            readonly http: readonly ["https://eth-rpc-acala.aca-api.network"];
            readonly webSocket: readonly ["wss://eth-rpc-acala.aca-api.network"];
        };
        readonly default: {
            readonly http: readonly ["https://eth-rpc-acala.aca-api.network"];
            readonly webSocket: readonly ["wss://eth-rpc-acala.aca-api.network"];
        };
    };
    readonly blockExplorers: {
        readonly default: {
            readonly name: "Acala Blockscout";
            readonly url: "https://blockscout.acala.network";
        };
    };
    readonly testnet: false;
}, import("../../types/chain.js").ChainConfig<undefined>>;
//# sourceMappingURL=acala.d.ts.map