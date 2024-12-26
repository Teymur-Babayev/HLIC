import { useEffect, useRef } from 'react';
import { channelOptionsWithAgent } from '../AblyReactHooks.js';
import { useAbly } from './useAbly.js';
import { useEventListener } from './useEventListener.js';
export function useChannelStateListener(channelNameOrNameAndId, stateOrListener, listener) {
    const channelHookOptions = typeof channelNameOrNameAndId === 'object' ? channelNameOrNameAndId : { channelName: channelNameOrNameAndId };
    const id = channelNameOrNameAndId === null || channelNameOrNameAndId === void 0 ? void 0 : channelNameOrNameAndId.id;
    const { channelName, options: channelOptions } = channelHookOptions;
    const ably = useAbly(id);
    const channel = ably.channels.get(channelName, channelOptionsWithAgent(channelOptions));
    const channelOptionsRef = useRef(channelOptions);
    useEffect(() => {
        if (channelOptionsRef.current !== channelOptions && channelOptions) {
            channel.setOptions(channelOptionsWithAgent(channelOptions));
        }
        channelOptionsRef.current = channelOptions;
    }, [channel, channelOptions]);
    useEffect(() => {
        if (channelOptionsRef.current !== channelOptions && channelOptions) {
            channel.setOptions(channelOptionsWithAgent(channelOptions));
        }
        channelOptionsRef.current = channelOptions;
    }, [channel, channelOptions]);
    const _listener = typeof listener === 'function' ? listener : stateOrListener;
    const state = typeof stateOrListener !== 'function' ? stateOrListener : undefined;
    useEventListener(channel, _listener, state);
}
//# sourceMappingURL=useChannelStateListener.js.map