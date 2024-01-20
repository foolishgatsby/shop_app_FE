import { IS_LOGIN } from "../constants/AdminConstants";

const initialState = {
  isLogin: false,
  role: 0,
  email: "",
};

export default (state = initialState, action) => {
  switch (action.type) {
    case IS_LOGIN:
      state.isLogin = action.isLogin;
      state.email = action.email;
      return { ...state };

    default:
      return state;
  }
};
