import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./components/register/userSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
  },
});
export default store;
