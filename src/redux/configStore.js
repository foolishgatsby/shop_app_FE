import { createStore, combineReducers, applyMiddleware } from "redux";

// Reducers
import ProductTableReducer from "./reducers/ProductTableReducer";

// Middleware
import createMiddleWareSaga from "redux-saga";
import { rootSaga } from "./saga/rootSaga";
const middlewareSaga = createMiddleWareSaga();

// root Reducer
const rootReducer = combineReducers({ ProductTableReducer });

const store = createStore(rootReducer, applyMiddleware(middlewareSaga));

middlewareSaga.run(rootSaga);

export default store;
