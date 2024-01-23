import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import reducer from "./reducer";

const initialAuthState = {
  authenticated: localStorage.getItem("Token") || null,
};

export const store = createStore(
  reducer,
  initialAuthState,
  applyMiddleware(thunk)
);
