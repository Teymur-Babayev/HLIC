import { Chain } from 'viem/chains';
import { C as ChainProviderFn } from '../index-e744bbc2.js';
import 'viem';

type AlchemyProviderConfig = {
    /** Your Alchemy API key from the [Alchemy Dashboard](https://dashboard.alchemyapi.io/). */
    apiKey: string;
};
declare function alchemyProvider<TChain extends Chain = Chain>({ apiKey, }: AlchemyProviderConfig): ChainProviderFn<TChain>;

export { AlchemyProviderConfig, alchemyProvider };
