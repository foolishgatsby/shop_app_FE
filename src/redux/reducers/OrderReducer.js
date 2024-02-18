const initialState = {
  arrOrders: [],
};

export default (state = initialState, action) => {
  switch (action) {
    case "UPDATE_ALL_ORDERS":
      return { ...state, arrOrders: action.arrOrders };

    default:
      return state;
  }
};
