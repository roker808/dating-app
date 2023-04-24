import { Effect, ForkEffect, call, put, takeEvery } from "redux-saga/effects";
import { authService } from "../../services/AuthService";
import { appActions } from "./appSlice";
import { PayloadAction } from "@reduxjs/toolkit";
import { profilesService } from "../../services/ProfilesService";
import { IProfile } from "../../services/Profile";

function* authenticated(action: PayloadAction<[string, string, (path: string) => void]>): Generator<Effect, void> {
  authService.setData(action.payload[0], action.payload[1]);
  yield put(appActions.setData([action.payload[0], action.payload[1]]));
  action.payload[2]("/");
}

function* signOut(action: PayloadAction<(path: string) => void>): Generator<Effect, void> {
  authService.clearData();
  yield put(appActions.clearData);
  action.payload("/");
}

function* fetchProfile(action: PayloadAction<string>): Generator<Effect, void> {
  const profileFound = (yield call(profilesService.find, action.payload)) as any as IProfile | undefined;
  if (profileFound) {
    yield put(appActions.appProfileFetched(profileFound));
  }
}

function* init(): Generator<Effect, void> {
  if (!authService.isAuthenticated) {
    return;
  }

  yield put(appActions.fetchAppProfile(authService.getData()?.profileId!));
}

function* wathAppSaga(): Generator<ForkEffect, void> {
  yield takeEvery(appActions.authenticated, authenticated);
  yield takeEvery(appActions.signOut, signOut);
  yield takeEvery(appActions.fetchAppProfile, fetchProfile);
  yield takeEvery(appActions.init, init);
}

export const appSaga = wathAppSaga;