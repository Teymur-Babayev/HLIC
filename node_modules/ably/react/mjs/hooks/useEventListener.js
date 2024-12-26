import { useEffect, useRef } from 'react';
export function useEventListener(emitter, listener, event) {
    const savedListener = useRef(listener);
    useEffect(() => {
        savedListener.current = listener;
    }, [listener]);
    useEffect(() => {
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
//# sourceMappingURL=useEventListener.js.map