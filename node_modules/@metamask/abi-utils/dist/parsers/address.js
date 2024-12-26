"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.address = exports.getAddress = void 0;
const utils_1 = require("@metamask/utils");
const errors_1 = require("../errors");
const utils_2 = require("../utils");
/**
 * Normalize an address value. This accepts the address as:
 *
 * - A hex string starting with the `0x` prefix.
 * - A byte array (`Uint8Array` or `Buffer`).
 *
 * It checks that the address is 20 bytes long.
 *
 * @param value - The value to normalize.
 * @returns The normalized address as `Uint8Array`.
 */
const getAddress = (value) => {
    const bytesValue = (0, utils_1.createBytes)(value);
    (0, utils_1.assert)(bytesValue.length <= 20, new errors_1.ParserError(`Invalid address value. Expected address to be 20 bytes long, but received ${bytesValue.length} bytes.`));
    return (0, utils_2.padStart)(bytesValue, 20);
};
exports.getAddress = getAddress;
exports.address = {
    isDynamic: false,
    /**
     * Get if the given value is a valid address type. Since `address` is a simple
     * type, this is just a check that the value is "address".
     *
     * @param type - The type to check.
     * @returns Whether the type is a valid address type.
     */
    isType: (type) => type === 'address',
    /**
     * Get the byte length of an encoded address. Since `address` is a simple
     * type, this always returns 32.
     *
     * Note that actual addresses are only 20 bytes long, but the encoding of
     * the `address` type is always 32 bytes long.
     *
     * @returns The byte length of an encoded address.
     */
    getByteLength() {
        return 32;
    },
    /**
     * Encode the given address to a 32-byte-long byte array.
     *
     * @param args - The encoding arguments.
     * @param args.buffer - The byte array to add to.
     * @param args.value - The address to encode.
     * @param args.packed - Whether to use packed encoding.
     * @returns The bytes with the encoded address added to it.
     */
    encode({ buffer, value, packed }) {
        const addressValue = (0, exports.getAddress)(value);
        // If we're using packed encoding, we can just add the address bytes to the
        // byte array, without adding any padding.
        if (packed) {
            return (0, utils_1.concatBytes)([buffer, addressValue]);
        }
        const addressBuffer = (0, utils_2.padStart)(addressValue);
        return (0, utils_1.concatBytes)([buffer, addressBuffer]);
    },
    /**
     * Decode the given byte array to an address.
     *
     * @param args - The decoding arguments.
     * @param args.value - The byte array to decode.
     * @returns The decoded address as a hexadecimal string, starting with the
     * "0x"-prefix.
     */
    decode({ value }) {
        return (0, utils_1.add0x)((0, utils_1.bytesToHex)(value.slice(12, 32)));
    },
};
//# sourceMappingURL=address.js.map