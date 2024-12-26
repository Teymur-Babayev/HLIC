import { jsx as _jsx } from "react/jsx-runtime";
import { Children, cloneElement, isValidElement, useMemo } from 'react';
import { twMerge } from 'tailwind-merge';
import { mergeDeep } from '../../helpers/merge-deep';
import { getTheme } from '../../theme-store';
const processChildren = (children, outline, pill) => {
    return Children.map(children, (child, index) => {
        if (isValidElement(child)) {
            // Check if the child has nested children
            if (child.props.children) {
                // Recursively process nested children
                return cloneElement(child, {
                    ...child.props,
                    children: processChildren(child.props.children, outline, pill),
                    positionInGroup: determinePosition(index, Children.count(children)),
                });
            }
            else {
                return cloneElement(child, {
                    outline,
                    pill,
                    positionInGroup: determinePosition(index, Children.count(children)),
                });
            }
        }
        return child;
    });
};
const determinePosition = (index, totalChildren) => {
    return index === 0 ? 'start' : index === totalChildren - 1 ? 'end' : 'middle';
};
export const ButtonGroup = ({ children, className, outline, pill, theme: customTheme = {}, ...props }) => {
    const items = useMemo(() => processChildren(children, outline, pill), [children, outline, pill]);
    const theme = mergeDeep(getTheme().buttonGroup, customTheme);
    return (_jsx("div", { className: twMerge(theme.base, className), role: "group", ...props, children: items }));
};
ButtonGroup.displayName = 'Button.Group';
