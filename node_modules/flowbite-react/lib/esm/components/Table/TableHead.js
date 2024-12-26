'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import { forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';
import { mergeDeep } from '../../helpers/merge-deep';
import { useTableContext } from './TableContext';
import { TableHeadContext } from './TableHeadContext';
export const TableHead = forwardRef(({ children, className, theme: customTheme = {}, ...props }, ref) => {
    const { theme: rootTheme } = useTableContext();
    const theme = mergeDeep(rootTheme.head, customTheme);
    return (_jsx(TableHeadContext.Provider, { value: { theme }, children: _jsx("thead", { className: twMerge(theme.base, className), ref: ref, ...props, children: _jsx("tr", { children: children }) }) }));
});
TableHead.displayName = 'Table.Head';
