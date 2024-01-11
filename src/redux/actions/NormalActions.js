import { UPDATE_PRODUCT_TABLE } from "../constants/AdminConstants";

export const updateProductTable = (productList) => {
  return {
    type: UPDATE_PRODUCT_TABLE,
    productList,
  };
};
