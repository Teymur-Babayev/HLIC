export declare const bitTorrentTestnet: import("../../types/utils.js").Assign<{
    readonly id: 1028;
    readonly name: "BitTorrent Chain Testnet";
    readonly network: "bittorrent-chain-testnet";
    readonly nativeCurrency: {
        readonly name: "BitTorrent";
        readonly symbol: "BTT";
        readonly decimals: 18;
    };
    readonly rpcUrls: {
        readonly default: {
            readonly http: readonly ["https://testrpc.bittorrentchain.io"];
        };
        readonly public: {
            readonly http: readonly ["https://testrpc.bittorrentchain.io"];
        };
    };
    readonly blockExplorers: {
        readonly etherscan: {
            readonly name: "Bttcscan";
            readonly url: "https://testnet.bttcscan.com";
        };
        readonly default: {
            readonly name: "Bttcscan";
            readonly url: "https://testnet.bttcscan.com";
        };
    };
    readonly testnet: true;
}, import("../../types/chain.js").ChainConfig<undefined>>;
//# sourceMappingURL=bitTorrentTestnet.d.ts.map