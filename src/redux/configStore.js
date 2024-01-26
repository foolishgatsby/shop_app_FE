import { createStore, combineReducers, applyMiddleware } from "redux";

// Reducers
import ProductTableReducer from "./reducers/ProductTableReducer";
import IsLoginReducer from "./reducers/IsLoginReducer";
import AllCategoriesReducer from "./reducers/AllCategoriesReducer";
import DrawerReducer from "./reducers/DrawerReducer";
import AccountManageReducer from "./reducers/AccountManageReducer";

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
});

const store = createStore(rootReducer, applyMiddleware(middlewareSaga));

middlewareSaga.run(rootSaga);

export default store;
