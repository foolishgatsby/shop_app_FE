import {
  SET_EDIT_CATEGORY,
  UPDATE_ALL_CATEGORIES,
} from "../constants/CategoriesConstants";

const initialState = {
  arrCategories: [],
  categoryEdit: {
    id: "",
    name: "",
  },
};

export default (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_ALL_CATEGORIES:
      state.arrCategories = action.arrCategories;
      return { ...state };
    case SET_EDIT_CATEGORY:
      state.categoryEdit = action.categoryEdit;
      return { ...state };
    default:
      return state;
  }
};
