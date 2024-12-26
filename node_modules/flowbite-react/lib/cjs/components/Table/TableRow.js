"use strict";
'use client';
Object.defineProperty(exports, "__esModule", { value: true });
exports.TableRow = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const tailwind_merge_1 = require("tailwind-merge");
const merge_deep_1 = require("../../helpers/merge-deep");
const TableContext_1 = require("./TableContext");
exports.TableRow = (0, react_1.forwardRef)(({ children, className, theme: customTheme = {}, ...props }, ref) => {
    const { theme: rootTheme, hoverable, striped } = (0, TableContext_1.useTableContext)();
    const theme = (0, merge_deep_1.mergeDeep)(rootTheme.row, customTheme);
    return ((0, jsx_runtime_1.jsx)("tr", { ref: ref, "data-testid": "table-row-element", className: (0, tailwind_merge_1.twMerge)(theme.base, striped && theme.striped, hoverable && theme.hovered, className), ...props, children: children }));
});
exports.TableRow.displayName = 'Table.Row';
