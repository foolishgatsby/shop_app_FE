import { createStore, combineReducers, applyMiddleware } from "redux";

// Reducers
import ProductTableReducer from "./reducers/ProductTableReducer";
import IsLoginReducer from "./reducers/IsLoginReducer";
import AllCategoriesReducer from "./reducers/AllCategoriesReducer";
import DrawerReducer from "./reducers/DrawerReducer";
import AccountManageReducer from "./reducers/AccountManageReducer";
import CartReducer from "./reducers/CartReducer";
import OrderReducer from "./reducers/OrderReducer";
import SearchProductReducer from "./reducers/SearchProductReducer";
import EvaluateReducer from "./reducers/EvaluateReducer";

// Middleware
import createMiddleWareSaga from "redux-saga";
import { rootSaga } from "./saga/rootSaga";
const middlewareSaga = createMiddleWareSaga();

// root Reducer
const rootReducer = combineReducers({
  ProductTableReducer,
  IsLoginReducer,
  AllCategoriesReducer,
  DrawerReducer,
  AccountManageReducer,
  CartReducer,
  OrderReducer,
  SearchProductReducer,
  EvaluateReducer,
});

const store = createStore(rootReducer, applyMiddleware(middlewareSaga));

middlewareSaga.run(rootSaga);

export default store;
