import { Chain } from 'viem/chains';
import { C as ChainProviderFn } from '../index-e744bbc2.js';
import 'viem';

declare function publicProvider<TChain extends Chain = Chain>(): ChainProviderFn<TChain>;

export { publicProvider };
