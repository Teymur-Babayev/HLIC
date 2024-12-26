"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.channelOptionsWithAgent = exports.version = void 0;
exports.version = '1.2.47';
function channelOptionsWithAgent(options) {
    return Object.assign(Object.assign({}, options), { params: Object.assign(Object.assign({}, options === null || options === void 0 ? void 0 : options.params), { agent: `react-hooks/${exports.version}` }) });
}
exports.channelOptionsWithAgent = channelOptionsWithAgent;
//# sourceMappingURL=AblyReactHooks.js.map