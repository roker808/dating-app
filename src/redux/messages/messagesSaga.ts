import { PayloadAction } from "@reduxjs/toolkit";
import { Effect, ForkEffect, call, put, takeEvery } from "redux-saga/effects";
import { messagingService } from "../../services/MessagingService";
import { IDialog } from "../../services/IDialog";
import { IMessage } from "../../services/IMessage";
import { messagesActions } from "./messagesSlice";
import { profilesService } from "../../services/ProfilesService";
import { IProfile } from "../../services/Profile";

function* fetchMessages(action: PayloadAction<[string, string]>): Generator<Effect, void> {
  const messagesFound = (yield call(messagingService.getMessages, action.payload[0], action.payload[1])) as any as IMessage[];
  yield put(messagesActions.messagesFetched(messagesFound));
}

function* fetchOtherProfile(action: PayloadAction<string>): Generator<Effect, void> {
  const profileFound = (yield call(profilesService.find, action.payload)) as any as IProfile;
  yield put(messagesActions.otherProfileFetched(profileFound));
}

function* addNewMessage(action: PayloadAction<[string, string, string]>): Generator<Effect, void> {
  const messageAdded = (yield call(messagingService.add, action.payload[0], action.payload[1], action.payload[2])) as any as IMessage;
  yield put(messagesActions.newMessageAdded(messageAdded));
}

function* wathMessagesSagas(): Generator<ForkEffect, void> {
  yield takeEvery(messagesActions.fetchMessages, fetchMessages);
  yield takeEvery(messagesActions.fetchOtherProfile, fetchOtherProfile);
  yield takeEvery(messagesActions.addNewMessage, addNewMessage);
}

export const messagesSaga = wathMessagesSagas;