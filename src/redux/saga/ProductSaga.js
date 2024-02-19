import { adminServices } from "../../services/AdminServices";
import { productServices } from "../../services/ProductServices";
import { STATUS_CODE } from "../../util/constants/settingSystem";
import { updateProductTable } from "../actions/NormalActions";
import { GET_PRODUCT_BY_CATEGORY_API } from "../constants/AdminConstants";
import { call, delay, put, take, takeLatest } from "redux-saga/effects";
import {
  ADD_PRODUCT_API,
  DELETE_PRODUCT_API,
  EDIT_PRODUCT_API,
  GET_PRODUCT_BY_ID_API,
} from "../constants/ProductConstants";
import { CLOSE_DRAWER } from "../constants/DrawerConstants";
import { getProductByCategory_api } from "../actions/ActionsApi";

function* getProductByCategorySaga(action) {
  try {
    const { data, status } = yield call(() =>
      productServices.getProductByCategory(action.categoryId)
    );

    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: "SET_LOADING",
        loading: false,
      });
      yield put(updateProductTable(data.products));
    }
  } catch (err) {
    console.log(err.response.data);
  }
}

// Saga action sử dụng để lấy sản phẩm theo category
export function* watchGetProductByCategorySagaAction() {
  yield takeLatest(GET_PRODUCT_BY_CATEGORY_API, getProductByCategorySaga);
}

function* addProductSaga(action) {
  // console.log(action);
  try {
    const { data, status } = yield call(() =>
      productServices.addProduct(action.newProduct)
    );
    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: CLOSE_DRAWER,
      });
      yield put({
        type: "SET_LOADING",
        loading: false,
      });
      yield put(getProductByCategory_api(data.category.id));
    }
  } catch (error) {
    console.log(error.response.data);
  }
}

export function* watchAddProductSagaAction() {
  yield takeLatest(ADD_PRODUCT_API, addProductSaga);
}

function* deleteProductSaga(action) {
  // console.log(action);
  try {
    const { data, status } = yield call(() =>
      productServices.deleteProduct(action.id)
    );
    if (status === STATUS_CODE.SUCCESS) {
      alert(data);
      yield put({
        type: "SET_LOADING",
        loading: true,
      });
      yield put(getProductByCategory_api(action.category_id));
    }
  } catch (error) {
    alert("Cannot delete the product, check the product id");
  }
}

export function* watchDeleteProductSagaAction() {
  yield takeLatest(DELETE_PRODUCT_API, deleteProductSaga);
}

function* editProductSaga(action) {
  try {
    const { data, status } = yield call(() =>
      productServices.editProduct(action.id, action.editProduct)
    );
    // thành công load lại
    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: CLOSE_DRAWER,
      });
      yield put({
        type: "SET_LOADING",
        loading: false,
      });
      yield put(getProductByCategory_api(data.category.id));
    }
  } catch (error) {
    alert(error.response.data);
  }
}

export function* watchEditProductSagaAction() {
  yield takeLatest(EDIT_PRODUCT_API, editProductSaga);
}

function* getNewProductSaga(action) {
  try {
    const { data, status } = yield call(() => productServices.getNewProduct());
    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: "UPDATE_NEW_PRODUCT",
        newProduct: data.products,
      });
      yield put({
        type: "SET_LOADING",
        loading: false,
      });
    }
  } catch (error) {
    console.log(error.response.data);
  }
}

export function* watchGetNewProductSagaAction() {
  yield takeLatest("GET_NEW_PRODUCT_API", getNewProductSaga);
}

function* getProductByIdSaga(action) {
  try {
    const { data, status } = yield call(() =>
      productServices.getProductById(action.id)
    );
    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: "UPDATE_PRODUCT_DETAIL",
        productDetail: data,
      });
    }
  } catch (error) {
    console.log(error.response.data);
  }
}

export function* watchGetProductByIdSagaAction() {
  yield takeLatest(GET_PRODUCT_BY_ID_API, getProductByIdSaga);
}

function* searchProductSaga(action) {
  try {
    // console.log(action);
    const { data, status } = yield call(() =>
      productServices.searchProduct(action.searchInfo)
    );

    if (status === STATUS_CODE.SUCCESS) {
      // console.log(data);
      yield put({
        type: "SET_SEARCH_PRODUCT_LIST",
        products: data.products,
      });
      yield put({
        type: "SET_LOADING",
        loading: true,
      });
    }
  } catch (error) {
    console.log(error.response.data);
  }
}

export function* watchSearchProductSagaAction() {
  yield takeLatest("SEARCH_PRODUCT_API", searchProductSaga);
}
