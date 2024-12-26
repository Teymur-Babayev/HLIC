import { jsx as _jsx } from "react/jsx-runtime";
import * as Ably from 'ably';
import React, { useMemo } from 'react';
const canUseSymbol = typeof Symbol === 'function' && typeof Symbol.for === 'function';
export const contextKey = canUseSymbol ? Symbol.for('__ABLY_CONTEXT__') : '__ABLY_CONTEXT__';
const ctxMap = typeof globalThis !== 'undefined' ? (globalThis[contextKey] = {}) : {};
export function getContext(ctxId = 'default') {
    return ctxMap[ctxId];
}
export const AblyProvider = ({ client, children, id = 'default' }) => {
    var _a;
    if (!client) {
        throw new Error('AblyProvider: the `client` prop is required');
    }
    if (!(client instanceof Ably.Realtime) && !((_a = client === null || client === void 0 ? void 0 : client.options) === null || _a === void 0 ? void 0 : _a.promises)) {
        throw new Error('AblyProvider: the `client` prop must take an instance of Ably.Realtime.Promise');
    }
    const realtime = useMemo(() => client, [client]);
    let context = getContext(id);
    if (!context) {
        context = ctxMap[id] = React.createContext(realtime);
    }
    return _jsx(context.Provider, Object.assign({ value: realtime }, { children: children }));
};
//# sourceMappingURL=AblyProvider.js.map