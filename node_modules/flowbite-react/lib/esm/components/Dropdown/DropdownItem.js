'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useListItem, useMergeRefs } from '@floating-ui/react';
import { forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';
import { mergeDeep } from '../../helpers/merge-deep';
import { ButtonBase } from '../Button/ButtonBase';
import { useDropdownContext } from './DropdownContext';
export const DropdownItem = forwardRef(({ children, className, icon: Icon, onClick, theme: customTheme = {}, ...props }, forwardedRef) => {
    const { ref: listItemRef, index } = useListItem({ label: typeof children === 'string' ? children : undefined });
    const ref = useMergeRefs([forwardedRef, listItemRef]);
    const { theme: rootTheme, activeIndex, dismissOnClick, getItemProps, handleSelect } = useDropdownContext();
    const isActive = activeIndex === index;
    const theme = mergeDeep(rootTheme.floating.item, customTheme);
    const theirProps = props;
    return (_jsx("li", { role: "menuitem", className: theme.container, children: _jsxs(ButtonBase, { ref: ref, className: twMerge(theme.base, className), ...theirProps, ...getItemProps({
                onClick: () => {
                    onClick && onClick();
                    dismissOnClick && handleSelect(null);
                },
            }), tabIndex: isActive ? 0 : -1, children: [Icon && _jsx(Icon, { className: theme.icon }), children] }) }));
});
DropdownItem.displayName = 'DropdownItem';
