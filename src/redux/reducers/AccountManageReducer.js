import { UPDATE_ALL_ACCOUNT } from "../constants/AccountConstants";

const initialState = {
  arrAccount: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_ALL_ACCOUNT:
      state.arrAccount = action.arrAccount;
      return { ...state };

    default:
      return state;
  }
};
