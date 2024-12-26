"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useChannelStateListener = void 0;
const react_1 = require("react");
const AblyReactHooks_js_1 = require("../AblyReactHooks.js");
const useAbly_js_1 = require("./useAbly.js");
const useEventListener_js_1 = require("./useEventListener.js");
function useChannelStateListener(channelNameOrNameAndId, stateOrListener, listener) {
    const channelHookOptions = typeof channelNameOrNameAndId === 'object' ? channelNameOrNameAndId : { channelName: channelNameOrNameAndId };
    const id = channelNameOrNameAndId === null || channelNameOrNameAndId === void 0 ? void 0 : channelNameOrNameAndId.id;
    const { channelName, options: channelOptions } = channelHookOptions;
    const ably = (0, useAbly_js_1.useAbly)(id);
    const channel = ably.channels.get(channelName, (0, AblyReactHooks_js_1.channelOptionsWithAgent)(channelOptions));
    const channelOptionsRef = (0, react_1.useRef)(channelOptions);
    (0, react_1.useEffect)(() => {
        if (channelOptionsRef.current !== channelOptions && channelOptions) {
            channel.setOptions((0, AblyReactHooks_js_1.channelOptionsWithAgent)(channelOptions));
        }
        channelOptionsRef.current = channelOptions;
    }, [channel, channelOptions]);
    (0, react_1.useEffect)(() => {
        if (channelOptionsRef.current !== channelOptions && channelOptions) {
            channel.setOptions((0, AblyReactHooks_js_1.channelOptionsWithAgent)(channelOptions));
        }
        channelOptionsRef.current = channelOptions;
    }, [channel, channelOptions]);
    const _listener = typeof listener === 'function' ? listener : stateOrListener;
    const state = typeof stateOrListener !== 'function' ? stateOrListener : undefined;
    (0, useEventListener_js_1.useEventListener)(channel, _listener, state);
}
exports.useChannelStateListener = useChannelStateListener;
//# sourceMappingURL=useChannelStateListener.js.map