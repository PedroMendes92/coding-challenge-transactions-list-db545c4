import { takeEvery, put } from "redux-saga/effects";
import {
  Transaction,
  TransactionResponse,
  TransactionReceipt,
  BrowserProvider,
  Signer,
  parseEther,
} from "ethers";

import apolloClient from "../apollo/client";
import { Actions, AddTransactionData } from "../types";
import { SaveTransaction } from "../queries";
import { navigate } from "../components/NaiveRouter";

function* sendTransaction(data: any) {
  const walletProvider = new BrowserProvider(window.web3.currentProvider);

  const signer: Signer = yield walletProvider.getSigner();

  const transaction = {
    to: data.payload.recipient,
    value: parseEther(data.payload.amount.toString()),
  };

  try {
    const txResponse: TransactionResponse = yield signer.sendTransaction(
      transaction
    );
    const response: TransactionReceipt = yield txResponse.wait();

    const receipt: Transaction = yield response.getTransaction();

    const variables = {
      transaction: {
        gasLimit: (receipt.gasLimit && receipt.gasLimit.toString()) || "0",
        gasPrice: (receipt.gasPrice && receipt.gasPrice.toString()) || "0",
        to: receipt.to,
        from: receipt.from,
        value: (receipt.value && receipt.value.toString()) || "",
        data: receipt.data || null,
        chainId: (receipt.chainId && receipt.chainId.toString()) || "123456",
        hash: receipt.hash,
      },
    };

    const result: AddTransactionData = yield apolloClient.mutate({
      mutation: SaveTransaction,
      variables,
    });

    yield put({
      type: Actions.TransactionSuccessful,
      payload: result.data.addTransaction,
    });
  } catch (error) {
    console.error(error);
    yield put({ type: Actions.TransactionFailed });
  }
}

export function* rootSaga() {
  yield takeEvery(Actions.SendTransaction, sendTransaction);
}
