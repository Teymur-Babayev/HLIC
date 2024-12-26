export const version = '1.2.47';
export function channelOptionsWithAgent(options) {
    return Object.assign(Object.assign({}, options), { params: Object.assign(Object.assign({}, options === null || options === void 0 ? void 0 : options.params), { agent: `react-hooks/${version}` }) });
}
//# sourceMappingURL=AblyReactHooks.js.map