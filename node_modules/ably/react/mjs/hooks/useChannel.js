var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { useEffect, useMemo, useRef } from 'react';
import { channelOptionsWithAgent } from '../AblyReactHooks.js';
import { useAbly } from './useAbly.js';
import { useStateErrors } from './useStateErrors.js';
export function useChannel(channelNameOrNameAndOptions, eventOrCallback, callback) {
    const channelHookOptions = typeof channelNameOrNameAndOptions === 'object'
        ? channelNameOrNameAndOptions
        : { channelName: channelNameOrNameAndOptions };
    const ably = useAbly(channelHookOptions.id);
    const { channelName, options: channelOptions, deriveOptions, skip } = channelHookOptions;
    const channelEvent = typeof eventOrCallback === 'string' ? eventOrCallback : null;
    const ablyMessageCallback = typeof eventOrCallback === 'string' ? callback : eventOrCallback;
    const deriveOptionsRef = useRef(deriveOptions);
    const channelOptionsRef = useRef(channelOptions);
    const ablyMessageCallbackRef = useRef(ablyMessageCallback);
    const channel = useMemo(() => {
        const derived = deriveOptionsRef.current;
        const withAgent = channelOptionsWithAgent(channelOptionsRef.current);
        const channel = derived
            ? ably.channels.getDerived(channelName, derived, withAgent)
            : ably.channels.get(channelName, withAgent);
        return channel;
    }, [ably, channelName]);
    const { connectionError, channelError } = useStateErrors(channelHookOptions);
    useEffect(() => {
        if (channelOptionsRef.current !== channelOptions && channelOptions) {
            channel.setOptions(channelOptionsWithAgent(channelOptions));
        }
        channelOptionsRef.current = channelOptions;
    }, [channel, channelOptions]);
    useEffect(() => {
        deriveOptionsRef.current = deriveOptions;
    }, [deriveOptions]);
    useEffect(() => {
        ablyMessageCallbackRef.current = ablyMessageCallback;
    }, [ablyMessageCallback]);
    useEffect(() => {
        const listener = ablyMessageCallbackRef.current
            ? (message) => {
                ablyMessageCallbackRef.current && ablyMessageCallbackRef.current(message);
            }
            : null;
        const subscribeArgs = listener
            ? channelEvent === null
                ? [listener]
                : [channelEvent, listener]
            : null;
        if (!skip && subscribeArgs) {
            handleChannelMount(channel, ...subscribeArgs);
        }
        return () => {
            !skip && subscribeArgs && handleChannelUnmount(channel, ...subscribeArgs);
        };
    }, [channelEvent, channel, skip]);
    return { channel, ably, connectionError, channelError };
}
function handleChannelMount(channel, ...subscribeArgs) {
    return __awaiter(this, void 0, void 0, function* () {
        yield channel.subscribe(...subscribeArgs);
    });
}
function handleChannelUnmount(channel, ...subscribeArgs) {
    return __awaiter(this, void 0, void 0, function* () {
        yield channel.unsubscribe(...subscribeArgs);
        setTimeout(() => __awaiter(this, void 0, void 0, function* () {
            // React is very mount/unmount happy, so if we just detatch the channel
            // it's quite likely it will be reattached again by a subsequent handleChannelMount calls.
            // To solve this, we set a timer, and if all the listeners have been removed, we know that the component
            // has been removed for good and we can detatch the channel.
            if (channel.listeners.length === 0) {
                yield channel.detach();
            }
        }), 2500);
    });
}
//# sourceMappingURL=useChannel.js.map