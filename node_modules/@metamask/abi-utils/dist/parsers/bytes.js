"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bytes = void 0;
const utils_1 = require("@metamask/utils");
const utils_2 = require("../utils");
exports.bytes = {
    isDynamic: true,
    /**
     * Check if a type is a bytes type. Since `bytes` is a simple type, this is
     * just a check that the type is "bytes".
     *
     * @param type - The type to check.
     * @returns Whether the type is a bytes type.
     */
    isType: (type) => type === 'bytes',
    /**
     * Get the byte length of an encoded bytes value. Since `bytes` is a simple
     * type, this always returns 32.
     *
     * Note that actual length of a bytes value is variable, but the encoded
     * static value (pointer) is always 32 bytes long.
     *
     * @returns The byte length of an encoded bytes value.
     */
    getByteLength() {
        return 32;
    },
    /**
     * Encode the given bytes value to a byte array.
     *
     * @param args - The encoding arguments.
     * @param args.buffer - The byte array to add to.
     * @param args.value - The bytes value to encode.
     * @param args.packed - Whether to use packed encoding.
     * @returns The bytes with the encoded bytes value added to it.
     */
    encode({ buffer, value, packed }) {
        const bufferValue = (0, utils_1.createBytes)(value);
        // For packed encoding, we can just add the bytes value to the byte array,
        // without adding any padding or alignment. There is also no need to
        // encode the length of the bytes.
        if (packed) {
            return (0, utils_1.concatBytes)([buffer, bufferValue]);
        }
        const paddedSize = Math.ceil(bufferValue.byteLength / 32) * 32;
        // Bytes of length `k` are encoded as `k pad_right(bytes)`.
        return (0, utils_1.concatBytes)([
            buffer,
            (0, utils_2.padStart)((0, utils_1.numberToBytes)(bufferValue.byteLength)),
            (0, utils_2.padEnd)(bufferValue, paddedSize),
        ]);
    },
    /**
     * Decode the given byte array to a bytes value.
     *
     * @param args - The decoding arguments.
     * @param args.value - The byte array to decode.
     * @returns The decoded bytes value as a `Uint8Array`.
     */
    decode({ value }) {
        const bytesValue = value.subarray(0, 32);
        const length = (0, utils_1.bytesToNumber)(bytesValue);
        // Since we're returning a `Uint8Array`, we use `slice` to copy the bytes
        // into a new array.
        return value.slice(32, 32 + length);
    },
};
//# sourceMappingURL=bytes.js.map