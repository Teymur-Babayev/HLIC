"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useAbly = void 0;
const react_1 = __importDefault(require("react"));
const AblyProvider_js_1 = require("../AblyProvider.js");
function useAbly(id = 'default') {
    const client = react_1.default.useContext((0, AblyProvider_js_1.getContext)(id));
    if (!client) {
        throw new Error('Could not find ably client in context. ' + 'Make sure your ably hooks are called inside an <AblyProvider>');
    }
    return client;
}
exports.useAbly = useAbly;
//# sourceMappingURL=useAbly.js.map