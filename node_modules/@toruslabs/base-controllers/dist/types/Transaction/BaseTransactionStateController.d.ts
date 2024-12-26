import BaseController from "../BaseController";
import { TransactionConfig, TransactionMeta, TransactionState, TransactionStatus } from "./ITransactionController";
export declare class BaseTransactionStateManager<T, U extends TransactionMeta<T> = TransactionMeta<T>> extends BaseController<TransactionConfig, TransactionState<T, U>> {
    protected getCurrentChainId: () => string;
    constructor({ config, state, getCurrentChainId, }: {
        config?: Partial<TransactionConfig>;
        state?: Partial<TransactionState<T, U>>;
        getCurrentChainId: () => string;
    });
    getUnapprovedTxList(): Record<string, U>;
    getTransaction(txId: string): U;
    updateTransaction(txMeta: U): void;
    setTxStatusRejected(txId: string): void;
    /**
     * The implementing controller can override this functionality and add custom logic + call super.()
     */
    setTxStatusUnapproved(txId: string): void;
    setTxStatusApproved(txId: string): void;
    setTxStatusSigned(txId: string, isFinalStep?: boolean): void;
    setTxStatusSubmitted(txId: string): void;
    setTxStatusDropped(txId: string): void;
    setTxStatusExpired(txId: string): void;
    setTxStatusConfirmed(txId: string): void;
    setTxStatusFailed(txId: string, error_: Error): void;
    /**
     * Method to determine if the transaction is in a final state
     * @param status - Transaction status
     * @returns boolean if the transaction is in a final state
     */
    isFinalState(status: TransactionStatus): boolean;
    /**
     * Filters out the unapproved transactions from state
     */
    clearUnapprovedTxs(): void;
    /**
     * will append new transactions to old txns.
     */
    _addTransactionsToState(transactions: U[]): void;
    /**
     * will set new txns, override existing if any in state.
     */
    _setTransactionsToState(transactions: U[]): void;
    _deleteTransaction(targetTransactionId: string): void;
    _deleteTransactions(targetTransactionIds: string[]): void;
    protected _setTransactionStatus(txId: string, status: TransactionStatus, isFinalStep?: boolean): void;
}
