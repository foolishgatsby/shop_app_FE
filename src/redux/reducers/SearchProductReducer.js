const initialState = {
  productList: [],
  loading: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "SET_SEARCH_PRODUCT_LIST":
      state.productList = action.products;
      return { ...state };

    default:
      return state;
  }
};
