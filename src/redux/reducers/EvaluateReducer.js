const roundHalf = (num) => {
  return Math.round(num * 2) / 2;
};

const initialState = {
  evaluateList: [],
  averageRate: 0,
  loading: false,
  arrEvaluate: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "UPDATE_EVALUATE_LIST":
      state.evaluateList = action.evaluateList;
      let rate = 0;
      action.evaluateList.forEach((evaluate, index) => {
        rate += evaluate.rate;
      });
      state.averageRate = roundHalf(rate / action.evaluateList.length);
      console.log();
      return { ...state };
    case "SET_LOADING_EVALUATE":
      return { ...state, loading: action.loading };
    case "SET_ARR_EVALUATE":
      return { ...state, arrEvaluate: action.arrEvaluate };
    default:
      return state;
  }
};
