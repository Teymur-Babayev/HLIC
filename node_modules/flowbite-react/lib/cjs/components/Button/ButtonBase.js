"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ButtonBase = void 0;
const react_1 = require("react");
exports.ButtonBase = (0, react_1.forwardRef)(({ children, as: Component, href, type = 'button', ...props }, ref) => {
    const BaseComponent = Component || (href ? 'a' : 'button');
    return (0, react_1.createElement)(BaseComponent, { ref, href, type, ...props }, children);
});
exports.ButtonBase.displayName = 'ButtonBaseComponent';
