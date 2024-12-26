"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ButtonGroup = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const tailwind_merge_1 = require("tailwind-merge");
const merge_deep_1 = require("../../helpers/merge-deep");
const theme_store_1 = require("../../theme-store");
const processChildren = (children, outline, pill) => {
    return react_1.Children.map(children, (child, index) => {
        if ((0, react_1.isValidElement)(child)) {
            // Check if the child has nested children
            if (child.props.children) {
                // Recursively process nested children
                return (0, react_1.cloneElement)(child, {
                    ...child.props,
                    children: processChildren(child.props.children, outline, pill),
                    positionInGroup: determinePosition(index, react_1.Children.count(children)),
                });
            }
            else {
                return (0, react_1.cloneElement)(child, {
                    outline,
                    pill,
                    positionInGroup: determinePosition(index, react_1.Children.count(children)),
                });
            }
        }
        return child;
    });
};
const determinePosition = (index, totalChildren) => {
    return index === 0 ? 'start' : index === totalChildren - 1 ? 'end' : 'middle';
};
const ButtonGroup = ({ children, className, outline, pill, theme: customTheme = {}, ...props }) => {
    const items = (0, react_1.useMemo)(() => processChildren(children, outline, pill), [children, outline, pill]);
    const theme = (0, merge_deep_1.mergeDeep)((0, theme_store_1.getTheme)().buttonGroup, customTheme);
    return ((0, jsx_runtime_1.jsx)("div", { className: (0, tailwind_merge_1.twMerge)(theme.base, className), role: "group", ...props, children: items }));
};
exports.ButtonGroup = ButtonGroup;
exports.ButtonGroup.displayName = 'Button.Group';
