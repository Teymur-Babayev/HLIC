"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.padEnd = exports.padStart = exports.set = void 0;
const utils_1 = require("@metamask/utils");
const BUFFER_WIDTH = 32;
/**
 * Set `buffer` in `target` at the specified position.
 *
 * @param target - The buffer to set to.
 * @param buffer - The buffer to set in the target.
 * @param position - The position at which to set the target.
 * @returns The combined buffer.
 */
const set = (target, buffer, position) => {
    return (0, utils_1.concatBytes)([
        target.subarray(0, position),
        buffer,
        target.subarray(position + buffer.length),
    ]);
};
exports.set = set;
/**
 * Add padding to a buffer. If the buffer is larger than `length`, this function won't do anything. If it's smaller, the
 * buffer will be padded to the specified length, with extra zeroes at the start.
 *
 * @param buffer - The buffer to add padding to.
 * @param length - The number of bytes to pad the buffer to.
 * @returns The padded buffer.
 */
const padStart = (buffer, length = BUFFER_WIDTH) => {
    const padding = new Uint8Array(Math.max(length - buffer.length, 0)).fill(0x00);
    return (0, utils_1.concatBytes)([padding, buffer]);
};
exports.padStart = padStart;
/**
 * Add padding to a buffer. If the buffer is larger than `length`, this function won't do anything. If it's smaller, the
 * buffer will be padded to the specified length, with extra zeroes at the end.
 *
 * @param buffer - The buffer to add padding to.
 * @param length - The number of bytes to pad the buffer to.
 * @returns The padded buffer.
 */
const padEnd = (buffer, length = BUFFER_WIDTH) => {
    const padding = new Uint8Array(Math.max(length - buffer.length, 0)).fill(0x00);
    return (0, utils_1.concatBytes)([buffer, padding]);
};
exports.padEnd = padEnd;
//# sourceMappingURL=buffer.js.map