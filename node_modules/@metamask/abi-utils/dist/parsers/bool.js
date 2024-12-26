"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bool = exports.getBooleanValue = void 0;
const utils_1 = require("@metamask/utils");
const superstruct_1 = require("superstruct");
const errors_1 = require("../errors");
const number_1 = require("./number");
const BooleanCoercer = (0, superstruct_1.coerce)((0, superstruct_1.boolean)(), (0, superstruct_1.union)([(0, superstruct_1.literal)('true'), (0, superstruct_1.literal)('false')]), (value) => value === 'true');
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
const getBooleanValue = (value) => {
    try {
        const booleanValue = (0, superstruct_1.create)(value, BooleanCoercer);
        if (booleanValue) {
            return BigInt(1);
        }
        return BigInt(0);
    }
    catch {
        throw new errors_1.ParserError(`Invalid boolean value. Expected a boolean literal, or the string "true" or "false", but received "${value}".`);
    }
};
exports.getBooleanValue = getBooleanValue;
exports.bool = {
    isDynamic: false,
    /**
     * Get if the given value is a valid boolean type. Since `bool` is a simple
     * type, this is just a check that the value is "bool".
     *
     * @param type - The type to check.
     * @returns Whether the type is a valid boolean type.
     */
    isType: (type) => type === 'bool',
    /**
     * Get the byte length of an encoded boolean. Since `bool` is a simple
     * type, this always returns 32.
     *
     * Note that actual booleans are only 1 byte long, but the encoding of
     * the `bool` type is always 32 bytes long.
     *
     * @returns The byte length of an encoded boolean.
     */
    getByteLength() {
        return 32;
    },
    /**
     * Encode the given boolean to a byte array.
     *
     * @param args - The encoding arguments.
     * @param args.buffer - The byte array to add to.
     * @param args.value - The boolean to encode.
     * @param args.packed - Whether the value is packed.
     * @param args.tight - Whether to use non-standard tight encoding.
     * @returns The bytes with the encoded boolean added to it.
     */
    encode({ buffer, value, packed, tight }) {
        const booleanValue = (0, exports.getBooleanValue)(value);
        // For packed encoding, we add a single byte (`0x00` or `0x01`) to the byte
        // array.
        if (packed) {
            return (0, utils_1.concatBytes)([buffer, (0, utils_1.bigIntToBytes)(booleanValue)]);
        }
        // Booleans are encoded as 32-byte integers, so we use the number parser
        // to encode the boolean value.
        return number_1.number.encode({
            type: 'uint256',
            buffer,
            value: booleanValue,
            packed,
            tight,
        });
    },
    /**
     * Decode the given byte array to a boolean.
     *
     * @param args - The decoding arguments.
     * @returns The decoded boolean.
     */
    decode(args) {
        // Booleans are encoded as 32-byte integers, so we use the number parser
        // to decode the boolean value.
        return number_1.number.decode({ ...args, type: 'uint256' }) === BigInt(1);
    },
};
//# sourceMappingURL=bool.js.map