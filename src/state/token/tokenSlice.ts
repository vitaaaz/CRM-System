import {Token} from "@/types/authorization";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState: Token = {
  accessToken: "",
  refreshToken: "",
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<Token>) => {
      state.accessToken = action.payload.accessToken
      state.refreshToken = action.payload.refreshToken
    },
    clearToken: (state) => {
      state.accessToken = ""
      state.refreshToken = ""
    }
  }
})

export const {setToken, clearToken} = authSlice.actions
export default authSlice.reducer;