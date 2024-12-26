"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.usePresence = void 0;
const react_1 = require("react");
const AblyReactHooks_js_1 = require("../AblyReactHooks.js");
const useAbly_js_1 = require("./useAbly.js");
const useStateErrors_js_1 = require("./useStateErrors.js");
function usePresence(channelNameOrNameAndOptions, messageOrPresenceObject, onPresenceUpdated) {
    const params = typeof channelNameOrNameAndOptions === 'object'
        ? channelNameOrNameAndOptions
        : { channelName: channelNameOrNameAndOptions };
    const ably = (0, useAbly_js_1.useAbly)(params.id);
    const subscribeOnly = typeof channelNameOrNameAndOptions === 'string' ? false : params.subscribeOnly;
    const channelOptions = params.options;
    const channelOptionsRef = (0, react_1.useRef)(channelOptions);
    const channel = (0, react_1.useMemo)(() => ably.channels.get(params.channelName, (0, AblyReactHooks_js_1.channelOptionsWithAgent)(channelOptionsRef.current)), [ably, params.channelName]);
    const skip = params.skip;
    const { connectionError, channelError } = (0, useStateErrors_js_1.useStateErrors)(params);
    (0, react_1.useEffect)(() => {
        if (channelOptionsRef.current !== channelOptions && channelOptions) {
            channel.setOptions((0, AblyReactHooks_js_1.channelOptionsWithAgent)(channelOptions));
        }
        channelOptionsRef.current = channelOptions;
    }, [channel, channelOptions]);
    const [presenceData, updatePresenceData] = (0, react_1.useState)([]);
    const updatePresence = (message) => __awaiter(this, void 0, void 0, function* () {
        const snapshot = yield channel.presence.get();
        updatePresenceData(snapshot);
        onPresenceUpdated === null || onPresenceUpdated === void 0 ? void 0 : onPresenceUpdated.call(this, message);
    });
    const onMount = () => __awaiter(this, void 0, void 0, function* () {
        channel.presence.subscribe('enter', updatePresence);
        channel.presence.subscribe('leave', updatePresence);
        channel.presence.subscribe('update', updatePresence);
        if (!subscribeOnly) {
            yield channel.presence.enter(messageOrPresenceObject);
        }
        const snapshot = yield channel.presence.get();
        updatePresenceData(snapshot);
    });
    const onUnmount = () => {
        if (channel.state == 'attached') {
            if (!subscribeOnly) {
                channel.presence.leave();
            }
        }
        channel.presence.unsubscribe('enter');
        channel.presence.unsubscribe('leave');
        channel.presence.unsubscribe('update');
    };
    const useEffectHook = () => {
        !skip && onMount();
        return () => {
            onUnmount();
        };
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    (0, react_1.useEffect)(useEffectHook, [skip]);
    const updateStatus = (0, react_1.useCallback)((messageOrPresenceObject) => {
        if (!subscribeOnly) {
            channel.presence.update(messageOrPresenceObject);
        }
        else {
            throw new Error('updateStatus can not be called while using the hook in subscribeOnly mode');
        }
    }, [subscribeOnly, channel]);
    return { presenceData, updateStatus, connectionError, channelError };
}
exports.usePresence = usePresence;
//# sourceMappingURL=usePresence.js.map