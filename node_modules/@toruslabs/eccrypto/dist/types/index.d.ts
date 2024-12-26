/// <reference types="node" />
export interface Ecies {
    iv: Buffer;
    ephemPublicKey: Buffer;
    ciphertext: Buffer;
    mac: Buffer;
}
/**
 * Generate a new valid private key. Will use the window.crypto or window.msCrypto as source
 * depending on your browser.
 */
export declare const generatePrivate: () => Buffer;
export declare const getPublic: (privateKey: Buffer) => Buffer;
/**
 * Get compressed version of public key.
 */
export declare const getPublicCompressed: (privateKey: Buffer) => Buffer;
export declare const sign: (privateKey: Buffer, msg: Buffer) => Promise<Buffer>;
export declare const verify: (publicKey: Buffer, msg: Buffer, sig: Buffer) => Promise<null>;
export declare const derive: (privateKeyA: Buffer, publicKeyB: Buffer) => Promise<Buffer>;
export declare const deriveUnpadded: (privateKeyA: Buffer, publicKeyB: Buffer) => Promise<Buffer>;
export declare const derivePadded: (privateKeyA: Buffer, publicKeyB: Buffer) => Promise<Buffer>;
export declare const encrypt: (publicKeyTo: Buffer, msg: Buffer, opts?: {
    iv?: Buffer;
    ephemPrivateKey?: Buffer;
}) => Promise<Ecies>;
export declare const decrypt: (privateKey: Buffer, opts: Ecies, _padding?: boolean) => Promise<Buffer>;
