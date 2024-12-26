import { IStore, Verify } from "../core";
import { JsonRpcTypes } from "./jsonrpc";
export declare namespace PendingRequestTypes {
    interface Struct {
        topic: string;
        id: number;
        params: JsonRpcTypes.RequestParams["wc_sessionRequest"];
        verifyContext: Verify.Context;
    }
}
export declare type IPendingRequest = IStore<number, PendingRequestTypes.Struct>;
//# sourceMappingURL=pendingRequest.d.ts.map