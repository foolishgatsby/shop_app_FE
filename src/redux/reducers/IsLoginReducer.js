import { IS_LOGIN, SET_ROLE } from "../constants/AdminConstants";

const initialState = {
  isLogin: false,
  role_id: "1",
  email: "",
  userDetail: {
    fullname: "",
    address: "",
    phone_number: "",
    email: "",
  },
  loading: false,
  userOrderList: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case IS_LOGIN:
      // console.log("Đăng nhâp", action.isLogin);
      state.isLogin = action.isLogin;
      state.email = action.email;
      state.role_id = action.role_id;
      return { ...state };
    case SET_ROLE:
      state.role_id = action.role_id;
      return { ...state };
    case "SET_USER_DETAIL":
      // console.log(action.userDetail);
      state.userDetail = action.userDetail;
      return { ...state };
    case "SET_LOADING_USER_PROFILE":
      return { ...state, loading: action.loading };
    case "UPDATE_ORDERS_OF_USER":
      return { ...state, userOrderList: action.userOrderList };
    default:
      return state;
  }
};
