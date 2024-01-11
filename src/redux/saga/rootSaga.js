import { all } from "redux-saga/effects";
import * as SignInSaga from "./SignInSaga";

export function* rootSaga() {
  yield all([SignInSaga.watchSignInSagaAction()]);
}
