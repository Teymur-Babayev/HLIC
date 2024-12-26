export declare const bitTorrent: import("../../types/utils.js").Assign<{
    readonly id: 199;
    readonly name: "BitTorrent";
    readonly network: "bittorrent-chain-mainnet";
    readonly nativeCurrency: {
        readonly name: "BitTorrent";
        readonly symbol: "BTT";
        readonly decimals: 18;
    };
    readonly rpcUrls: {
        readonly default: {
            readonly http: readonly ["https://rpc.bittorrentchain.io"];
        };
        readonly public: {
            readonly http: readonly ["https://rpc.bittorrentchain.io"];
        };
    };
    readonly blockExplorers: {
        readonly etherscan: {
            readonly name: "Bttcscan";
            readonly url: "https://bttcscan.com";
        };
        readonly default: {
            readonly name: "Bttcscan";
            readonly url: "https://bttcscan.com";
        };
    };
}, import("../../types/chain.js").ChainConfig<undefined>>;
//# sourceMappingURL=bitTorrent.d.ts.map