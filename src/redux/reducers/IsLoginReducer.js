import { IS_LOGIN, SET_ROLE } from "../constants/AdminConstants";

const initialState = {
  isLogin: false,
  role_id: "1",
  email: "",
};

export default (state = initialState, action) => {
  switch (action.type) {
    case IS_LOGIN:
      console.log("Đăng nhâp", action.isLogin);
      state.isLogin = action.isLogin;
      state.email = action.email;
      state.role_id = action.role_id;
      return { ...state };
    case SET_ROLE:
      state.role_id = action.role_id;
      return { ...state };
    default:
      return state;
  }
};
