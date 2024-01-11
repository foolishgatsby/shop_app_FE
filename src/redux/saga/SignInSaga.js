import { call, takeLatest } from "redux-saga/effects";
import { USER_SIGNIN_API } from "../constants/AdminConstants";
import { loginServices } from "../../services/LoginServices";

function* signInSaga(action) {
  // loading effect
  console.log(action.userLogin);
  // call api signin
  try {
    const { data, status } = yield call(() => {
      loginServices.signIn(action.userLogin);
    });
  } catch (error) {
    console.log(error);
  }
  // hide loading effect
}

export function* watchSignInSagaAction() {
  yield takeLatest(USER_SIGNIN_API, signInSaga);
}
