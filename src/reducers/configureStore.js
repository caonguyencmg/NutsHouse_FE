import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userSlice from "./userReducer";
import authSlice from "./authReducer";
const reducer = combineReducers({
  shoppingCard: userSlice,
  authen: authSlice,
});
const store = configureStore({
  reducer,
});
export default store;
