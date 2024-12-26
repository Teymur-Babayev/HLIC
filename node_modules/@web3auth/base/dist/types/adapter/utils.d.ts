import { OPENLOGIN_NETWORK_TYPE } from "@toruslabs/openlogin-utils";
import { ChainNamespaceType } from "../chain/IChainInterface";
export declare const checkIfTokenIsExpired: (token: string) => boolean;
export declare const signChallenge: (payload: Record<string, string | number>, chainNamespace: ChainNamespaceType) => Promise<string>;
export declare const verifySignedChallenge: (chainNamespace: ChainNamespaceType, signedMessage: string, challenge: string, issuer: string, sessionTime: number, clientId?: string, web3AuthNetwork?: OPENLOGIN_NETWORK_TYPE) => Promise<string>;
export declare const getSavedToken: (userAddress: string, issuer: string) => string;
export declare const saveToken: (userAddress: string, issuer: string, token: string) => void;
export declare const clearToken: (userAddress: string, issuer: string) => void;
