'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import { forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';
import { mergeDeep } from '../../helpers/merge-deep';
import { useTableBodyContext } from './TableBodyContext';
export const TableCell = forwardRef(({ children, className, theme: customTheme = {}, ...props }, ref) => {
    const { theme: bodyTheme } = useTableBodyContext();
    const theme = mergeDeep(bodyTheme.cell, customTheme);
    return (_jsx("td", { className: twMerge(theme.base, className), ref: ref, ...props, children: children }));
});
TableCell.displayName = 'Table.Cell';
