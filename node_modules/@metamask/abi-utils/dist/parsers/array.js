"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.array = exports.getTupleType = exports.getArrayType = exports.isArrayType = void 0;
const utils_1 = require("@metamask/utils");
const errors_1 = require("../errors");
const packer_1 = require("../packer");
const utils_2 = require("../utils");
const fixed_bytes_1 = require("./fixed-bytes");
const tuple_1 = require("./tuple");
const ARRAY_REGEX = /^(?<type>.*)\[(?<length>\d*?)\]$/u;
const isArrayType = (type) => ARRAY_REGEX.test(type);
exports.isArrayType = isArrayType;
/**
 * Get the type of the array.
 *
 * @param type - The type to get the array type for.
 * @returns The array type.
 */
const getArrayType = (type) => {
    const match = type.match(ARRAY_REGEX);
    (0, utils_1.assert)(match?.groups?.type, new errors_1.ParserError(`Invalid array type. Expected an array type, but received "${type}".`));
    return [
        match.groups.type,
        match.groups.length ? parseInt(match.groups.length, 10) : undefined,
    ];
};
exports.getArrayType = getArrayType;
/**
 * Get the type of the array as a tuple type. This is used for encoding fixed
 * length arrays, which are encoded as tuples.
 *
 * @param innerType - The type of the array.
 * @param length - The length of the array.
 * @returns The tuple type.
 */
const getTupleType = (innerType, length) => {
    return `(${new Array(length).fill(innerType).join(',')})`;
};
exports.getTupleType = getTupleType;
exports.array = {
    /**
     * Check if the array is dynamic. Arrays are dynamic if the array does not
     * have a fixed length, or if the array type is dynamic.
     *
     * @param type - The type to check.
     * @returns Whether the array is dynamic.
     */
    isDynamic(type) {
        const [innerType, length] = (0, exports.getArrayType)(type);
        return (
        // `T[]` is dynamic for any `T`. `T[k]` is dynamic for any dynamic `T` and
        // any `k >= 0`.
        length === undefined || (0, packer_1.isDynamicParser)((0, packer_1.getParser)(innerType), innerType));
    },
    /**
     * Check if a type is an array type.
     *
     * @param type - The type to check.
     * @returns Whether the type is an array type.
     */
    isType(type) {
        return (0, exports.isArrayType)(type);
    },
    /**
     * Get the byte length of an encoded array. If the array is dynamic, this
     * returns 32, i.e., the length of the pointer to the array. If the array is
     * static, this returns the byte length of the resulting tuple type.
     *
     * @param type - The type to get the byte length for.
     * @returns The byte length of an encoded array.
     */
    getByteLength(type) {
        (0, utils_1.assert)((0, exports.isArrayType)(type), new errors_1.ParserError(`Expected an array type, but received "${type}".`));
        const [innerType, length] = (0, exports.getArrayType)(type);
        if (!(0, packer_1.isDynamicParser)(this, type) && length !== undefined) {
            return tuple_1.tuple.getByteLength((0, exports.getTupleType)(innerType, length));
        }
        return 32;
    },
    /**
     * Encode the given array to a byte array. If the array is static, this uses
     * the tuple encoder.
     *
     * @param args - The encoding arguments.
     * @param args.type - The type of the array.
     * @param args.buffer - The byte array to add to.
     * @param args.value - The array to encode.
     * @param args.packed - Whether to use non-standard packed encoding.
     * @param args.tight - Whether to use non-standard tight encoding.
     * @returns The bytes with the encoded array added to it.
     */
    encode({ type, buffer, value, packed, tight }) {
        const [arrayType, fixedLength] = (0, exports.getArrayType)(type);
        // Packed encoding does not support nested arrays.
        (0, utils_1.assert)(!packed || !(0, exports.isArrayType)(arrayType), new errors_1.ParserError(`Cannot pack nested arrays.`));
        // Tightly pack `T[]` where `T` is a dynamic type. This is not supported in
        // Solidity, but is commonly used in the Ethereum ecosystem.
        if (packed && (0, packer_1.isDynamicParser)((0, packer_1.getParser)(arrayType), arrayType)) {
            return (0, packer_1.pack)({
                types: new Array(value.length).fill(arrayType),
                values: value,
                byteArray: buffer,
                packed,
                arrayPacked: true,
                tight,
            });
        }
        if (fixedLength) {
            (0, utils_1.assert)(fixedLength === value.length, new errors_1.ParserError(`Array length does not match type length. Expected a length of ${fixedLength}, but received ${value.length}.`));
            // `T[k]` for any `T` and `k` is encoded as `(T[0], ..., T[k - 1])`.
            return tuple_1.tuple.encode({
                type: (0, exports.getTupleType)(arrayType, fixedLength),
                buffer,
                value,
                // In "tight" mode, we don't pad the values to 32 bytes if the value is
                // of type `bytesN`. This is an edge case in `ethereumjs-abi` that we
                // support to provide compatibility with it.
                packed: fixed_bytes_1.fixedBytes.isType(arrayType) && tight,
                tight,
            });
        }
        // For packed encoding, we don't need to encode the length of the array,
        // so we can just encode the values.
        if (packed) {
            return (0, packer_1.pack)({
                types: new Array(value.length).fill(arrayType),
                values: value,
                byteArray: buffer,
                // In "tight" mode, we don't pad the values to 32 bytes if the value is
                // of type `bytesN`. This is an edge case in `ethereumjs-abi` that we
                // support to provide compatibility with it.
                packed: fixed_bytes_1.fixedBytes.isType(arrayType) && tight,
                arrayPacked: true,
                tight,
            });
        }
        // `T[]` with `k` elements is encoded as `k (T[0], ..., T[k - 1])`. That
        // means that we just need to encode the length of the array, and then the
        // array itself. The pointer is encoded by the {@link pack} function.
        const arrayLength = (0, utils_2.padStart)((0, utils_1.numberToBytes)(value.length));
        return (0, packer_1.pack)({
            types: new Array(value.length).fill(arrayType),
            values: value,
            byteArray: (0, utils_1.concatBytes)([buffer, arrayLength]),
            packed,
            tight,
        });
    },
    /**
     * Decode an array from the given byte array.
     *
     * @param args - The decoding arguments.
     * @param args.type - The type of the array.
     * @param args.value - The byte array to decode.
     * @returns The decoded array.
     */
    decode({ type, value, ...rest }) {
        const [arrayType, fixedLength] = (0, exports.getArrayType)(type);
        if (fixedLength) {
            const result = tuple_1.tuple.decode({
                type: (0, exports.getTupleType)(arrayType, fixedLength),
                value,
                ...rest,
            });
            (0, utils_1.assert)(result.length === fixedLength, new errors_1.ParserError(`Array length does not match type length. Expected a length of ${fixedLength}, but received ${result.length}.`));
            return result;
        }
        const arrayLength = (0, utils_1.bytesToNumber)(value.subarray(0, 32));
        return (0, packer_1.unpack)(new Array(arrayLength).fill(arrayType), value.subarray(32));
    },
};
//# sourceMappingURL=array.js.map