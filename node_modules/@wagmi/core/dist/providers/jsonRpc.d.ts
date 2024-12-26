import { Chain } from 'viem/chains';
import { C as ChainProviderFn } from '../index-e744bbc2.js';
import 'viem';

type JsonRpcProviderConfig = {
    rpc: (chain: Chain) => {
        http: string;
        webSocket?: string;
    } | null;
};
declare function jsonRpcProvider<TChain extends Chain = Chain>({ rpc, }: JsonRpcProviderConfig): ChainProviderFn<TChain>;

export { JsonRpcProviderConfig, jsonRpcProvider };
