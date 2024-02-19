import { call, put, takeLatest } from "redux-saga/effects";
import { evaluateService } from "../../services/EvaluateServices";
import { STATUS_CODE } from "../../util/constants/settingSystem";
import { orderServices } from "../../services/OrderServices";

function* getEvaluatesByProductSaga(action) {
  try {
    const { data, status } = yield call(() =>
      evaluateService.getEvaluatesByProduct(action.product_id)
    );

    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: "UPDATE_EVALUATE_LIST",
        evaluateList: data,
      });
    }
  } catch (error) {
    console.log(error);
  }
}

export function* watchGetEvaluatesByProductSagaAction() {
  yield takeLatest("GET_EVALUATES_BY_PRODUCT_API", getEvaluatesByProductSaga);
}

function* postEvaluateSaga(action) {
  try {
    const { data, status } = yield call(() =>
      evaluateService.postEvaluate(action.evaluateInfo)
    );
    if (status === STATUS_CODE.SUCCESS) {
      alert("Đăng đánh giá thành công");
      yield put({
        type: "GET_EVALUATES_BY_PRODUCT_API",
        product_id: data.product.id,
      });
    }
  } catch (error) {
    console.log(error.response.data);
  }
}

export function* watchPostEvaluateSagaAction() {
  yield takeLatest("POST_EVALUATE_API", postEvaluateSaga);
}

function* getAllEvaluateSaga(action) {
  try {
    const { data, status } = yield call(() => evaluateService.getAllEvaluate());
    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: "SET_ARR_EVALUATE",
        arrEvaluate: data,
      });
      yield put({
        type: "SET_LOADING_EVALUATE",
        loading: false,
      });
    }
  } catch (error) {
    console.log(error.response.data);
  }
}

export function* watchGetAllEvaluateSagaAction() {
  yield takeLatest("GET_ALL_EVALUATE_API", getAllEvaluateSaga);
}

function* deleteEvaluateSaga(action) {
  try {
    const { data, status } = yield call(() =>
      evaluateService.deleteEvaluate(action.evaluate_id)
    );
    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: "GET_ALL_EVALUATE_API",
      });
    }
  } catch (error) {
    console.log(error.response.data);
  }
}

export function* watchDeleteEvaluateSagaAction() {
  yield takeLatest("DELETE_EVALUATE_API", deleteEvaluateSaga);
}
