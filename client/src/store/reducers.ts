import { Reducer } from "@reduxjs/toolkit";
import { Actions, Transaction } from "../types";

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

const reducer: Reducer = (state = initialState, action): RootState => {
  switch (action.type) {
    // Define your actions
    case Actions.ChangeAccount:
      console.log(action, action.payload);
      return {
        ...state,
        currentAccount: action.payload,
      };
    case Actions.StartTransaction:
      return { ...state, transactionState: TransactionState.STARTED };
    case Actions.TransactionFailed:
      return { ...state, transactionState: TransactionState.FAILED };
    case Actions.TransactionSuccessful:
      console.log("Adding tx", action.payload);
      return {
        ...state,
        transactionState: TransactionState.SUCCESSFUL,
        transactions: [...state.transactions, action.payload],
      };
    case Actions.TransactionIdle:
      return { ...state, transactionState: TransactionState.IDLE };
    default:
      return state;
  }
};

export default reducer;
