"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getErrorCode = exports.serializeError = exports.standardErrors = exports.standardErrorMessage = exports.standardErrorCodes = void 0;
// eslint-disable-next-line no-restricted-imports
const eth_rpc_errors_1 = require("eth-rpc-errors");
const Web3Response_1 = require("./relay/Web3Response");
const version_1 = require("./version");
exports.standardErrorCodes = Object.freeze(Object.assign(Object.assign({}, eth_rpc_errors_1.errorCodes), { provider: Object.freeze(Object.assign(Object.assign({}, eth_rpc_errors_1.errorCodes.provider), { unsupportedChain: 4902 })) }));
function standardErrorMessage(code) {
    return code !== undefined ? (0, eth_rpc_errors_1.getMessageFromCode)(code) : "Unknown error";
}
exports.standardErrorMessage = standardErrorMessage;
exports.standardErrors = Object.freeze(Object.assign(Object.assign({}, eth_rpc_errors_1.ethErrors), { provider: Object.freeze(Object.assign(Object.assign({}, eth_rpc_errors_1.ethErrors.provider), { unsupportedChain: (chainId = "") => eth_rpc_errors_1.ethErrors.provider.custom({
            code: exports.standardErrorCodes.provider.unsupportedChain,
            message: `Unrecognized chain ID ${chainId}. Try adding the chain using wallet_addEthereumChain first.`,
        }) })) }));
/**
 * Serializes an error to a format that is compatible with the Ethereum JSON RPC error format.
 * See https://docs.cloud.coinbase.com/wallet-sdk/docs/errors
 * for more information.
 */
function serializeError(error, requestOrMethod) {
    const serialized = (0, eth_rpc_errors_1.serializeError)(getErrorObject(error), {
        shouldIncludeStack: true,
    });
    const docUrl = new URL("https://docs.cloud.coinbase.com/wallet-sdk/docs/errors");
    docUrl.searchParams.set("version", version_1.LIB_VERSION);
    docUrl.searchParams.set("code", serialized.code.toString());
    const method = getMethod(serialized.data, requestOrMethod);
    if (method) {
        docUrl.searchParams.set("method", method);
    }
    docUrl.searchParams.set("message", serialized.message);
    return Object.assign(Object.assign({}, serialized), { docUrl: docUrl.href });
}
exports.serializeError = serializeError;
/**
 * Converts an error to a serializable object.
 */
function getErrorObject(error) {
    if (typeof error === "string") {
        return {
            message: error,
            code: exports.standardErrorCodes.rpc.internal,
        };
    }
    else if ((0, Web3Response_1.isErrorResponse)(error)) {
        return Object.assign(Object.assign({}, error), { message: error.errorMessage, code: error.errorCode, data: { method: error.method, result: error.result } });
    }
    else {
        return error;
    }
}
/**
 * Gets the method name from the serialized data or the request.
 */
function getMethod(serializedData, request) {
    var _a;
    const methodInData = (_a = serializedData) === null || _a === void 0 ? void 0 : _a.method;
    if (methodInData) {
        return methodInData;
    }
    if (request === undefined) {
        return undefined;
    }
    else if (typeof request === "string") {
        return request;
    }
    else if (!Array.isArray(request)) {
        return request.method;
    }
    else if (request.length > 0) {
        return request[0].method;
    }
    else {
        return undefined;
    }
}
// ----------------- getErrorCode -----------------
/**
 * Returns the error code from an error object.
 */
function getErrorCode(error) {
    var _a;
    if (typeof error === "number") {
        return error;
    }
    else if (isErrorWithCode(error)) {
        return (_a = error.code) !== null && _a !== void 0 ? _a : error.errorCode;
    }
    return undefined;
}
exports.getErrorCode = getErrorCode;
function isErrorWithCode(error) {
    return (typeof error === "object" &&
        error !== null &&
        (typeof error.code === "number" ||
            typeof error.errorCode === "number"));
}
