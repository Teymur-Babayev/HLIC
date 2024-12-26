import { useAbly } from './useAbly.js';
import { useEventListener } from './useEventListener.js';
export function useConnectionStateListener(stateOrListener, listenerOrId, id = 'default') {
    const _id = typeof listenerOrId === 'string' ? listenerOrId : id;
    const ably = useAbly(_id);
    const listener = typeof listenerOrId === 'function' ? listenerOrId : stateOrListener;
    const state = typeof stateOrListener !== 'function' ? stateOrListener : undefined;
    useEventListener(ably.connection, listener, state);
}
//# sourceMappingURL=useConnectionStateListener.js.map