import nodeCrypto from "crypto";
import { ec as EC } from "elliptic";

const ec = new EC("secp256k1");
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const browserCrypto = global.crypto || (global as any).msCrypto || {};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const subtle = browserCrypto.subtle || (browserCrypto as any).webkitSubtle;

const EC_GROUP_ORDER = Buffer.from("fffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd0364141", "hex");
const ZERO32 = Buffer.alloc(32, 0);

export interface Ecies {
  iv: Buffer;
  ephemPublicKey: Buffer;
  ciphertext: Buffer;
  mac: Buffer;
}

function assert(condition: boolean, message: string) {
  if (!condition) {
    throw new Error(message || "Assertion failed");
  }
}
function isScalar(x: Buffer): boolean {
  return Buffer.isBuffer(x) && x.length === 32;
}

function isValidPrivateKey(privateKey: Buffer): boolean {
  if (!isScalar(privateKey)) {
    return false;
  }
  return (
    privateKey.compare(ZERO32) > 0 &&
    // > 0
    privateKey.compare(EC_GROUP_ORDER) < 0
  ); // < G
}

// Compare two buffers in constant time to prevent timing attacks.
function equalConstTime(b1: Buffer, b2: Buffer): boolean {
  if (b1.length !== b2.length) {
    return false;
  }
  let res = 0;
  for (let i = 0; i < b1.length; i++) {
    res |= b1[i] ^ b2[i]; // jshint ignore:line
  }

  return res === 0;
}

/* This must check if we're in the browser or
not, since the functions are different and does
not convert using browserify */
function randomBytes(size: number): Buffer {
  const arr = new Uint8Array(size);
  if (typeof browserCrypto.getRandomValues === "undefined") {
    return Buffer.from(nodeCrypto.randomBytes(size));
  }
  browserCrypto.getRandomValues(arr);

  return Buffer.from(arr);
}

async function sha512(msg: Buffer): Promise<Uint8Array> {
  if (subtle) {
    const hash = await subtle.digest("SHA-512", msg);
    const result = new Uint8Array(hash);
    return result;
  }
  const hash = nodeCrypto.createHash("sha512");
  const result = hash.update(msg).digest();
  return new Uint8Array(result);
}

type AesFunctionType = (iv: Buffer, key: Buffer, data: Buffer) => Promise<Buffer>;

function getAes(op: "encrypt" | "decrypt"): AesFunctionType {
  return async function (iv: Buffer, key: Buffer, data: Buffer) {
    if (subtle) {
      const importAlgorithm = {
        name: "AES-CBC",
      };
      const cryptoKey = await subtle.importKey("raw", key, importAlgorithm, false, [op]);
      const encAlgorithm = {
        name: "AES-CBC",
        iv,
      };
      const result = await subtle[op](encAlgorithm, cryptoKey, data);
      return Buffer.from(new Uint8Array(result));
    } else if (op === "encrypt") {
      const cipher = nodeCrypto.createCipheriv("aes-256-cbc", key, iv);
      const firstChunk = cipher.update(data);
      const secondChunk = cipher.final();
      return Buffer.concat([firstChunk, secondChunk]);
    } else if (op === "decrypt") {
      const decipher = nodeCrypto.createDecipheriv("aes-256-cbc", key, iv);
      const firstChunk = decipher.update(data);
      const secondChunk = decipher.final();
      return Buffer.concat([firstChunk, secondChunk]);
    }
    throw new Error(`Unsupported operation: ${op}`);
  };
}
const aesCbcEncrypt = getAes("encrypt");
const aesCbcDecrypt = getAes("decrypt");

async function hmacSha256Sign(key: Buffer, msg: Buffer): Promise<Buffer> {
  if (subtle) {
    const importAlgorithm = {
      name: "HMAC",
      hash: {
        name: "SHA-256",
      },
    };
    const cryptoKey = await subtle.importKey("raw", new Uint8Array(key), importAlgorithm, false, ["sign", "verify"]);
    const sig = await subtle.sign("HMAC", cryptoKey, msg);
    const result = Buffer.from(new Uint8Array(sig));
    return result;
  }
  const hmac = nodeCrypto.createHmac("sha256", Buffer.from(key));
  hmac.update(msg);
  const result = hmac.digest();
  return result;
}
async function hmacSha256Verify(key: Buffer, msg: Buffer, sig: Buffer): Promise<boolean> {
  const expectedSig = await hmacSha256Sign(key, msg);
  return equalConstTime(expectedSig, sig);
}

/**
 * Generate a new valid private key. Will use the window.crypto or window.msCrypto as source
 * depending on your browser.
 */
export const generatePrivate = function (): Buffer {
  let privateKey = randomBytes(32);
  while (!isValidPrivateKey(privateKey)) {
    privateKey = randomBytes(32);
  }
  return privateKey;
};

export const getPublic = function (privateKey: Buffer): Buffer {
  // This function has sync API so we throw an error immediately.
  assert(privateKey.length === 32, "Bad private key");
  assert(isValidPrivateKey(privateKey), "Bad private key");
  // XXX(Kagami): `elliptic.utils.encode` returns array for every
  // encoding except `hex`.
  return Buffer.from(ec.keyFromPrivate(privateKey).getPublic("array"));
};

/**
 * Get compressed version of public key.
 */
export const getPublicCompressed = function (privateKey: Buffer): Buffer {
  // jshint ignore:line
  assert(privateKey.length === 32, "Bad private key");
  assert(isValidPrivateKey(privateKey), "Bad private key");
  // See https://github.com/wanderer/secp256k1-node/issues/46
  const compressed = true;
  return Buffer.from(ec.keyFromPrivate(privateKey).getPublic(compressed, "array"));
};

