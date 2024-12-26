import { Parser } from './parser';
/**
 * A boolean-like value. This can be a boolean literal, or "true" or "false".
 */
export declare type BooleanLike = 'true' | 'false' | boolean;
/**
 * Normalize a boolean value. This accepts the boolean as:
 *
 * - A boolean literal.
 * - The string "true" or "false".
 *
 * @param value - The value to get a boolean for.
 * @returns The parsed boolean value. This is `BigInt(1)` for truthy values, or
 * `BigInt(0)` for falsy values.
 */
export declare const getBooleanValue: (value: BooleanLike) => bigint;
export declare const bool: Parser<BooleanLike, boolean>;
