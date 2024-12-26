"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useConnectionStateListener = void 0;
const useAbly_js_1 = require("./useAbly.js");
const useEventListener_js_1 = require("./useEventListener.js");
function useConnectionStateListener(stateOrListener, listenerOrId, id = 'default') {
    const _id = typeof listenerOrId === 'string' ? listenerOrId : id;
    const ably = (0, useAbly_js_1.useAbly)(_id);
    const listener = typeof listenerOrId === 'function' ? listenerOrId : stateOrListener;
    const state = typeof stateOrListener !== 'function' ? stateOrListener : undefined;
    (0, useEventListener_js_1.useEventListener)(ably.connection, listener, state);
}
exports.useConnectionStateListener = useConnectionStateListener;
//# sourceMappingURL=useConnectionStateListener.js.map