import { useState } from 'react';
import { useConnectionStateListener } from './useConnectionStateListener.js';
import { useChannelStateListener } from './useChannelStateListener.js';
export function useStateErrors(params) {
    const [connectionError, setConnectionError] = useState(null);
    const [channelError, setChannelError] = useState(null);
    useConnectionStateListener(['suspended', 'failed', 'disconnected'], (stateChange) => {
        var _a;
        if (stateChange.reason) {
            (_a = params.onConnectionError) === null || _a === void 0 ? void 0 : _a.call(params, stateChange.reason);
            setConnectionError(stateChange.reason);
        }
    }, params.id);
    useConnectionStateListener(['connected', 'closed'], () => {
        setConnectionError(null);
    }, params.id);
    useChannelStateListener(params, ['suspended', 'failed', 'detached'], (stateChange) => {
        var _a;
        if (stateChange.reason) {
            (_a = params.onChannelError) === null || _a === void 0 ? void 0 : _a.call(params, stateChange.reason);
            setChannelError(stateChange.reason);
        }
    });
    useChannelStateListener(params, ['attached'], () => {
        setChannelError(null);
    });
    return { connectionError, channelError };
}
//# sourceMappingURL=useStateErrors.js.map