import { call, put, take, takeLatest } from "redux-saga/effects";
import { USER_REGISTER_API } from "../constants/AdminConstants";
import { loginServices } from "../../services/LoginServices";
import { STATUS_CODE, TOKEN } from "../../util/constants/settingSystem";

function* signUpSaga(action) {
  try {
    // console.log(action);

    const {data, status} = yield call(() => loginServices.signUp(action.userRegister));

    // console.log(data);
    if (status === STATUS_CODE.SUCCESS) {
      alert("Tạo người dùng thành công");
    }

    // console.log(promise);
  } catch (error) {
    console.log(error.response.data);
  }
}

export function* watchSignUpSagaAction() {
  yield takeLatest(USER_REGISTER_API, signUpSaga);
}
