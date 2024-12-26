"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.zkSyncSepoliaTestnet = void 0;
const defineChain_js_1 = require("../../utils/chain/defineChain.js");
const formatters_js_1 = require("../zksync/formatters.js");
const serializers_js_1 = require("../zksync/serializers.js");
exports.zkSyncSepoliaTestnet = (0, defineChain_js_1.defineChain)({
    id: 300,
    name: 'zkSync Sepolia Testnet',
    network: 'zksync-sepolia-testnet',
    nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
    rpcUrls: {
        default: {
            http: ['https://sepolia.era.zksync.dev'],
            webSocket: ['wss://sepolia.era.zksync.dev/ws'],
        },
        public: {
            http: ['https://sepolia.era.zksync.dev'],
            webSocket: ['wss://sepolia.era.zksync.dev/ws'],
        },
    },
    blockExplorers: {
        default: {
            name: 'zkExplorer',
            url: 'https://sepolia.explorer.zksync.io/',
        },
    },
    contracts: {
        multicall3: {
            address: '0xF9cda624FBC7e059355ce98a31693d299FACd963',
        },
    },
    testnet: true,
}, {
    serializers: serializers_js_1.serializersZkSync,
    formatters: formatters_js_1.formattersZkSync,
});
//# sourceMappingURL=zkSyncSepoliaTestnet.js.map