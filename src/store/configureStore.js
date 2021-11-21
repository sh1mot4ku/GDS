import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import userReducer from "../reducers/user";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const configureStore = () => {
  const store = createStore(
    combineReducers({
      user: userReducer
    }),
    process.env.NODE_ENV === 'production' ?
    applyMiddleware(thunk) :
    composeEnhancers(applyMiddleware(thunk))
  );
  return store;
}

export default configureStore;