"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParserError = exports.getErrorStack = exports.getErrorMessage = void 0;
const utils_1 = require("@metamask/utils");
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
const getErrorMessage = (error) => {
    if (typeof error === 'string') {
        return error;
    }
    if (error instanceof Error) {
        return error.message;
    }
    if ((0, utils_1.isObject)(error) &&
        (0, utils_1.hasProperty)(error, 'message') &&
        typeof error.message === 'string') {
        return error.message;
    }
    return 'Unknown error.';
};
exports.getErrorMessage = getErrorMessage;
/**
 * Get the error stack from a value. If the value is an error, the error's stack
 * is returned. Otherwise, it returns `undefined`.
 *
 * @param error - The value to get an error stack from.
 * @returns The error stack, or `undefined` if the value is not an error.
 * @internal
 */
const getErrorStack = (error) => {
    if (error instanceof Error) {
        return error.stack;
    }
    return undefined;
};
exports.getErrorStack = getErrorStack;
/**
 * An error that is thrown when the ABI encoder or decoder encounters an
 * issue.
 */
class ParserError extends Error {
    constructor(message, originalError) {
        super(message);
        this.name = 'ParserError';
        const originalStack = (0, exports.getErrorStack)(originalError);
        if (originalStack) {
            this.stack = originalStack;
        }
    }
}
exports.ParserError = ParserError;
//# sourceMappingURL=errors.js.map