'use client';
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { cloneElement, isValidElement, useMemo, useRef, useState } from 'react';
import { FloatingFocusManager, useMergeRefs } from '@floating-ui/react';
import { mergeDeep } from '../../helpers/merge-deep';
import { getTheme } from '../../theme-store';
import { useBaseFLoating, useFloatingInteractions } from '../../hooks/use-floating';
import { getArrowPlacement } from '../Floating/helpers';
export function Popover({ children, content, theme: customTheme = {}, arrow = true, trigger = 'click', initialOpen, open: controlledOpen, onOpenChange: setControlledOpen, placement: theirPlacement = 'bottom', ...props }) {
    const [uncontrolledOpen, setUncontrolledOpen] = useState(Boolean(initialOpen));
    const arrowRef = useRef(null);
    const theme = mergeDeep(getTheme().popover, customTheme);
    const open = controlledOpen ?? uncontrolledOpen;
    const setOpen = setControlledOpen ?? setUncontrolledOpen;
    const floatingProps = useBaseFLoating({
        open,
        placement: theirPlacement,
        arrowRef,
        setOpen,
    });
    const { floatingStyles, context, placement, middlewareData: { arrow: { x: arrowX, y: arrowY } = {} }, refs, } = floatingProps;
    const { getFloatingProps, getReferenceProps } = useFloatingInteractions({
        context,
        role: 'dialog',
        trigger,
    });
    const childrenRef = children.ref;
    const ref = useMergeRefs([context.refs.setReference, childrenRef]);
    if (!isValidElement(children)) {
        throw Error('Invalid target element');
    }
    const target = useMemo(() => {
        return cloneElement(children, getReferenceProps({
            ref,
            'data-testid': 'flowbite-popover-target',
            ...children?.props,
        }));
    }, [children, ref, getReferenceProps]);
    return (_jsxs(_Fragment, { children: [target, open && (_jsx(FloatingFocusManager, { context: context, modal: true, children: _jsx("div", { className: theme.base, ref: refs.setFloating, "data-testid": "flowbite-popover", ...props, style: floatingStyles, ...getFloatingProps(), children: _jsxs("div", { className: "relative", children: [arrow && (_jsx("div", { className: theme.arrow.base, "data-testid": "flowbite-popover-arrow", ref: arrowRef, style: {
                                    top: arrowY ?? ' ',
                                    left: arrowX ?? ' ',
                                    right: ' ',
                                    bottom: ' ',
                                    [getArrowPlacement({ placement })]: theme.arrow.placement,
                                }, children: "\u00A0" })), _jsx("div", { className: theme.content, children: content })] }) }) }))] }));
}
