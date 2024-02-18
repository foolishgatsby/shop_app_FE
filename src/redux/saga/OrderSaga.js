import { call, takeLatest } from "redux-saga/effects";
import { orderServices } from "../../services/OrderServices";
import { STATUS_CODE } from "../../util/constants/settingSystem";

function* orderSaga(action) {
  console.log(action);
  try {
    const { data, status } = yield call(() =>
      orderServices.order(action.orderInfo)
    );
    if (status === STATUS_CODE.SUCCESS) {
      alert("Bạn đã đặt hàng thành công");
    }
  } catch (error) {
    console.log(error);
  }
}

export function* watchOrderSagaAction() {
  yield takeLatest("PAYMENT_API", orderSaga);
}
