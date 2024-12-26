import { Parser } from './parsers';
import { TypeMap } from './types';
/**
 * Get the parser for the specified type.
 *
 * @param type - The type to get a parser for.
 * @returns The parser.
 * @throws If there is no parser for the specified type.
 */
export declare const getParser: (type: string) => Parser;
/**
 * Check if the specified parser is dynamic, for the provided types. This is
 * primarily used for parsing tuples, where a tuple can be dynamic based on the
 * types. For other parsers, it will simply use the set `isDynamic` value.
 *
 * @param parser - The parser to check.
 * @param type - The type to check the parser with.
 * @returns Whether the parser is dynamic.
 */
export declare const isDynamicParser: (parser: Parser, type: string) => boolean;
export declare type PackArgs<Type extends readonly string[]> = {
    /**
     * The types of the values to pack.
     */
    types: Type;
    /**
     * The values to pack.
     */
    values: TypeMap<Type, 'input'>;
    /**
     * Whether to use the non-standard packed mode.
     */
    packed?: boolean | undefined;
    /**
     * Whether to use tight packing mode. Only applicable when `packed` is true.
     * When true, the packed mode will not add any padding bytes. This matches
     * the packing behaviour of `ethereumjs-abi`, but is not standard.
     */
    tight?: boolean | undefined;
    /**
     * Whether to use the non-standard packed mode in "array" mode. This is
     * normally only used by the {@link array} parser.
     */
    arrayPacked?: boolean | undefined;
    /**
     * The byte array to encode the values into.
     */
    byteArray?: Uint8Array;
};
/**
 * Pack the provided values in a buffer, encoded with the specified types. If a
 * buffer is specified, the resulting value will be concatenated with the
 * buffer.
 *
 * @param args - The arguments object.
 * @param args.types - The types of the values to pack.
 * @param args.values - The values to pack.
 * @param args.packed - Whether to use the non-standard packed mode. Defaults to
 * `false`.
 * @param args.arrayPacked - Whether to use the non-standard packed mode for
 * arrays. Defaults to `false`.
 * @param args.byteArray - The byte array to encode the values into. Defaults to
 * an empty array.
 * @param args.tight - Whether to use tight packing mode. Only applicable when
 * `packed` is true. When true, the packed mode will not add any padding bytes.
 * This matches the packing behaviour of `ethereumjs-abi`, but is not standard.
 * @returns The resulting encoded buffer.
 */
export declare const pack: <Type extends readonly string[]>({ types, values, packed, tight, arrayPacked, byteArray, }: PackArgs<Type>) => Uint8Array;
export declare const unpack: <Type extends readonly string[], Output = TypeMap<Type, "output">>(types: Type, buffer: Uint8Array) => Output;
