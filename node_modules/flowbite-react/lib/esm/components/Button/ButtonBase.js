import { createElement, forwardRef } from 'react';
export const ButtonBase = forwardRef(({ children, as: Component, href, type = 'button', ...props }, ref) => {
    const BaseComponent = Component || (href ? 'a' : 'button');
    return createElement(BaseComponent, { ref, href, type, ...props }, children);
});
ButtonBase.displayName = 'ButtonBaseComponent';
