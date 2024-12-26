"use strict";
'use client';
Object.defineProperty(exports, "__esModule", { value: true });
exports.Popover = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const react_2 = require("@floating-ui/react");
const merge_deep_1 = require("../../helpers/merge-deep");
const theme_store_1 = require("../../theme-store");
const use_floating_1 = require("../../hooks/use-floating");
const helpers_1 = require("../Floating/helpers");
function Popover({ children, content, theme: customTheme = {}, arrow = true, trigger = 'click', initialOpen, open: controlledOpen, onOpenChange: setControlledOpen, placement: theirPlacement = 'bottom', ...props }) {
    const [uncontrolledOpen, setUncontrolledOpen] = (0, react_1.useState)(Boolean(initialOpen));
    const arrowRef = (0, react_1.useRef)(null);
    const theme = (0, merge_deep_1.mergeDeep)((0, theme_store_1.getTheme)().popover, customTheme);
    const open = controlledOpen ?? uncontrolledOpen;
    const setOpen = setControlledOpen ?? setUncontrolledOpen;
    const floatingProps = (0, use_floating_1.useBaseFLoating)({
        open,
        placement: theirPlacement,
        arrowRef,
        setOpen,
    });
    const { floatingStyles, context, placement, middlewareData: { arrow: { x: arrowX, y: arrowY } = {} }, refs, } = floatingProps;
    const { getFloatingProps, getReferenceProps } = (0, use_floating_1.useFloatingInteractions)({
        context,
        role: 'dialog',
        trigger,
    });
    const childrenRef = children.ref;
    const ref = (0, react_2.useMergeRefs)([context.refs.setReference, childrenRef]);
    if (!(0, react_1.isValidElement)(children)) {
        throw Error('Invalid target element');
    }
    const target = (0, react_1.useMemo)(() => {
        return (0, react_1.cloneElement)(children, getReferenceProps({
            ref,
            'data-testid': 'flowbite-popover-target',
            ...children?.props,
        }));
    }, [children, ref, getReferenceProps]);
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [target, open && ((0, jsx_runtime_1.jsx)(react_2.FloatingFocusManager, { context: context, modal: true, children: (0, jsx_runtime_1.jsx)("div", { className: theme.base, ref: refs.setFloating, "data-testid": "flowbite-popover", ...props, style: floatingStyles, ...getFloatingProps(), children: (0, jsx_runtime_1.jsxs)("div", { className: "relative", children: [arrow && ((0, jsx_runtime_1.jsx)("div", { className: theme.arrow.base, "data-testid": "flowbite-popover-arrow", ref: arrowRef, style: {
                                    top: arrowY ?? ' ',
                                    left: arrowX ?? ' ',
                                    right: ' ',
                                    bottom: ' ',
                                    [(0, helpers_1.getArrowPlacement)({ placement })]: theme.arrow.placement,
                                }, children: "\u00A0" })), (0, jsx_runtime_1.jsx)("div", { className: theme.content, children: content })] }) }) }))] }));
}
exports.Popover = Popover;
