import { Parser } from './parser';
/**
 * A Solidity function-like value. This can be a hex string, a byte array, or a
 * {@link SolidityFunction} object.
 */
export declare type FunctionLike = string | Uint8Array | SolidityFunction;
/**
 * A Solidity function, i.e., the address of a contract and the selector of a
 * function within that contract.
 */
export declare type SolidityFunction = {
    /**
     * The address of the contract. Must be a 40-character long hex string
     * (excluding the "0x"-prefix).
     */
    address: string;
    /**
     * The selector of the function. Must be an 8-character long hex string
     * (excluding the "0x"-prefix).
     */
    selector: string;
};
/**
 * Normalize a function. This accepts the function as:
 *
 * - A {@link SolidityFunction} object.
 * - A hexadecimal string.
 * - A byte array.
 *
 * @param input - The function-like input.
 * @returns The function as buffer.
 */
export declare const getFunction: (input: FunctionLike) => Uint8Array;
export declare const fn: Parser<FunctionLike, SolidityFunction>;
