"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useEventListener = void 0;
const react_1 = require("react");
function useEventListener(emitter, listener, event) {
    const savedListener = (0, react_1.useRef)(listener);
    (0, react_1.useEffect)(() => {
        savedListener.current = listener;
    }, [listener]);
    (0, react_1.useEffect)(() => {
        if (event) {
            emitter.on(event, savedListener.current);
        }
        else {
            emitter.on(listener);
        }
        return () => {
            if (event) {
                emitter.off(event, listener);
            }
            else {
                emitter.off(listener);
            }
        };
    }, [emitter, event, listener]);
}
exports.useEventListener = useEventListener;
//# sourceMappingURL=useEventListener.js.map