// NOTE(Kagami): We don't use promise shim in Browser implementation
// because it's supported natively in new browsers (see
// <http://caniuse.com/#feat=promises>) and we can use only new browsers
// because of the WebCryptoAPI (see
// <http://caniuse.com/#feat=cryptography>).
export const sign = async function (privateKey: Buffer, msg: Buffer): Promise<Buffer> {
  assert(privateKey.length === 32, "Bad private key");
  assert(isValidPrivateKey(privateKey), "Bad private key");
  assert(msg.length > 0, "Message should not be empty");
  assert(msg.length <= 32, "Message is too long");
  return Buffer.from(
    ec
      .sign(msg, privateKey, {
        canonical: true,
      })
      .toDER()
  );
};

export const verify = async function (publicKey: Buffer, msg: Buffer, sig: Buffer): Promise<null> {
  assert(publicKey.length === 65 || publicKey.length === 33, "Bad public key");
  if (publicKey.length === 65) {
    assert(publicKey[0] === 4, "Bad public key");
  }
  if (publicKey.length === 33) {
    assert(publicKey[0] === 2 || publicKey[0] === 3, "Bad public key");
  }
  assert(msg.length > 0, "Message should not be empty");
  assert(msg.length <= 32, "Message is too long");
  if (ec.verify(msg, sig, publicKey)) {
    return null;
  }
  throw new Error("Bad signature");
};

export const derive = async function (privateKeyA: Buffer, publicKeyB: Buffer): Promise<Buffer> {
  assert(Buffer.isBuffer(privateKeyA), "Bad private key");
  assert(Buffer.isBuffer(publicKeyB), "Bad public key");
  assert(privateKeyA.length === 32, "Bad private key");
  assert(isValidPrivateKey(privateKeyA), "Bad private key");
  assert(publicKeyB.length === 65 || publicKeyB.length === 33, "Bad public key");
  if (publicKeyB.length === 65) {
    assert(publicKeyB[0] === 4, "Bad public key");
  }
  if (publicKeyB.length === 33) {
    assert(publicKeyB[0] === 2 || publicKeyB[0] === 3, "Bad public key");
  }
  const keyA = ec.keyFromPrivate(privateKeyA);
  const keyB = ec.keyFromPublic(publicKeyB);
  const Px = keyA.derive(keyB.getPublic()); // BN instance
  return Buffer.from(Px.toArray());
};

export const deriveUnpadded = derive;

export const derivePadded = async function (privateKeyA: Buffer, publicKeyB: Buffer): Promise<Buffer> {
  assert(Buffer.isBuffer(privateKeyA), "Bad private key");
  assert(Buffer.isBuffer(publicKeyB), "Bad public key");
  assert(privateKeyA.length === 32, "Bad private key");
  assert(isValidPrivateKey(privateKeyA), "Bad private key");
  assert(publicKeyB.length === 65 || publicKeyB.length === 33, "Bad public key");
  if (publicKeyB.length === 65) {
    assert(publicKeyB[0] === 4, "Bad public key");
  }
  if (publicKeyB.length === 33) {
    assert(publicKeyB[0] === 2 || publicKeyB[0] === 3, "Bad public key");
  }
  const keyA = ec.keyFromPrivate(privateKeyA);
  const keyB = ec.keyFromPublic(publicKeyB);
  const Px = keyA.derive(keyB.getPublic()); // BN instance
  return Buffer.from(Px.toString(16, 64), "hex");
};

export const encrypt = async function (publicKeyTo: Buffer, msg: Buffer, opts?: { iv?: Buffer; ephemPrivateKey?: Buffer }): Promise<Ecies> {
  opts = opts || {};

  let ephemPrivateKey = opts.ephemPrivateKey || randomBytes(32);
  // There is a very unlikely possibility that it is not a valid key
  while (!isValidPrivateKey(ephemPrivateKey)) {
    ephemPrivateKey = opts.ephemPrivateKey || randomBytes(32);
  }
  const ephemPublicKey = getPublic(ephemPrivateKey);
  const Px = await deriveUnpadded(ephemPrivateKey, publicKeyTo);
  const hash = await sha512(Px);
  const iv = opts.iv || randomBytes(16);
  const encryptionKey = hash.slice(0, 32);
  const macKey = hash.slice(32);
  const data = await aesCbcEncrypt(iv, Buffer.from(encryptionKey), msg);
  const ciphertext = data;
  const dataToMac = Buffer.concat([iv, ephemPublicKey, ciphertext]);
  const mac = await hmacSha256Sign(Buffer.from(macKey), dataToMac);
  return {
    iv,
    ephemPublicKey,
    ciphertext,
    mac,
  };
};

export const decrypt = async function (privateKey: Buffer, opts: Ecies, _padding?: boolean): Promise<Buffer> {
  const padding = _padding ?? false;
  const deriveLocal = padding ? derivePadded : deriveUnpadded;
  const Px = await deriveLocal(privateKey, opts.ephemPublicKey);
  const hash = await sha512(Px);
  const encryptionKey = hash.slice(0, 32);
  const macKey = hash.slice(32);
  const dataToMac = Buffer.concat([opts.iv, opts.ephemPublicKey, opts.ciphertext]);
  const macGood = await hmacSha256Verify(Buffer.from(macKey), dataToMac, opts.mac);
  if (!macGood && padding === false) {
    return decrypt(privateKey, opts, true);
  } else if (!macGood && padding === true) {
    throw new Error("bad MAC after trying padded");
  }
  const msg = await aesCbcDecrypt(opts.iv, Buffer.from(encryptionKey), opts.ciphertext);
  return Buffer.from(new Uint8Array(msg));
};
