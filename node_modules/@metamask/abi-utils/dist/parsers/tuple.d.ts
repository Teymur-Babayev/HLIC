import { Parser } from './parser';
/**
 * Get elements from a tuple type.
 *
 * @param type - The tuple type to get the types for.
 * @returns The elements of the tuple as string array.
 */
export declare const getTupleElements: (type: string) => string[];
export declare const tuple: Parser<unknown[]>;
