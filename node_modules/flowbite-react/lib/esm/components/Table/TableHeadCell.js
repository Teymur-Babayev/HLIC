'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import { forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';
import { mergeDeep } from '../../helpers/merge-deep';
import { useTableHeadContext } from './TableHeadContext';
export const TableHeadCell = forwardRef(({ children, className, theme: customTheme = {}, ...props }, ref) => {
    const { theme: headTheme } = useTableHeadContext();
    const theme = mergeDeep(headTheme.cell, customTheme);
    return (_jsx("th", { className: twMerge(theme.base, className), ref: ref, ...props, children: children }));
});
TableHeadCell.displayName = 'Table.HeadCell';
