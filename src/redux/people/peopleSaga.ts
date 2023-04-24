import { Effect, ForkEffect, call, put, takeEvery } from "redux-saga/effects";
import { profilesService } from "../../services/ProfilesService";
import { IProfile } from "../../services/Profile";
import { peopleActions } from "./peopleSlice";

function* fetchProfiles(): Generator<Effect, void> {
  const found = (yield call(profilesService.get)) as any as IProfile[];
  yield put(peopleActions.profilesFetched(found));
}


function* watchPeopleSagas(): Generator<ForkEffect, void> {
  yield takeEvery(peopleActions.fetchProfiles, fetchProfiles);
}

export const peopleSagas = watchPeopleSagas;