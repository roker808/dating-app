import { PayloadAction } from "@reduxjs/toolkit";
import { Effect, ForkEffect, call, put, takeEvery } from "redux-saga/effects";
import { profilesService } from "../../services/ProfilesService";
import { IProfile } from "../../services/Profile";
import { personActions } from "./personSlice";

function* fetchProfile(action: PayloadAction<string>): Generator<Effect, void> {
  yield put(personActions.loading(true));
  const profileFound = (yield call(profilesService.find, action.payload)) as any as IProfile;
  yield put(personActions.profileFetched(profileFound));
  yield put(personActions.loading(false));
}

function* wathPersonSagas(): Generator<ForkEffect, void> {
  yield takeEvery(personActions.fetchProfile, fetchProfile);
}

export const personSaga = wathPersonSagas;