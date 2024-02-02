import {
  IS_LOGIN,
  SET_ROLE,
  UPDATE_PRODUCT_TABLE,
} from "../constants/AdminConstants";
import {
  SET_EDIT_CATEGORY,
  UPDATE_ALL_CATEGORIES,
} from "../constants/CategoriesConstants";
import { SET_EDIT_PRODUCT } from "../constants/ProductConstants";

export const updateProductTable = (productList) => {
  return {
    type: UPDATE_PRODUCT_TABLE,
    productList,
  };
};

export const isLoginAction = (isLogin, role_id, email = "") => {
  return {
    type: IS_LOGIN,
    isLogin,
    role_id,
    email,
  };
};

export const setRoleAction = (role_id) => {
  return {
    type: SET_ROLE,
    role_id,
  };
};

export const updateAllCate = (arrCategories) => {
  return {
    type: UPDATE_ALL_CATEGORIES,
    arrCategories,
  };
};

export const setEditCategory = (id, name) => {
  return {
    type: SET_EDIT_CATEGORY,
    categoryEdit: {
      id: id,
      name: name,
    },
  };
};

export const setEditProduct = (editProduct) => {
  return {
    type: SET_EDIT_PRODUCT,
    editProduct,
  };
};
