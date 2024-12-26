import React from 'react';
import { getContext } from '../AblyProvider.js';
export function useAbly(id = 'default') {
    const client = React.useContext(getContext(id));
    if (!client) {
        throw new Error('Could not find ably client in context. ' + 'Make sure your ably hooks are called inside an <AblyProvider>');
    }
    return client;
}
//# sourceMappingURL=useAbly.js.map