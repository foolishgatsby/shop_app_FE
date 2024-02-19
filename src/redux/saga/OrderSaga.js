import { call, put, take, takeLatest } from "redux-saga/effects";
import { orderServices } from "../../services/OrderServices";
import { STATUS_CODE } from "../../util/constants/settingSystem";
import { CLOSE_DRAWER } from "../constants/DrawerConstants";

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

function* getAllOrderSaga(action) {
  try {
    const { data, status } = yield call(() => orderServices.getAllOrder());
    if (status === STATUS_CODE.SUCCESS) {
      console.log(data.orders);
      yield put({
        type: "UPDATE_ALL_ORDERS",
        arrOrders: data.orders,
      });
      yield put({
        type: "SET_LOADING_ORDER",
        loading: false,
      });
    }
  } catch (error) {
    console.log(error.response.data);
  }
}

export function* watchGetAllOrderSagaAction() {
  yield takeLatest("GET_ALL_ORDER_API", getAllOrderSaga);
}

function* deleteOrderSga(action) {
  try {
    console.log(action.order_id);
    const { data, status } = yield call(() =>
      orderServices.deleteOrder(action.order_id)
    );
    if (status === STATUS_CODE.SUCCESS) {
      // console.log(data);
      yield put({
        type: "SET_LOADING_ORDER",
        loading: true,
      });
      yield put({
        type: "GET_ALL_ORDER_API",
      });
    }
  } catch (error) {
    console.log(error);
  }
}

export function* watchDeleteOrderSagaAction() {
  yield takeLatest("DELETE_ORDER_API", deleteOrderSga);
}

function* getEditOrderDetail(action) {
  try {
    const { data, status } = yield call(() =>
      orderServices.getOrderDetailByID(action.order_id)
    );
    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: "SET_EDIT_ORDER",
        orderEdit: data,
      });
      yield put({
        type: "DONE_API",
        doneApi: true,
      });
    }
  } catch (error) {
    console.log(error.response.data);
  }
}

export function* watchGetEditOrderDetailSagaAction() {
  yield takeLatest("GET_EDIT_ORDER_DETAIL", getEditOrderDetail);
}

function* editOrderSaga(action) {
  try {
    const { data, status } = yield call(() =>
      orderServices.editOrderDetail(action.editOrder)
    );
    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: CLOSE_DRAWER,
      });
      yield put({
        type: "GET_ALL_ORDER_API",
      });
    }
  } catch (error) {
    console.log(error.response.data);
  }
}

export function* watchEditOrderSagaAction() {
  yield takeLatest("EDIT_ORDER_API", editOrderSaga);
}
