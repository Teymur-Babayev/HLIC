"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useStateErrors = void 0;
const react_1 = require("react");
const useConnectionStateListener_js_1 = require("./useConnectionStateListener.js");
const useChannelStateListener_js_1 = require("./useChannelStateListener.js");
function useStateErrors(params) {
    const [connectionError, setConnectionError] = (0, react_1.useState)(null);
    const [channelError, setChannelError] = (0, react_1.useState)(null);
    (0, useConnectionStateListener_js_1.useConnectionStateListener)(['suspended', 'failed', 'disconnected'], (stateChange) => {
        var _a;
        if (stateChange.reason) {
            (_a = params.onConnectionError) === null || _a === void 0 ? void 0 : _a.call(params, stateChange.reason);
            setConnectionError(stateChange.reason);
        }
    }, params.id);
    (0, useConnectionStateListener_js_1.useConnectionStateListener)(['connected', 'closed'], () => {
        setConnectionError(null);
    }, params.id);
    (0, useChannelStateListener_js_1.useChannelStateListener)(params, ['suspended', 'failed', 'detached'], (stateChange) => {
        var _a;
        if (stateChange.reason) {
            (_a = params.onChannelError) === null || _a === void 0 ? void 0 : _a.call(params, stateChange.reason);
            setChannelError(stateChange.reason);
        }
    });
    (0, useChannelStateListener_js_1.useChannelStateListener)(params, ['attached'], () => {
        setChannelError(null);
    });
    return { connectionError, channelError };
}
exports.useStateErrors = useStateErrors;
//# sourceMappingURL=useStateErrors.js.map