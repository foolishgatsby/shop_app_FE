import {
  GET_PRODUCT_BY_CATEGORY_API,
  USER_REGISTER_API,
  USER_SIGNIN_API,
} from "../constants/AdminConstants";
import {
  ADD_CATEGORY_API,
  DELETE_CATEGORY_API,
  EDIT_CATEGORY_API,
  GET_ALL_CATEGORIES_API,
} from "../constants/CategoriesConstants";

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

export const getCategories_api = () => {
  return {
    type: GET_ALL_CATEGORIES_API,
  };
};

export const deleteCategory_api = (id) => {
  return {
    type: DELETE_CATEGORY_API,
    id,
  };
};

export const addCategory_api = (name) => {
  return {
    type: ADD_CATEGORY_API,
    model: { name },
  };
};

export const editCategory_api = (id, name) => {
  return {
    type: EDIT_CATEGORY_API,
    id: id,
    model: {
      name: name,
    },
  };
};

export const getAccount_api = () => {
  return {};
};
