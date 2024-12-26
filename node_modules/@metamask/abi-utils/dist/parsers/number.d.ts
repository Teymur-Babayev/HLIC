import { NumberLike } from '@metamask/utils';
import { Parser } from './parser';
/**
 * Check if a number type is signed.
 *
 * @param type - The type to check.
 * @returns Whether the type is signed.
 */
export declare const isSigned: (type: string) => boolean;
/**
 * Get the length of the specified type. If a length is not specified, if the
 * length is out of range (8 <= n <= 256), or if the length is not a multiple of
 * 8, this will throw an error.
 *
 * @param type - The type to get the length for.
 * @returns The bit length of the type.
 */
export declare const getLength: (type: string) => number;
/**
 * Assert that the byte length of the given value is in range for the given
 * number type.
 *
 * @param value - The value to check.
 * @param type - The type of the value.
 * @throws If the value is out of range for the type.
 */
export declare const assertNumberLength: (value: bigint, type: string) => void;
/**
 * Normalize a `bigint` value. This accepts the value as:
 *
 * - A `bigint`.
 * - A `number`.
 * - A decimal string, i.e., a string that does not start with "0x".
 * - A hexadecimal string, i.e., a string that starts with "0x".
 *
 * @param value - The number-like value to parse.
 * @returns The value parsed as bigint.
 */
export declare const getBigInt: (value: NumberLike) => bigint;
export declare const number: Parser<NumberLike, bigint>;
