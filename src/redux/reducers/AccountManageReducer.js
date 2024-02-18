import { UPDATE_ALL_ACCOUNT } from "../constants/AccountConstants";

const initialState = {
  arrAccount: [],
  loading: false,
  accountEdit: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_ALL_ACCOUNT:
      state.arrAccount = action.arrAccount;
      return { ...state };
    case "SET_LOADING":
      return { ...state, loading: action.loading };
    case "SET_EDIT_ACCOUNT":
      return { ...state, accountEdit: action.accountEdit };
    default:
      return state;
  }
};
