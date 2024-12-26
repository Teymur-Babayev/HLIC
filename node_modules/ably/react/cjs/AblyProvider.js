"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AblyProvider = exports.getContext = exports.contextKey = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const Ably = __importStar(require("ably"));
const react_1 = __importStar(require("react"));
const canUseSymbol = typeof Symbol === 'function' && typeof Symbol.for === 'function';
exports.contextKey = canUseSymbol ? Symbol.for('__ABLY_CONTEXT__') : '__ABLY_CONTEXT__';
const ctxMap = typeof globalThis !== 'undefined' ? (globalThis[exports.contextKey] = {}) : {};
function getContext(ctxId = 'default') {
    return ctxMap[ctxId];
}
exports.getContext = getContext;
const AblyProvider = ({ client, children, id = 'default' }) => {
    var _a;
    if (!client) {
        throw new Error('AblyProvider: the `client` prop is required');
    }
    if (!(client instanceof Ably.Realtime) && !((_a = client === null || client === void 0 ? void 0 : client.options) === null || _a === void 0 ? void 0 : _a.promises)) {
        throw new Error('AblyProvider: the `client` prop must take an instance of Ably.Realtime.Promise');
    }
    const realtime = (0, react_1.useMemo)(() => client, [client]);
    let context = getContext(id);
    if (!context) {
        context = ctxMap[id] = react_1.default.createContext(realtime);
    }
    return (0, jsx_runtime_1.jsx)(context.Provider, Object.assign({ value: realtime }, { children: children }));
};
exports.AblyProvider = AblyProvider;
//# sourceMappingURL=AblyProvider.js.map