import { SafeEventEmitter } from "@toruslabs/openlogin-jrpc";
declare class PopupHandler extends SafeEventEmitter {
    url: URL;
    target: string;
    features: string;
    window: Window;
    windowTimer: number;
    iClosedWindow: boolean;
    timeout: number;
    constructor({ url, target, features, timeout }: {
        url: URL;
        target?: string;
        features?: string;
        timeout?: number;
    });
    _setupTimer(): void;
    open(): Promise<void>;
    close(): void;
    redirect(locationReplaceOnRedirect: boolean): void;
}
export default PopupHandler;
