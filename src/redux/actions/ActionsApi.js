import {
  GET_PRODUCT_BY_CATEGORY_API,
  USER_REGISTER_API,
  USER_SIGNIN_API,
} from "../constants/AdminConstants";

export const getProductByCategory_api = (categoryId) => {
  return {
    type: GET_PRODUCT_BY_CATEGORY_API,
    categoryId: categoryId,
  };
};

export const signin_api = (userLogin) => {
  return {
    type: USER_SIGNIN_API,
    userLogin,
  };
};

export const signup_api = (newUser, role_id = 1) => {
  let userRegister = { ...newUser, role_id };
  return {
    type: USER_REGISTER_API,
    userRegister,
  };
};
