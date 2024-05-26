import { Reducer } from "@reduxjs/toolkit";
import { Actions, Transaction } from "../types";
import { formatEther } from "ethers";

export enum TransactionState {
  IDLE,
  STARTED,
  SUCCESSFUL,
  FAILED,
}

// Define the state type
export interface RootState {
  transactions: Transaction[];
  currentAccount: string | null;
  transactionState: TransactionState;
}

// Initial state
const initialState: RootState = {
  transactions: [],
  currentAccount: null,
  transactionState: TransactionState.IDLE,
};

function formatTransaction(t: Transaction): Transaction {
  return {
    ...t,
    value: formatEther(t.value),
  };
}

const reducer: Reducer = (state = initialState, action): RootState => {
  switch (action.type) {
    // Define your actions
    case Actions.InitTransactions:
      console.log("init", action.payload);
      return {
        ...state,
        transactions: action.payload.map(formatTransaction),
      };
    case Actions.ChangeAccount:
      return {
        ...state,
        currentAccount: action.payload,
      };
    case Actions.StartTransaction:
      return { ...state, transactionState: TransactionState.STARTED };
    case Actions.TransactionFailed:
      return { ...state, transactionState: TransactionState.FAILED };
    case Actions.TransactionSuccessful:
      return {
        ...state,
        transactionState: TransactionState.SUCCESSFUL,
        transactions: [
          ...state.transactions,
          formatTransaction(action.payload),
        ],
      };
    case Actions.TransactionIdle:
      return { ...state, transactionState: TransactionState.IDLE };
    default:
      return state;
  }
};

export default reducer;
