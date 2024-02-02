import { all } from "redux-saga/effects";
import * as SignInSaga from "./SignInSaga";
import * as SignUpSaga from "./SignUpSaga";
import * as CategoriesSaga from "./CategoriesSaga";
import * as ProductSaga from "./ProductSaga";

export function* rootSaga() {
  yield all([
    SignInSaga.watchSignInSagaAction(),
    SignUpSaga.watchSignUpSagaAction(),
    CategoriesSaga.watchGetAllCategoriesSagaAction(),
    CategoriesSaga.watchDeleteCategorySagaAction(),
    CategoriesSaga.watchAddCategorySagaAction(),
    CategoriesSaga.watchEditCategorySagaAction(),
    ProductSaga.watchGetProductByCategorySagaAction(),
    ProductSaga.watchAddProductSagaAction(),
    ProductSaga.watchDeleteProductSagaAction(),
    ProductSaga.watchEditProductSagaAction(),
    ProductSaga.watchGetNewProductSagaAction(),
    ProductSaga.watchGetProductByIdSagaAction(),
  ]);
}
