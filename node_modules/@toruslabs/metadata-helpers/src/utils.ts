import { ec as EC } from "elliptic";
import { keccak256 as keccakHash } from "ethereum-cryptography/keccak";

export function keccak256(a: Buffer): Buffer {
  return Buffer.from(keccakHash(a));
}

export const ec = new EC("secp256k1");
