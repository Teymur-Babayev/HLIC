"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fixedBytes = exports.getByteLength = void 0;
const utils_1 = require("@metamask/utils");
const errors_1 = require("../errors");
const utils_2 = require("../utils");
const BYTES_REGEX = /^bytes([0-9]{1,2})$/u;
/**
 * Get the length of the specified type. If a length is not specified, or if the
 * length is out of range (0 < n <= 32), this will throw an error.
 *
 * @param type - The type to get the length for.
 * @returns The byte length of the type.
 */
const getByteLength = (type) => {
    const bytes = type.match(BYTES_REGEX)?.[1];
    (0, utils_1.assert)(bytes, `Invalid byte length. Expected a number between 1 and 32, but received "${type}".`);
    const length = Number(bytes);
    (0, utils_1.assert)(length > 0 && length <= 32, new errors_1.ParserError(`Invalid byte length. Expected a number between 1 and 32, but received "${type}".`));
    return length;
};
exports.getByteLength = getByteLength;
exports.fixedBytes = {
    isDynamic: false,
    /**
     * Check if a type is a fixed bytes type.
     *
     * @param type - The type to check.
     * @returns Whether the type is a fixed bytes type.
     */
    isType(type) {
        return BYTES_REGEX.test(type);
    },
    /**
     * Get the byte length of an encoded fixed bytes type.
     *
     * @returns The byte length of the type.
     */
    getByteLength() {
        return 32;
    },
    /**
     * Encode a fixed bytes value.
     *
     * @param args - The arguments to encode.
     * @param args.type - The type of the value.
     * @param args.buffer - The byte array to add to.
     * @param args.value - The value to encode.
     * @param args.packed - Whether to use packed encoding.
     * @returns The bytes with the encoded value added to it.
     */
    encode({ type, buffer, value, packed }) {
        const length = (0, exports.getByteLength)(type);
        const bufferValue = (0, utils_1.createBytes)(value);
        (0, utils_1.assert)(bufferValue.length <= length, new errors_1.ParserError(`Expected a value of length ${length}, but received a value of length ${bufferValue.length}.`));
        // For packed encoding, the value is padded to the length of the type, and
        // then added to the byte array.
        if (packed) {
            return (0, utils_1.concatBytes)([buffer, (0, utils_2.padEnd)(bufferValue, length)]);
        }
        return (0, utils_1.concatBytes)([buffer, (0, utils_2.padEnd)(bufferValue)]);
    },
    /**
     * Decode a fixed bytes value.
     *
     * @param args - The arguments to decode.
     * @param args.type - The type of the value.
     * @param args.value - The value to decode.
     * @returns The decoded value as a `Uint8Array`.
     */
    decode({ type, value }) {
        const length = (0, exports.getByteLength)(type);
        // Since we're returning a `Uint8Array`, we use `slice` to copy the bytes
        // into a new array.
        return value.slice(0, length);
    },
};
//# sourceMappingURL=fixed-bytes.js.map