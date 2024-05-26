declare global {
  interface Window {
    web3: any;
  }
}

export interface Transaction {
  gasLimit: string;
  gasPrice: string;
  to: string;
  from: string;
  value: string;
  data?: string;
  chainId: string;
  hash: string;
}

export interface TransactionsData {
  getAllTransactions: Transaction[];
}

export interface SingleTransactionData {
  getTransaction: Transaction;
}

export interface AddTransactionData {
  data: {
    addTransaction: Transaction;
  };
}

export type Action<P> = {
  type: Actions;
  payload: P;
};

export enum Actions {
  InitTransactions = "INIT_TRANSACTIONS",
  SendTransaction = "SEND_TRANSACTION",
  ChangeAccount = "CHANGE_ACCOUNT",
  StartTransaction = "START_TRANSACTION",
  TransactionIdle = "IDLE_TRANSACTION",
  TransactionFailed = "FAILED_TRANSACTION",
  TransactionSuccessful = "SUCCESSFUL_TRANSACTION",
}

export type SendTransactionData = {
  amount: number;
  sender: string;
  recipient: string;
};
