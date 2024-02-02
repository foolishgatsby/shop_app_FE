const initialState = {
  cartList: [],
  numOfItem: 0,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      const newCartList = state.cartList;
      const index = newCartList.findIndex(
        (item) => item.product.id === action.product.id
      );
      if (index === -1) {
        const newAdd = {
          product: action.product,
          qty: action.qty,
        };
        newCartList.push(newAdd);
        state.numOfItem += newAdd.qty;
      } else {
        newCartList[index].qty += action.qty;
        state.numOfItem += action.qty;
      }
      return { ...state, cartList: newCartList };

    default:
      return state;
  }
};
