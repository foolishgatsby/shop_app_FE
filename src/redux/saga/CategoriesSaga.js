import { call, put, takeLatest } from "redux-saga/effects";
import {
  GET_ALL_CATEGORIES_API,
  DELETE_CATEGORY_API,
  ADD_CATEGORY_API,
  EDIT_CATEGORY_API,
} from "../constants/CategoriesConstants";
import { categoriesServices } from "../../services/CategoriesServices";
import { STATUS_CODE } from "../../util/constants/settingSystem";
import { updateAllCate } from "../actions/NormalActions";
import { data } from "jquery";

// Get All Categories saga action
function* getAllCategoriesSaga(action) {
  try {
    const { data, status } = yield call(() =>
      categoriesServices.getAllCategories()
    );
    // console.log(response);

    if (status === STATUS_CODE.SUCCESS) {
      yield put(updateAllCate(data));
    }
  } catch (error) {
    console.log(error.response.data);
  }
}

export function* watchGetAllCategoriesSagaAction() {
  yield takeLatest(GET_ALL_CATEGORIES_API, getAllCategoriesSaga);
}

// Delete Category saga action
function* deleteCategorySaga(action) {
  try {
    const { data, status } = yield call(() =>
      categoriesServices.deleteCategory(action.id)
    );

    // console.log(response);

    // Cập nhật lại categories
    if (status === STATUS_CODE.SUCCESS) {
      alert(data);
      yield put({ type: GET_ALL_CATEGORIES_API });
    }
  } catch (error) {
    console.log(error.response.data);
  }
}

export function* watchDeleteCategorySagaAction() {
  yield takeLatest(DELETE_CATEGORY_API, deleteCategorySaga);
}

// Add category saga action
function* addCategorySaga(action) {
  try {
    const { status } = yield call(() =>
      categoriesServices.addCategory(action.model)
    );
    if (status === STATUS_CODE.SUCCESS) {
      yield put({ type: GET_ALL_CATEGORIES_API });
    }
  } catch (error) {
    console.log(error);
  }
}

export function* watchAddCategorySagaAction() {
  yield takeLatest(ADD_CATEGORY_API, addCategorySaga);
}

function* editCategorySaga(action) {
  try {
    const { message, status } = yield call(() =>
      categoriesServices.editCategory(action.id, action.model)
    );
    if (status === STATUS_CODE.SUCCESS) {
      yield put({ type: GET_ALL_CATEGORIES_API });
    }
  } catch (error) {
    console.log(error);
  }
}

export function* watchEditCategorySagaAction() {
  yield takeLatest(EDIT_CATEGORY_API, editCategorySaga);
}
