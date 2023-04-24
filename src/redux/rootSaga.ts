import { all, fork, AllEffect, ForkEffect } from 'redux-saga/effects';
import { signInSagas } from './signin/signinSaga';
import { appSaga as appSagas } from './app/appSaga';
import { peopleSagas } from './people/peopleSaga';
import { personSaga } from './person/personSaga';
import { dialogsSaga } from './dialogs/dialogsSaga';

export default function* rootSaga(): Generator<
  AllEffect<ForkEffect<void>>,
  void,
  unknown
> {
  yield all([
    fork(signInSagas),
    fork(appSagas),
    fork(peopleSagas),
    fork(personSaga),
    fork(dialogsSaga)
  ]);
}
