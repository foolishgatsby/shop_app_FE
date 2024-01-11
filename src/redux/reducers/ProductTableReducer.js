import { UPDATE_PRODUCT_TABLE } from "../constants/AdminConstants";

const initialState = {
  productList: [
    {
      key: "1",
      id: 1,
      name: "product 1",
      category: "Laptops",
      price: 1300000,
      oldprice: 1300000,
      rating: 5,
    },
    {
      key: "2",
      id: 2,
      name: "product 2",
      category: "Laptops",
      price: 5000000,
      oldprice: 5000000,
      rating: 4.5,
    },
    {
      key: "3",
      id: 3,
      name: "product 3",
      category: "Accessories",
      price: 5000000,
      oldprice: 5000000,
      rating: 4.5,
    },
    {
      key: "4",
      id: 4,
      name: "product 4",
      category: "Accessories",
      price: 5000000,
      oldprice: 5000000,
      rating: 5,
    },
    {
      key: "5",
      id: 5,
      name: "product 5",
      category: "Cameras",
      price: 1500000,
      oldprice: 1500000,
      rating: 3,
    },
  ],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_PRODUCT_TABLE:
      return { ...state, productList: action.productList };

    default:
      return state;
  }
};
