import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { applyMiddleware } from "redux";
import { thunk } from "redux-thunk";
import { composeWithDevTools } from "@redux-devtools/extension";
import {
  productListReducers,
  categoryListReducers,
  productDetailsReducers,
} from "./reducers/productReducers";
import {
  userLoginReducers,
  userRegisterReducers,
  userProfileReducers,
} from "./reducers/userReducers";
import {
  basketReducer,
  basketListReducer,
  basketRemoveReducer,
} from "./reducers/basketReducers";

const reducer = combineReducers({
  productList: productListReducers,
  categoryList: categoryListReducers,
  productDetails: productDetailsReducers,
  basket: basketReducer,
  basketList: basketListReducer,
  basketRemove: basketRemoveReducer,
  userLogin: userLoginReducers,
  userRegister: userRegisterReducers,
  profileUser: userProfileReducers,
});

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
};

const store = configureStore({
  reducer: reducer,
  preloadedState: initialState,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
  devTools: process.env.NODE_ENV !== "production",
});

export default store;
