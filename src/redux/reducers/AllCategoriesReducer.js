import { UPDATE_ALL_CATEGORIES } from "../constants/AdminConstants";

const initialState = {
  arrCategories: [
    {
      id: 1,
      name: "Đồ chơi người lớn",
    },
    {
      id: 2,
      name: "Đồ chơi trẻ em",
    },
    {
      id: 3,
      name: "Đồ Điện tử",
    },
    {
      id: 4,
      name: "Đồ gia dụng",
    },
  ],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_ALL_CATEGORIES:
      state.arrCategories = action.arrCategories;
      return { ...state };

    default:
      return state;
  }
};
