"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fn = exports.getFunction = void 0;
const utils_1 = require("@metamask/utils");
const superstruct_1 = require("superstruct");
const errors_1 = require("../errors");
const fixed_bytes_1 = require("./fixed-bytes");
/**
 * A struct that represents a Solidity function. The value must be a hex string
 * or a byte array. The created value will always be an object with an `address`
 * and `selector` property.
 */
const FunctionStruct = (0, superstruct_1.coerce)((0, superstruct_1.object)({
    address: utils_1.StrictHexStruct,
    selector: utils_1.StrictHexStruct,
}), (0, superstruct_1.union)([utils_1.StrictHexStruct, (0, superstruct_1.instance)(Uint8Array)]), (value) => {
    const bytes = (0, utils_1.createBytes)(value);
    (0, utils_1.assert)(bytes.length === 24, new errors_1.ParserError(`Invalid Solidity function. Expected function to be 24 bytes long, but received ${bytes.length} bytes.`));
    return {
        address: (0, utils_1.bytesToHex)(bytes.subarray(0, 20)),
        selector: (0, utils_1.bytesToHex)(bytes.subarray(20, 24)),
    };
});
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
const getFunction = (input) => {
    const value = (0, superstruct_1.create)(input, FunctionStruct);
    return (0, utils_1.concatBytes)([(0, utils_1.hexToBytes)(value.address), (0, utils_1.hexToBytes)(value.selector)]);
};
exports.getFunction = getFunction;
exports.fn = {
    isDynamic: false,
    /**
     * Check if a type is a function type. Since `function` is a simple type, this
     * is just a check that the type is "function".
     *
     * @param type - The type to check.
     * @returns Whether the type is a function type.
     */
    isType: (type) => type === 'function',
    /**
     * Get the byte length of an encoded function. Since `function` is a simple
     * type, this always returns 32.
     *
     * Note that actual functions are only 24 bytes long, but the encoding of
     * the `function` type is always 32 bytes long.
     *
     * @returns The byte length of an encoded function.
     */
    getByteLength() {
        return 32;
    },
    /**
     * Encode the given function to a byte array.
     *
     * @param args - The encoding arguments.
     * @param args.buffer - The byte array to add to.
     * @param args.value - The function to encode.
     * @param args.packed - Whether to use packed encoding.
     * @param args.tight - Whether to use non-standard tight encoding.
     * @returns The bytes with the encoded function added to it.
     */
    encode({ buffer, value, packed, tight }) {
        const fnValue = (0, exports.getFunction)(value);
        // Functions are encoded as `bytes24`, so we use the fixedBytes parser to
        // encode the function.
        return fixed_bytes_1.fixedBytes.encode({
            type: 'bytes24',
            buffer,
            value: fnValue,
            packed,
            tight,
        });
    },
    /**
     * Decode the given byte array to a function.
     *
     * @param args - The decoding arguments.
     * @param args.value - The byte array to decode.
     * @returns The decoded function as a {@link SolidityFunction} object.
     */
    decode({ value }) {
        return {
            address: (0, utils_1.bytesToHex)(value.slice(0, 20)),
            selector: (0, utils_1.bytesToHex)(value.slice(20, 24)),
        };
    },
};
//# sourceMappingURL=function.js.map