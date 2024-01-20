import { IS_LOGIN, UPDATE_PRODUCT_TABLE } from "../constants/AdminConstants";

export const updateProductTable = (productList) => {
  return {
    type: UPDATE_PRODUCT_TABLE,
    productList,
  };
};

export const isLoginAction = (isLogin, email) => {
  return {
    type: IS_LOGIN,
    isLogin,
    email,
  };
};
