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
import {
  ADD_PRODUCT_API,
  DELETE_PRODUCT_API,
  EDIT_PRODUCT_API,
  GET_PRODUCT_BY_ID_API,
} from "../constants/ProductConstants";

export const addProduct_api = (newProduct) => {
  return {
    type: ADD_PRODUCT_API,
    newProduct,
  };
};

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

export const signup_api = (newUser, role_id = "1") => {
  let userRegister = { ...newUser, role_id };
  return {
    type: USER_REGISTER_API,
    userRegister: userRegister,
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

export const deleteProduct_api = (id, category_id) => {
  return {
    type: DELETE_PRODUCT_API,
    id: id,
    category_id: category_id,
  };
};

export const editProduct_api = (id, editProduct) => {
  return {
    type: EDIT_PRODUCT_API,
    id: id,
    editProduct: editProduct,
  };
};

export const getProductById_api = (id) => {
  return {
    type: GET_PRODUCT_BY_ID_API,
    id,
  };
};
