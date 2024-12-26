"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = __importStar(require("react"));
const classnames_1 = __importDefault(require("classnames"));
const debounce_1 = __importDefault(require("debounce"));
const SCROLL_END_DEBOUNCE = 300;
const LEFT_BUTTON = 0;
class ScrollContainer extends react_1.PureComponent {
    static defaultProps = {
        nativeMobileScroll: true,
        hideScrollbars: true,
        activationDistance: 10,
        vertical: true,
        horizontal: true,
        stopPropagation: false,
        style: {},
        buttons: [LEFT_BUTTON],
    };
    container;
    scrolling;
    started;
    pressed;
    isMobile = false;
    internal;
    scrollLeft;
    scrollTop;
    clientX;
    clientY;
    constructor(props) {
        super(props);
        this.container = react_1.default.createRef();
        this.onEndScroll = (0, debounce_1.default)(this.onEndScroll, SCROLL_END_DEBOUNCE);
        // Is container scrolling now (for example by inertia)
        this.scrolling = false;
        // Is scrolling started
        this.started = false;
        // Is touch active or mouse pressed down
        this.pressed = false;
        // Is event internal
        this.internal = false;
        // Bind callbacks
        this.getRef = this.getRef.bind(this);
    }
    componentDidMount() {
        const { nativeMobileScroll } = this.props;
        const container = this.container.current;
        window.addEventListener('mouseup', this.onMouseUp);
        window.addEventListener('mousemove', this.onMouseMove);
        window.addEventListener('touchmove', this.onTouchMove, { passive: false });
        window.addEventListener('touchend', this.onTouchEnd);
        // due to https://github.com/facebook/react/issues/9809#issuecomment-414072263
        container.addEventListener('touchstart', this.onTouchStart, {
            passive: false,
        });
        container.addEventListener('mousedown', this.onMouseDown, {
            passive: false,
        });
        if (nativeMobileScroll) {
            // We should check if it's the mobile device after page was loaded
            // to prevent breaking SSR
            this.isMobile = this.isMobileDevice();
            // If it's the mobile device, we should rerender to change styles
            if (this.isMobile) {
                this.forceUpdate();
            }
        }
    }
    componentWillUnmount() {
        window.removeEventListener('mouseup', this.onMouseUp);
        window.removeEventListener('mousemove', this.onMouseMove);
        window.removeEventListener('touchmove', this.onTouchMove);
        window.removeEventListener('touchend', this.onTouchEnd);
    }
    getElement() {
        return this.container.current;
    }
    isMobileDevice() {
        return typeof window.orientation !== 'undefined' || navigator.userAgent.indexOf('IEMobile') !== -1;
    }
    isDraggable(target) {
        const ignoreElements = this.props.ignoreElements;
        if (ignoreElements) {
            const closest = target.closest(ignoreElements);
            return closest === null || closest.contains(this.getElement());
        }
        else {
            return true;
        }
    }
    isScrollable() {
        const container = this.container.current;
        return (container && (container.scrollWidth > container.clientWidth || container.scrollHeight > container.clientHeight));
    }
    // Simulate 'onEndScroll' event that fires when scrolling is stopped
    onEndScroll = () => {
        this.scrolling = false;
        if (!this.pressed && this.started) {
            this.processEnd();
        }
    };
    onScroll = () => {
        const container = this.container.current;
        // Ignore the internal scrolls
        if (container.scrollLeft !== this.scrollLeft || container.scrollTop !== this.scrollTop) {
            this.scrolling = true;
            this.processScroll();
            this.onEndScroll();
        }
    };
    onTouchStart = (e) => {
        const { nativeMobileScroll } = this.props;
        if (this.isDraggable(e.target)) {
            this.internal = true;
            if (nativeMobileScroll && this.scrolling) {
                this.pressed = true;
            }
            else {
                const touch = e.touches[0];
                this.processClick(touch.clientX, touch.clientY);
                if (!nativeMobileScroll && this.props.stopPropagation) {
                    e.stopPropagation();
                }
            }
        }
    };
    onTouchEnd = () => {
        const { nativeMobileScroll } = this.props;
        if (this.pressed) {
            if (this.started && (!this.scrolling || !nativeMobileScroll)) {
                this.processEnd();
            }
            else {
                this.pressed = false;
            }
            this.forceUpdate();
        }
    };
    onTouchMove = (e) => {
        const { nativeMobileScroll } = this.props;
        if (this.pressed && (!nativeMobileScroll || !this.isMobile)) {
            const touch = e.touches[0];
            if (touch) {
                this.processMove(touch.clientX, touch.clientY);
            }
            e.preventDefault();
            if (this.props.stopPropagation) {
                e.stopPropagation();
            }
        }
    };
    onMouseDown = (e) => {
        if (this.isDraggable(e.target) && this.isScrollable()) {
            this.internal = true;
            if (this.props?.buttons?.indexOf(e.button) !== -1) {
                this.processClick(e.clientX, e.clientY);
                e.preventDefault();
                if (this.props.stopPropagation) {
                    e.stopPropagation();
                }
            }
        }
    };
    onMouseMove = (e) => {
        if (this.pressed) {
            this.processMove(e.clientX, e.clientY);
            e.preventDefault();
            if (this.props.stopPropagation) {
                e.stopPropagation();
            }
        }
    };
    onMouseUp = (e) => {
        if (this.pressed) {
            if (this.started) {
                this.processEnd();
            }
            else {
                this.internal = false;
                this.pressed = false;
                this.forceUpdate();
                if (this.props.onClick) {
                    this.props.onClick(e);
                }
            }
            e.preventDefault();
            if (this.props.stopPropagation) {
                e.stopPropagation();
            }
        }
    };
    processClick(clientX, clientY) {
        const container = this.container.current;
        this.scrollLeft = container?.scrollLeft;
        this.scrollTop = container?.scrollTop;
        this.clientX = clientX;
        this.clientY = clientY;
        this.pressed = true;
    }
    processStart(changeCursor = true) {
        const { onStartScroll } = this.props;
        this.started = true;
        // Add the class to change displayed cursor
        if (changeCursor) {
            document.body.classList.add('cursor-grab');
        }
        if (onStartScroll) {
            onStartScroll({
                external: !this.internal,
            });
        }
        this.forceUpdate();
    }
    // Process native scroll (scrollbar, mobile scroll)
    processScroll() {
        if (this.started) {
            const { onScroll } = this.props;
            if (onScroll) {
                onScroll({
                    external: !this.internal,
                });
            }
        }
        else {
            this.processStart(false);
        }
    }
    // Process non-native scroll
    processMove(newClientX, newClientY) {
        const { horizontal, vertical, activationDistance, onScroll } = this.props;
        const container = this.container.current;
        if (!this.started) {
            if ((horizontal && Math.abs(newClientX - this.clientX) > activationDistance) ||
                (vertical && Math.abs(newClientY - this.clientY) > activationDistance)) {
                this.clientX = newClientX;
                this.clientY = newClientY;
                this.processStart();
            }
        }
        else {
            if (horizontal) {
                container.scrollLeft -= newClientX - this.clientX;
            }
            if (vertical) {
                container.scrollTop -= newClientY - this.clientY;
            }
            if (onScroll) {
                onScroll({ external: !this.internal });
            }
            this.clientX = newClientX;
            this.clientY = newClientY;
            this.scrollLeft = container.scrollLeft;
            this.scrollTop = container.scrollTop;
        }
    }
    processEnd() {
        const { onEndScroll } = this.props;
        const container = this.container.current;
        if (container && onEndScroll) {
            onEndScroll({
                external: !this.internal,
            });
        }
        this.pressed = false;
        this.started = false;
        this.scrolling = false;
        this.internal = false;
        document.body.classList.remove('cursor-grab');
        this.forceUpdate();
    }
    getRef(el) {
        [this.container, this.props.innerRef].forEach((ref) => {
            if (ref) {
                if (typeof ref === 'function') {
                    ref(el);
                }
                else {
                    ref.current = el;
                }
            }
        });
    }
    render() {
        const { children, draggingClassName, className, style, hideScrollbars } = this.props;
        return ((0, jsx_runtime_1.jsx)("div", { className: (0, classnames_1.default)(className, this.pressed && draggingClassName, {
                '!scroll-auto [&>*]:pointer-events-none [&>*]:cursor-grab': this.pressed,
                'overflow-auto': this.isMobile,
                'overflow-hidden !overflow-x-hidden [overflow:-moz-scrollbars-none] [scrollbar-width:none]': hideScrollbars,
                '[&::-webkit-scrollbar]:[-webkit-appearance:none !important] [&::-webkit-scrollbar]:!hidden [&::-webkit-scrollbar]:!h-0 [&::-webkit-scrollbar]:!w-0 [&::-webkit-scrollbar]:!bg-transparent': hideScrollbars,
            }), style: style, ref: this.getRef, onScroll: this.onScroll, children: children }));
    }
}
exports.default = ScrollContainer;
