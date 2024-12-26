import * as abitype from 'abitype';
import * as viem from 'viem';
import { Chain } from 'viem/chains';

declare const testChains: (Chain | {
    readonly id: 1;
    readonly network: "homestead";
    readonly name: "Ethereum";
    readonly nativeCurrency: {
        readonly name: "Ether";
        readonly symbol: "ETH";
        readonly decimals: 18;
    };
    readonly rpcUrls: {
        readonly alchemy: {
            readonly http: readonly ["https://eth-mainnet.g.alchemy.com/v2"];
            readonly webSocket: readonly ["wss://eth-mainnet.g.alchemy.com/v2"];
        };
        readonly infura: {
            readonly http: readonly ["https://mainnet.infura.io/v3"];
            readonly webSocket: readonly ["wss://mainnet.infura.io/ws/v3"];
        };
        readonly default: {
            readonly http: readonly ["https://cloudflare-eth.com"];
        };
        readonly public: {
            readonly http: readonly ["https://cloudflare-eth.com"];
        };
    };
    readonly blockExplorers: {
        readonly etherscan: {
            readonly name: "Etherscan";
            readonly url: "https://etherscan.io";
        };
        readonly default: {
            readonly name: "Etherscan";
            readonly url: "https://etherscan.io";
        };
    };
    readonly contracts: {
        readonly ensRegistry: {
            readonly address: "0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e";
        };
        readonly ensUniversalResolver: {
            readonly address: "0xc0497E381f536Be9ce14B0dD3817cBcAe57d2F62";
            readonly blockCreated: 16966585;
        };
        readonly multicall3: {
            readonly address: "0xca11bde05977b3631167028862be2a173976ca11";
            readonly blockCreated: 14353601;
        };
    };
} | {
    readonly id: 5;
    readonly network: "goerli";
    readonly name: "Goerli";
    readonly nativeCurrency: {
        readonly name: "Goerli Ether";
        readonly symbol: "ETH";
        readonly decimals: 18;
    };
    readonly rpcUrls: {
        readonly alchemy: {
            readonly http: readonly ["https://eth-goerli.g.alchemy.com/v2"];
            readonly webSocket: readonly ["wss://eth-goerli.g.alchemy.com/v2"];
        };
        readonly infura: {
            readonly http: readonly ["https://goerli.infura.io/v3"];
            readonly webSocket: readonly ["wss://goerli.infura.io/ws/v3"];
        };
        readonly default: {
            readonly http: readonly ["https://rpc.ankr.com/eth_goerli"];
        };
        readonly public: {
            readonly http: readonly ["https://rpc.ankr.com/eth_goerli"];
        };
    };
    readonly blockExplorers: {
        readonly etherscan: {
            readonly name: "Etherscan";
            readonly url: "https://goerli.etherscan.io";
        };
        readonly default: {
            readonly name: "Etherscan";
            readonly url: "https://goerli.etherscan.io";
        };
    };
    readonly contracts: {
        readonly ensRegistry: {
            readonly address: "0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e";
        };
        readonly ensUniversalResolver: {
            readonly address: "0x56522D00C410a43BFfDF00a9A569489297385790";
            readonly blockCreated: 8765204;
        };
        readonly multicall3: {
            readonly address: "0xca11bde05977b3631167028862be2a173976ca11";
            readonly blockCreated: 6507670;
        };
    };
    readonly testnet: true;
} | {
    readonly id: 10;
    readonly name: "Optimism";
    readonly network: "optimism";
    readonly nativeCurrency: {
        readonly name: "Ether";
        readonly symbol: "ETH";
        readonly decimals: 18;
    };
    readonly rpcUrls: {
        readonly alchemy: {
            readonly http: readonly ["https://opt-mainnet.g.alchemy.com/v2"];
            readonly webSocket: readonly ["wss://opt-mainnet.g.alchemy.com/v2"];
        };
        readonly infura: {
            readonly http: readonly ["https://optimism-mainnet.infura.io/v3"];
            readonly webSocket: readonly ["wss://optimism-mainnet.infura.io/ws/v3"];
        };
        readonly default: {
            readonly http: readonly ["https://mainnet.optimism.io"];
        };
        readonly public: {
            readonly http: readonly ["https://mainnet.optimism.io"];
        };
    };
    readonly blockExplorers: {
        readonly etherscan: {
            readonly name: "Etherscan";
            readonly url: "https://optimistic.etherscan.io";
        };
        readonly default: {
            readonly name: "Optimism Explorer";
            readonly url: "https://explorer.optimism.io";
        };
    };
    readonly contracts: {
        readonly multicall3: {
            readonly address: "0xca11bde05977b3631167028862be2a173976ca11";
            readonly blockCreated: 4286263;
        };
    };
} | {
    readonly id: 137;
    readonly name: "Polygon";
    readonly network: "matic";
    readonly nativeCurrency: {
        readonly name: "MATIC";
        readonly symbol: "MATIC";
        readonly decimals: 18;
    };
    readonly rpcUrls: {
        readonly alchemy: {
            readonly http: readonly ["https://polygon-mainnet.g.alchemy.com/v2"];
            readonly webSocket: readonly ["wss://polygon-mainnet.g.alchemy.com/v2"];
        };
        readonly infura: {
            readonly http: readonly ["https://polygon-mainnet.infura.io/v3"];
            readonly webSocket: readonly ["wss://polygon-mainnet.infura.io/ws/v3"];
        };
        readonly default: {
            readonly http: readonly ["https://polygon-rpc.com"];
        };
        readonly public: {
            readonly http: readonly ["https://polygon-rpc.com"];
        };
    };
    readonly blockExplorers: {
        readonly etherscan: {
            readonly name: "PolygonScan";
            readonly url: "https://polygonscan.com";
        };
        readonly default: {
            readonly name: "PolygonScan";
            readonly url: "https://polygonscan.com";
        };
    };
    readonly contracts: {
        readonly multicall3: {
            readonly address: "0xca11bde05977b3631167028862be2a173976ca11";
            readonly blockCreated: 25770160;
        };
    };
})[];
declare function getWalletClients(): {
    chain: Chain;
    key: string;
    name: string;
    pollingInterval: number;
    request: viem.EIP1193RequestFn<viem.WalletRpcSchema>;
    transport: viem.TransportConfig<"custom", viem.EIP1193RequestFn> & ((...args: any) => Promise<any>);
    type: string;
    uid: string;
    addChain: (args: viem.AddChainParameters) => Promise<void>;
    deployContract: <TAbi extends abitype.Abi | readonly unknown[], TChainOverride extends Chain | undefined>(args: viem.DeployContractParameters<TAbi, Chain, {
        address: `0x${string}`;
        type: "json-rpc";
    }, TChainOverride>) => Promise<`0x${string}`>;
    getAddresses: () => Promise<viem.GetAddressesReturnType>;
    getChainId: () => Promise<number>;
    getPermissions: () => Promise<viem.GetPermissionsReturnType>;
    requestAddresses: () => Promise<viem.RequestAddressesReturnType>;
    requestPermissions: (args: {
        [x: string]: Record<string, any>;
        eth_accounts: Record<string, any>;
    }) => Promise<viem.RequestPermissionsReturnType>;
    sendTransaction: <TChainOverride_1 extends Chain | undefined>(args: viem.SendTransactionParameters<Chain, {
        address: `0x${string}`;
        type: "json-rpc";
    }, TChainOverride_1>) => Promise<`0x${string}`>;
    signMessage: (args: viem.SignMessageParameters<{
        address: `0x${string}`;
        type: "json-rpc";
    }>) => Promise<`0x${string}`>;
    signTypedData: <TTypedData extends {
        [x: string]: readonly abitype.TypedDataParameter[];
        [x: `string[${string}]`]: undefined;
        [x: `function[${string}]`]: undefined;
        [x: `address[${string}]`]: undefined;
        [x: `bool[${string}]`]: undefined;
        [x: `bytes[${string}]`]: undefined;
        [x: `bytes16[${string}]`]: undefined;
        [x: `bytes32[${string}]`]: undefined;
        [x: `bytes1[${string}]`]: undefined;
        [x: `bytes31[${string}]`]: undefined;
        [x: `bytes30[${string}]`]: undefined;
        [x: `bytes29[${string}]`]: undefined;
        [x: `bytes28[${string}]`]: undefined;
        [x: `bytes27[${string}]`]: undefined;
        [x: `bytes26[${string}]`]: undefined;
        [x: `bytes25[${string}]`]: undefined;
        [x: `bytes24[${string}]`]: undefined;
        [x: `bytes23[${string}]`]: undefined;
        [x: `bytes22[${string}]`]: undefined;
        [x: `bytes21[${string}]`]: undefined;
        [x: `bytes20[${string}]`]: undefined;
        [x: `bytes19[${string}]`]: undefined;
        [x: `bytes18[${string}]`]: undefined;
        [x: `bytes17[${string}]`]: undefined;
        [x: `bytes2[${string}]`]: undefined;
        [x: `bytes15[${string}]`]: undefined;
        [x: `bytes14[${string}]`]: undefined;
        [x: `bytes13[${string}]`]: undefined;
        [x: `bytes12[${string}]`]: undefined;
        [x: `bytes11[${string}]`]: undefined;
        [x: `bytes10[${string}]`]: undefined;
        [x: `bytes9[${string}]`]: undefined;
        [x: `bytes8[${string}]`]: undefined;
        [x: `bytes7[${string}]`]: undefined;
        [x: `bytes6[${string}]`]: undefined;
        [x: `bytes5[${string}]`]: undefined;
        [x: `bytes4[${string}]`]: undefined;
        [x: `bytes3[${string}]`]: undefined;
        [x: `int[${string}]`]: undefined;
        [x: `int16[${string}]`]: undefined;
        [x: `int32[${string}]`]: undefined;
        [x: `int24[${string}]`]: undefined;
        [x: `int8[${string}]`]: undefined;
        [x: `int40[${string}]`]: undefined;
        [x: `int48[${string}]`]: undefined;
        [x: `int56[${string}]`]: undefined;
        [x: `int64[${string}]`]: undefined;
        [x: `int72[${string}]`]: undefined;
        [x: `int80[${string}]`]: undefined;
        [x: `int88[${string}]`]: undefined;
        [x: `int96[${string}]`]: undefined;
        [x: `int104[${string}]`]: undefined;
        [x: `int112[${string}]`]: undefined;
        [x: `int120[${string}]`]: undefined;
        [x: `int128[${string}]`]: undefined;
        [x: `int136[${string}]`]: undefined;
        [x: `int144[${string}]`]: undefined;
        [x: `int152[${string}]`]: undefined;
        [x: `int160[${string}]`]: undefined;
        [x: `int168[${string}]`]: undefined;
        [x: `int176[${string}]`]: undefined;
        [x: `int184[${string}]`]: undefined;
        [x: `int192[${string}]`]: undefined;
        [x: `int200[${string}]`]: undefined;
        [x: `int208[${string}]`]: undefined;
        [x: `int216[${string}]`]: undefined;
        [x: `int224[${string}]`]: undefined;
        [x: `int232[${string}]`]: undefined;
        [x: `int240[${string}]`]: undefined;
        [x: `int248[${string}]`]: undefined;
        [x: `int256[${string}]`]: undefined;
        [x: `uint[${string}]`]: undefined;
        [x: `uint16[${string}]`]: undefined;
        [x: `uint32[${string}]`]: undefined;
        [x: `uint24[${string}]`]: undefined;
        [x: `uint8[${string}]`]: undefined;
        [x: `uint40[${string}]`]: undefined;
        [x: `uint48[${string}]`]: undefined;
        [x: `uint56[${string}]`]: undefined;
        [x: `uint64[${string}]`]: undefined;
        [x: `uint72[${string}]`]: undefined;
        [x: `uint80[${string}]`]: undefined;
        [x: `uint88[${string}]`]: undefined;
        [x: `uint96[${string}]`]: undefined;
        [x: `uint104[${string}]`]: undefined;
        [x: `uint112[${string}]`]: undefined;
        [x: `uint120[${string}]`]: undefined;
        [x: `uint128[${string}]`]: undefined;
        [x: `uint136[${string}]`]: undefined;
        [x: `uint144[${string}]`]: undefined;
        [x: `uint152[${string}]`]: undefined;
        [x: `uint160[${string}]`]: undefined;
        [x: `uint168[${string}]`]: undefined;
        [x: `uint176[${string}]`]: undefined;
        [x: `uint184[${string}]`]: undefined;
        [x: `uint192[${string}]`]: undefined;
        [x: `uint200[${string}]`]: undefined;
        [x: `uint208[${string}]`]: undefined;
        [x: `uint216[${string}]`]: undefined;
        [x: `uint224[${string}]`]: undefined;
        [x: `uint232[${string}]`]: undefined;
        [x: `uint240[${string}]`]: undefined;
        [x: `uint248[${string}]`]: undefined;
        [x: `uint256[${string}]`]: undefined;
        string?: undefined;
        address?: undefined;
        bool?: undefined;
        bytes?: undefined;
        bytes16?: undefined;
        bytes32?: undefined;
        bytes1?: undefined;
        bytes31?: undefined;
        bytes30?: undefined;
        bytes29?: undefined;
        bytes28?: undefined;
        bytes27?: undefined;
        bytes26?: undefined;
        bytes25?: undefined;
        bytes24?: undefined;
        bytes23?: undefined;
        bytes22?: undefined;
        bytes21?: undefined;
        bytes20?: undefined;
        bytes19?: undefined;
        bytes18?: undefined;
        bytes17?: undefined;
        bytes2?: undefined;
        bytes15?: undefined;
        bytes14?: undefined;
        bytes13?: undefined;
        bytes12?: undefined;
        bytes11?: undefined;
        bytes10?: undefined;
        bytes9?: undefined;
        bytes8?: undefined;
        bytes7?: undefined;
        bytes6?: undefined;
        bytes5?: undefined;
        bytes4?: undefined;
        bytes3?: undefined;
        int16?: undefined;
        int32?: undefined;
        int24?: undefined;
        int8?: undefined;
        int40?: undefined;
        int48?: undefined;
        int56?: undefined;
        int64?: undefined;
        int72?: undefined;
        int80?: undefined;
        int88?: undefined;
        int96?: undefined;
        int104?: undefined;
        int112?: undefined;
        int120?: undefined;
        int128?: undefined;
        int136?: undefined;
        int144?: undefined;
        int152?: undefined;
        int160?: undefined;
        int168?: undefined;
        int176?: undefined;
        int184?: undefined;
        int192?: undefined;
        int200?: undefined;
        int208?: undefined;
        int216?: undefined;
        int224?: undefined;
        int232?: undefined;
        int240?: undefined;
        int248?: undefined;
        int256?: undefined;
        uint16?: undefined;
        uint32?: undefined;
        uint24?: undefined;
        uint8?: undefined;
        uint40?: undefined;
        uint48?: undefined;
        uint56?: undefined;
        uint64?: undefined;
        uint72?: undefined;
        uint80?: undefined;
        uint88?: undefined;
        uint96?: undefined;
        uint104?: undefined;
        uint112?: undefined;
        uint120?: undefined;
        uint128?: undefined;
        uint136?: undefined;
        uint144?: undefined;
        uint152?: undefined;
        uint160?: undefined;
        uint168?: undefined;
        uint176?: undefined;
        uint184?: undefined;
        uint192?: undefined;
        uint200?: undefined;
        uint208?: undefined;
        uint216?: undefined;
        uint224?: undefined;
        uint232?: undefined;
        uint240?: undefined;
        uint248?: undefined;
        uint256?: undefined;
    } | {
        [key: string]: unknown;
    }, TPrimaryType extends string>(args: viem.SignTypedDataParameters<TTypedData, TPrimaryType, {
        address: `0x${string}`;
        type: "json-rpc";
    }>) => Promise<`0x${string}`>;
    switchChain: (args: viem.SwitchChainParameters) => Promise<void>;
    watchAsset: (args: viem.WatchAssetParams) => Promise<boolean>;
    writeContract: <TAbi_1 extends abitype.Abi | readonly unknown[], TFunctionName extends string, TChainOverride_2 extends Chain | undefined>(args: viem.WriteContractParameters<TAbi_1, TFunctionName, Chain, {
        address: `0x${string}`;
        type: "json-rpc";
    }, TChainOverride_2>) => Promise<`0x${string}`>;
    account: {
        address: `0x${string}`;
        type: "json-rpc";
    };
}[];

export { getWalletClients, testChains };
