import { PayloadAction } from "@reduxjs/toolkit";
import { Effect, ForkEffect, call, put, takeEvery } from "redux-saga/effects";
import { signInActions } from "./signInSlice";
import { authService } from "../../services/AuthService";
import { appActions } from "../app/appSlice";
// import { useNavigate } from "react-router-dom";

function* signInAsync(action: PayloadAction<[string, string, (path: string) => void]>): Generator<Effect, void> {
  try {
    yield put(signInActions.setLoading(true));

    const result = (yield call(authService.authenticate, action.payload[0], action.payload[1])) as any as { profileId: string, token: string } | undefined;
    if (!result) {
      yield put(signInActions.setErrorMessage('Неверное имя пользователя или пароль.'));
    } else {
      yield put(signInActions.cleanFormData());


      yield put(appActions.authenticated([result.profileId, result.token, action.payload[2]]));

      // authService.setData(action.payload[0], action.payload[1]);
      // yield put(appActions.setData(action.payload));
      // useNavigate()("/app");
    }
  } catch(err) {
    yield put(signInActions.setErrorMessage('Ошибка запроса. Повторите позже.'));
  } finally {
    yield put(signInActions.setLoading(false));
  }
}

function* watchSignInSagas(): Generator<ForkEffect, void> {
  yield takeEvery(signInActions.signIn, signInAsync);
}

export const signInSagas = watchSignInSagas;