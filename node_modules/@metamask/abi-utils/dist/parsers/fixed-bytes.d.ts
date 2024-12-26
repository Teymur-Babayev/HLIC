import { BytesLike } from '@metamask/utils';
import { Parser } from './parser';
/**
 * Get the length of the specified type. If a length is not specified, or if the
 * length is out of range (0 < n <= 32), this will throw an error.
 *
 * @param type - The type to get the length for.
 * @returns The byte length of the type.
 */
export declare const getByteLength: (type: string) => number;
export declare const fixedBytes: Parser<BytesLike, Uint8Array>;
