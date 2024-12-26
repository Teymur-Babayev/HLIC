"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.string = void 0;
const utils_1 = require("@metamask/utils");
const bytes_1 = require("./bytes");
exports.string = {
    isDynamic: true,
    /**
     * Check if a type is a string type. Since `string` is a simple type, this
     * is just a check if the type is "string".
     *
     * @param type - The type to check.
     * @returns Whether the type is a string type.
     */
    isType: (type) => type === 'string',
    /**
     * Get the byte length of an encoded string type. Since `string` is a simple
     * type, this will always return 32.
     *
     * Note that actual strings are variable in length, but the encoded static
     * value (pointer) is always 32 bytes long.
     *
     * @returns The byte length of an encoded string.
     */
    getByteLength() {
        return 32;
    },
    /**
     * Encode the given string value to a byte array.
     *
     * @param args - The encoding arguments.
     * @param args.buffer - The byte array to add to.
     * @param args.value - The string value to encode.
     * @param args.packed - Whether to use packed encoding.
     * @param args.tight - Whether to use non-standard tight encoding.
     * @returns The bytes with the encoded string value added to it.
     */
    encode({ buffer, value, packed, tight }) {
        // Strings are encoded as UTF-8 bytes, so we use the bytes parser to encode
        // the string as bytes.
        return bytes_1.bytes.encode({
            type: 'bytes',
            buffer,
            value: (0, utils_1.stringToBytes)(value),
            packed,
            tight,
        });
    },
    /**
     * Decode the given byte array to a string value.
     *
     * @param args - The decoding arguments.
     * @returns The decoded string value.
     */
    decode(args) {
        // Strings are encoded as UTF-8 bytes, so we use the bytes parser to decode
        // the bytes, and convert them to a string.
        return (0, utils_1.bytesToString)(bytes_1.bytes.decode(args));
    },
};
//# sourceMappingURL=string.js.map