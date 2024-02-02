import { UPDATE_PRODUCT_TABLE } from "../constants/AdminConstants";
import { SET_EDIT_PRODUCT } from "../constants/ProductConstants";

const initialState = {
  temp_category_id: "",
  productList: [],
  editProduct: {},
  loading: false,
  newProduct: [],
  productDetail: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_PRODUCT_TABLE:
      return { ...state, productList: action.productList };
    case "SET_LOADING":
      return { ...state, loading: action.loading };
    case "SET_TEMP_CATEGORY":
      return { ...state, temp_category_id: action.temp_category_id };
    case SET_EDIT_PRODUCT:
      return { ...state, editProduct: action.editProduct };
    case "UPDATE_NEW_PRODUCT":
      return { ...state, newProduct: action.newProduct };
    case "UPDATE_PRODUCT_DETAIL":
      return { ...state, productDetail: action.productDetail };
    default:
      return state;
  }
};
