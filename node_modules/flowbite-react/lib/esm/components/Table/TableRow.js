'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import { forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';
import { mergeDeep } from '../../helpers/merge-deep';
import { useTableContext } from './TableContext';
export const TableRow = forwardRef(({ children, className, theme: customTheme = {}, ...props }, ref) => {
    const { theme: rootTheme, hoverable, striped } = useTableContext();
    const theme = mergeDeep(rootTheme.row, customTheme);
    return (_jsx("tr", { ref: ref, "data-testid": "table-row-element", className: twMerge(theme.base, striped && theme.striped, hoverable && theme.hovered, className), ...props, children: children }));
});
TableRow.displayName = 'Table.Row';
