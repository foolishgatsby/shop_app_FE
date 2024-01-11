import { adminServices } from "../../services/AdminServices";
import { STATUS_CODE } from "../../util/constants/settingSystem";
import { updateProductTable } from "../actions/NormalActions";
import { GET_PRODUCT_BY_CATEGORY_API } from "../constants/AdminConstants";
import { call, delay, put, takeLatest } from "redux-saga/effects";

function* getProductByCategorySaga(action) {
  try {
    const { data, status } = yield call(() =>
      adminServices.getProductByCategory(action.categoryId)
    );

    if (status === STATUS_CODE.SUCCESS) {
      yield put(updateProductTable(data));
    }
  } catch (err) {}
}

// Saga action sử dụng để lấy sản phẩm theo category
export function* watchGetProductByCategorySagaAction() {
  yield takeLatest(GET_PRODUCT_BY_CATEGORY_API, getProductByCategorySaga);
}
