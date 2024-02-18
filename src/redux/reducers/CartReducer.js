const initialState = {
  cartList: [],
  numOfItem: 0,
  totalMoney: 0,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      const newCartListAdd = state.cartList;
      let indexAdd = newCartListAdd.findIndex(
        (item) => item.product.id === action.product.id
      );
      if (indexAdd === -1) {
        const newAdd = {
          product: action.product,
          product_id: action.product.id,
          quantity: action.quantity,
        };
        newCartListAdd.push(newAdd);
        state.numOfItem += newAdd.quantity;
      } else {
        newCartListAdd[indexAdd].quantity += action.quantity;
        state.numOfItem += action.quantity;
      }
      state.totalMoney = 0;
      newCartListAdd.forEach((item, index) => {
        state.totalMoney += Number(item.product.price) * Number(item.quantity);
      });
      return { ...state, cartList: newCartListAdd };
    case "DELETE_FROM_CART":
      const newCartListDelete = state.cartList;
      let indexDel = newCartListDelete.findIndex(
        (item) => item.product.id === action.product.id
      );
      if (indexDel !== -1) {
        newCartListDelete.splice(indexDel, 1);
      }
      state.numOfItem = 0;
      newCartListDelete.forEach(({ product, quantity }, index) => {
        state.numOfItem += quantity;
      });
      state.totalMoney = 0;
      newCartListDelete.forEach((item, index) => {
        state.totalMoney += Number(item.product.price) * Number(item.quantity);
      });
      return { ...state, cartList: newCartListDelete };
    default:
      return state;
  }
};
