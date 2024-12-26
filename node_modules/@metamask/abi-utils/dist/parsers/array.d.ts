import { Parser } from './parser';
export declare const isArrayType: (type: string) => boolean;
/**
 * Get the type of the array.
 *
 * @param type - The type to get the array type for.
 * @returns The array type.
 */
export declare const getArrayType: (type: string) => [type: string, length: number | undefined];
/**
 * Get the type of the array as a tuple type. This is used for encoding fixed
 * length arrays, which are encoded as tuples.
 *
 * @param innerType - The type of the array.
 * @param length - The length of the array.
 * @returns The tuple type.
 */
export declare const getTupleType: (innerType: string, length: number) => string;
export declare const array: Parser<unknown[]>;
