import { call, put, takeLatest } from "redux-saga/effects";
import { USER_SIGNIN_API } from "../constants/AdminConstants";
import { loginServices } from "../../services/LoginServices";
import {
  STATUS_CODE,
  TOKEN,
  USER_LOGIN,
  USER_EMAIL,
} from "../../util/constants/settingSystem";
import { isLoginAction } from "../actions/NormalActions";

function* signInSaga(action) {
  // loading effect
  // console.log(action.userLogin);
  // call api signin
  try {
    const { data, status } = yield call(loginServices.signIn, action.userLogin);

    // đăng nhập thành công => lưu token vào local storage
    if (status === STATUS_CODE.SUCCESS) {
      localStorage.setItem(TOKEN, data.token);
      localStorage.setItem(USER_EMAIL, action.userLogin.email);
      localStorage.setItem("role", action.userLogin.role_id);
      // alert("Đăng nhập thành công!");

      // put action đã đăng nhập thành công
      yield put(
        isLoginAction(true, action.userLogin.role_id, action.userLogin.email)
      );
    }
  } catch (error) {
    // console.log(error.response.data);
    alert("Đăng nhập không thành công!\nKiểm tra lại thông tin đăng nhập");
  }
  // hide loading effect
}

export function* watchSignInSagaAction() {
  yield takeLatest(USER_SIGNIN_API, signInSaga);
}
