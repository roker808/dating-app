import { PayloadAction } from "@reduxjs/toolkit";
import { Effect, ForkEffect, call, put, takeEvery } from "redux-saga/effects";
import { dialogsActions } from "./dialogsSlice";
import { messagingService } from "../../services/MessagingService";
import { IDialog } from "../../services/IDialog";

function* fetchDialogs(action: PayloadAction<string>): Generator<Effect, void> {
  const dialogsFound = (yield call(messagingService.getDialogs, action.payload)) as any as IDialog[];
  yield put(dialogsActions.dialogsFetched(dialogsFound));
}

function* wathDialogsSagas(): Generator<ForkEffect, void> {
  yield takeEvery(dialogsActions.fetchDialogs, fetchDialogs);
}

export const dialogsSaga = wathDialogsSagas;