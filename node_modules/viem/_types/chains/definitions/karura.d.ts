export declare const karura: import("../../types/utils.js").Assign<{
    readonly id: 686;
    readonly name: "Karura";
    readonly network: "karura";
    readonly nativeCurrency: {
        readonly name: "Karura";
        readonly symbol: "KAR";
        readonly decimals: 18;
    };
    readonly rpcUrls: {
        readonly public: {
            readonly http: readonly ["https://eth-rpc-karura.aca-api.network"];
            readonly webSocket: readonly ["wss://eth-rpc-karura.aca-api.network"];
        };
        readonly default: {
            readonly http: readonly ["https://eth-rpc-karura.aca-api.network"];
            readonly webSocket: readonly ["wss://eth-rpc-karura.aca-api.network"];
        };
    };
    readonly blockExplorers: {
        readonly default: {
            readonly name: "Karura Blockscout";
            readonly url: "https://blockscout.karura.network";
        };
    };
    readonly testnet: false;
}, import("../../types/chain.js").ChainConfig<undefined>>;
//# sourceMappingURL=karura.d.ts.map