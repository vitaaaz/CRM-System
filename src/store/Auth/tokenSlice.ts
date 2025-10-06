import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export type AuthState = {
  authState: boolean
}

const initialState: AuthState = {
  authState: false
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthState: (state, action: PayloadAction<boolean>) => {
      state.authState = action.payload
    },
    clearAuthState: (state) => {
      state.authState = false
    }
  }
})

export const {setAuthState, clearAuthState} = authSlice.actions
export default authSlice.reducer;