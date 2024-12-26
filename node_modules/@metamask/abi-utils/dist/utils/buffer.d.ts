/**
 * Set `buffer` in `target` at the specified position.
 *
 * @param target - The buffer to set to.
 * @param buffer - The buffer to set in the target.
 * @param position - The position at which to set the target.
 * @returns The combined buffer.
 */
export declare const set: (target: Uint8Array, buffer: Uint8Array, position: number) => Uint8Array;
/**
 * Add padding to a buffer. If the buffer is larger than `length`, this function won't do anything. If it's smaller, the
 * buffer will be padded to the specified length, with extra zeroes at the start.
 *
 * @param buffer - The buffer to add padding to.
 * @param length - The number of bytes to pad the buffer to.
 * @returns The padded buffer.
 */
export declare const padStart: (buffer: Uint8Array, length?: number) => Uint8Array;
/**
 * Add padding to a buffer. If the buffer is larger than `length`, this function won't do anything. If it's smaller, the
 * buffer will be padded to the specified length, with extra zeroes at the end.
 *
 * @param buffer - The buffer to add padding to.
 * @param length - The number of bytes to pad the buffer to.
 * @returns The padded buffer.
 */
export declare const padEnd: (buffer: Uint8Array, length?: number) => Uint8Array;
