/**
 * Attempt to get an error message from a value.
 *
 * - If the value is an error, the error's message is returned.
 * - If the value is an object with a `message` property, the value of that
 * property is returned.
 * - If the value is a string, the value is returned.
 * - Otherwise, "Unknown error." is returned.
 *
 * @param error - The value to get an error message from.
 * @returns The error message.
 * @internal
 */
export declare const getErrorMessage: (error?: unknown) => string;
/**
 * Get the error stack from a value. If the value is an error, the error's stack
 * is returned. Otherwise, it returns `undefined`.
 *
 * @param error - The value to get an error stack from.
 * @returns The error stack, or `undefined` if the value is not an error.
 * @internal
 */
export declare const getErrorStack: (error?: unknown) => string | undefined;
/**
 * An error that is thrown when the ABI encoder or decoder encounters an
 * issue.
 */
export declare class ParserError extends Error {
    readonly name = "ParserError";
    constructor(message: string, originalError?: unknown);
}
