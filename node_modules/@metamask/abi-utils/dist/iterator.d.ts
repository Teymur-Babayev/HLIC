declare type IteratorValue = {
    skip(length: number): void;
    value: Uint8Array;
};
/**
 * Iterate over a buffer with the specified size. This will yield a part of the
 * buffer starting at an increment of the specified size, until the end of the
 * buffer is reached.
 *
 * Calling the `skip` function will make it skip the specified number of bytes.
 *
 * @param buffer - The buffer to iterate over.
 * @param size - The number of bytes to iterate with.
 * @returns An iterator that yields the parts of the byte array.
 * @yields The parts of the byte array.
 */
export declare const iterate: (buffer: Uint8Array, size?: number) => Generator<IteratorValue, IteratorValue, IteratorValue>;
export {};
