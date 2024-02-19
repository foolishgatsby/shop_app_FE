import { CLOSE_DRAWER, OPEN_DRAWER } from "../constants/DrawerConstants";

const initialState = {
  visible: false,
  ComponentContentDrawer: <p>default content</p>,
  title: "",
  callBackSubmit: (propsSubmit) => {
    alert("click demo!");
  },
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CLOSE_DRAWER:
      return {
        ...state,
        visible: false,
        ComponentContentDrawer: <p>default content</p>,
      };
    case OPEN_DRAWER:
      return {
        ...state,
        visible: true,
        ComponentContentDrawer: action.Component,
        title: action.title,
      };
    case "SET_SUBMIT_ADD_CATEGORY":
      state.callBackSubmit = action.submitFunc;
      return { ...state };
    case "SET_SUBMIT_EDIT_CATEGORY":
      state.callBackSubmit = action.submitFunc;
      return { ...state };
    case "SET_SUBMIT_ADD_USER":
      state.callBackSubmit = action.submitFunc;
    case "SET_SUBMIT_EDIT_USER":
      state.callBackSubmit = action.submitFunc;
      return { ...state };
    case "SET_SUBMIT_ADD_PRODUCT":
      state.callBackSubmit = action.submitFunc;
      return { ...state };
    case "SET_SUBMIT_EDIT_PRODUCT":
      state.callBackSubmit = action.submitFunc;
      return { ...state };
    case "SET_SUBMIT_EDIT_ORDER":
      state.callBackSubmit = action.submitFunc;
      return { ...state };
    default:
      return state;
  }
};
