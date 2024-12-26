"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.number = exports.getBigInt = exports.assertNumberLength = exports.getLength = exports.isSigned = void 0;
const utils_1 = require("@metamask/utils");
const errors_1 = require("../errors");
const utils_2 = require("../utils");
const NUMBER_REGEX = /^u?int(?<length>[0-9]*)?$/u;
/**
 * Check if a number type is signed.
 *
 * @param type - The type to check.
 * @returns Whether the type is signed.
 */
const isSigned = (type) => {
    return !type.startsWith('u');
};
exports.isSigned = isSigned;
/**
 * Get the length of the specified type. If a length is not specified, if the
 * length is out of range (8 <= n <= 256), or if the length is not a multiple of
 * 8, this will throw an error.
 *
 * @param type - The type to get the length for.
 * @returns The bit length of the type.
 */
const getLength = (type) => {
    if (type === 'int' || type === 'uint') {
        return 256;
    }
    const match = type.match(NUMBER_REGEX);
    (0, utils_1.assert)(match?.groups?.length, new errors_1.ParserError(`Invalid number type. Expected a number type, but received "${type}".`));
    const length = parseInt(match.groups.length, 10);
    (0, utils_1.assert)(length >= 8 && length <= 256, new errors_1.ParserError(`Invalid number length. Expected a number between 8 and 256, but received "${type}".`));
    (0, utils_1.assert)(length % 8 === 0, new errors_1.ParserError(`Invalid number length. Expected a multiple of 8, but received "${type}".`));
    return length;
};
exports.getLength = getLength;
/**
 * Assert that the byte length of the given value is in range for the given
 * number type.
 *
 * @param value - The value to check.
 * @param type - The type of the value.
 * @throws If the value is out of range for the type.
 */
const assertNumberLength = (value, type) => {
    const length = (0, exports.getLength)(type);
    const maxValue = BigInt(2) ** BigInt(length - ((0, exports.isSigned)(type) ? 1 : 0)) - BigInt(1);
    if ((0, exports.isSigned)(type)) {
        // Signed types must be in the range of `-(2^(length - 1))` to
        // `2^(length - 1) - 1`.
        (0, utils_1.assert)(value >= -(maxValue + BigInt(1)) && value <= maxValue, new errors_1.ParserError(`Number "${value}" is out of range for type "${type}".`));
        return;
    }
    // Unsigned types must be in the range of `0` to `2^length - 1`.
    (0, utils_1.assert)(value <= maxValue, new errors_1.ParserError(`Number "${value}" is out of range for type "${type}".`));
};
exports.assertNumberLength = assertNumberLength;
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
const getBigInt = (value) => {
    try {
        return (0, utils_1.createBigInt)(value);
    }
    catch {
        throw new errors_1.ParserError(`Invalid number. Expected a valid number value, but received "${value}".`);
    }
};
exports.getBigInt = getBigInt;
exports.number = {
    isDynamic: false,
    /**
     * Check if a type is a number type.
     *
     * @param type - The type to check.
     * @returns Whether the type is a number type.
     */
    isType(type) {
        return NUMBER_REGEX.test(type);
    },
    /**
     * Get the byte length of an encoded number type. Since `int` and `uint` are
     * simple types, this will always return 32.
     *
     * @returns The byte length of the type.
     */
    getByteLength() {
        return 32;
    },
    /**
     * Encode a number value.
     *
     * @param args - The arguments to encode.
     * @param args.type - The type of the value.
     * @param args.buffer - The byte array to add to.
     * @param args.value - The value to encode.
     * @param args.packed - Whether to use packed encoding.
     * @returns The bytes with the encoded value added to it.
     */
    encode({ type, buffer, value, packed }) {
        const bigIntValue = (0, exports.getBigInt)(value);
        (0, exports.assertNumberLength)(bigIntValue, type);
        if ((0, exports.isSigned)(type)) {
            // For packed encoding, the value is padded to the length of the type, and
            // then added to the byte array.
            if (packed) {
                const length = (0, exports.getLength)(type) / 8;
                return (0, utils_1.concatBytes)([buffer, (0, utils_1.signedBigIntToBytes)(bigIntValue, length)]);
            }
            return (0, utils_1.concatBytes)([
                buffer,
                (0, utils_2.padStart)((0, utils_1.signedBigIntToBytes)(bigIntValue, 32)),
            ]);
        }
        // For packed encoding, the value is padded to the length of the type, and
        // then added to the byte array.
        if (packed) {
            const length = (0, exports.getLength)(type) / 8;
            return (0, utils_1.concatBytes)([
                buffer,
                (0, utils_2.padStart)((0, utils_1.bigIntToBytes)(bigIntValue), length),
            ]);
        }
        return (0, utils_1.concatBytes)([buffer, (0, utils_2.padStart)((0, utils_1.bigIntToBytes)(bigIntValue))]);
    },
    /**
     * Decode a number value.
     *
     * @param args - The decoding arguments.
     * @param args.type - The type of the value.
     * @param args.value - The value to decode.
     * @returns The decoded value.
     */
    decode({ type, value }) {
        const buffer = value.subarray(0, 32);
        if ((0, exports.isSigned)(type)) {
            const numberValue = (0, utils_1.bytesToSignedBigInt)(buffer);
            (0, exports.assertNumberLength)(numberValue, type);
            return numberValue;
        }
        const numberValue = (0, utils_1.bytesToBigInt)(buffer);
        (0, exports.assertNumberLength)(numberValue, type);
        return numberValue;
    },
};
//# sourceMappingURL=number.js.map