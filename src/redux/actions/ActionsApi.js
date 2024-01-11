import {
  GET_PRODUCT_BY_CATEGORY_API,
  USER_SIGNIN_API,
} from "../constants/AdminConstants";

export const getProductByCategory_api = (categoryId) => {
  return {
    type: GET_PRODUCT_BY_CATEGORY_API,
    categoryId: categoryId,
  };
};

export const signin_api = (username, password) => {
  return {
    type: USER_SIGNIN_API,
    userLogin: {
      username: username,
      password: password,
    },
  };
};
