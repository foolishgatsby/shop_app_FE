import { call, put, takeLatest } from "redux-saga/effects";
import {
  GET_ALL_ACCOUNT_API,
  UPDATE_ALL_ACCOUNT,
} from "../constants/AccountConstants";
import { adminServices } from "../../services/AdminServices";
import { STATUS_CODE } from "../../util/constants/settingSystem";
import { CLOSE_DRAWER } from "../constants/DrawerConstants";

function* getAllAccountSaga(action) {
  try {
    const { data, status } = yield call(() => adminServices.getAllAccount());

    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: "SET_LOADING",
        loading: false,
      });
      yield put({
        type: UPDATE_ALL_ACCOUNT,
        arrAccount: data,
      });
    }
  } catch (err) {
    console.log(err.response.data);
  }
}

export function* watchGetAllAccountSagaAction() {
  yield takeLatest(GET_ALL_ACCOUNT_API, getAllAccountSaga);
}

function* editAccountSaga(action) {
  try {
    const { data, status } = yield call(() =>
      adminServices.editAccount(action.editAccount)
    );

    if (status === STATUS_CODE.SUCCESS) {
      alert("Cập nhật thành công");
      // gọi api tắt drawer
      yield put({
        type: CLOSE_DRAWER,
      });
      // call get all account
      yield put({
        type: GET_ALL_ACCOUNT_API,
      });
    }
  } catch (err) {
    console.log(err.response.data);
  }
}

export function* watchEditAccountSagaAction() {
  yield takeLatest("EDIT_ACCOUNT_API", editAccountSaga);
}

function* getUserDetailSaga(action) {
  try {
    const { data, status } = yield call(() => adminServices.getUserDetail());
    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: "SET_USER_DETAIL",
        userDetail: data,
      });
    }
    yield put({
      type: "SET_LOADING_USER_PROFILE",
      loading: false,
    });
  } catch (error) {
    console.log(error.response.data);
  }
}

export function* watchGetUserDetailSagaAction() {
  yield takeLatest("GET_USER_DETAIL", getUserDetailSaga);
}

function* editProfileSaga(action) {
  try {
    const { data, status } = yield call(() =>
      adminServices.editProfile(action.userDetail)
    );

    if (status === STATUS_CODE.SUCCESS) {
      alert("Update success");
      yield put({
        type: "SET_USER_DETAIL",
        userDetail: data,
      });
    }
  } catch (error) {
    console.log(error.response.data);
  }
}

export function* watchEditProfileSagaAction() {
  yield takeLatest("EDIT_PROFILE_API", editProfileSaga);
}
