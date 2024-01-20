import { all } from "redux-saga/effects";
import * as SignInSaga from "./SignInSaga";
import * as SignUpSaga from "./SignUpSaga";

export function* rootSaga() {
  yield all([
    SignInSaga.watchSignInSagaAction(),
    SignUpSaga.watchSignUpSagaAction(),
  ]);
}
