import { all } from "redux-saga/effects";
import * as SignInSaga from "./SignInSaga";
import * as SignUpSaga from "./SignUpSaga";
import * as CategoriesSaga from "./CategoriesSaga";
import * as ProductSaga from "./ProductSaga";
import * as AccountManageSaga from "./AccountManageSaga";
import * as OrderSaga from "./OrderSaga";

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
    AccountManageSaga.watchGetAllAccountSagaAction(),
    AccountManageSaga.watchEditAccountSagaAction(),
    AccountManageSaga.watchGetUserDetailSagaAction(),
    AccountManageSaga.watchEditProfileSagaAction(),
    OrderSaga.watchOrderSagaAction(),
  ]);
}
