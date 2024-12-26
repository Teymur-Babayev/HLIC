import { BytesLike } from '@metamask/utils';
import { Parser } from './parser';
/**
 * Normalize an address value. This accepts the address as:
 *
 * - A hex string starting with the `0x` prefix.
 * - A byte array (`Uint8Array` or `Buffer`).
 *
 * It checks that the address is 20 bytes long.
 *
 * @param value - The value to normalize.
 * @returns The normalized address as `Uint8Array`.
 */
export declare const getAddress: (value: BytesLike) => Uint8Array;
export declare const address: Parser<BytesLike, string>;
