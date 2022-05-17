import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  res: {
    status: "",
    message: "",
  },
  isLoading: false,
  user: {},
};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    isLoadingPending: (state) => {
      state.isLoading = true;
    },
    setRespponse: (state, action) => {
      state.isLoading = false;
      state.res = action.payload;
    },
    loginSucess: (state, action) => {
      state.isLoading = false;
      state.user = action.payload;
    },
  },
});

const { actions, reducer } = userSlice;
export const { isLoadingPending, setRespponse, loginSucess } = actions;
export default reducer;
