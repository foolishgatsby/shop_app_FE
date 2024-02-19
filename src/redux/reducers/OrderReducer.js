const initialState = {
  arrOrders: [],
  loading: false,
  doneApi: false,
  orderEdit: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "UPDATE_ALL_ORDERS":
      console.log(action.arrOrders);
      return { ...state, arrOrders: action.arrOrders };
    case "SET_LOADING_ORDER":
      return { ...state, loading: action.loading };
    case "SET_EDIT_ORDER":
      return { ...state, orderEdit: action.orderEdit };
    case "DONE_API":
      return { ...state, doneApi: action.doneApi };
    default:
      return state;
  }
};
