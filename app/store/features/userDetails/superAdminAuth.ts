import { loggedInUserSuperAdminInfo } from "@/models/userModel";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: loggedInUserSuperAdminInfo = {
  id: "",
  email: "",
  name: "",
  role: "",
  mfa: "",
  secret: "",
  isLoggedIn: false,
};

const userSuperAdminSlice = createSlice({
  name: "superAdminUserInfo",
  initialState,
  reducers: {
    setSuperAdminUserInfo: (
      state,
      action: PayloadAction<loggedInUserSuperAdminInfo>
    ) => {
      const { id, email, name, role, mfa, secret, isLoggedIn } = action.payload;
      state.id = id;
      state.email = email;
      state.name = name;
      state.role = role;
      state.mfa = mfa;
      state.secret = secret;
      state.isLoggedIn = isLoggedIn || true;
    },
    // Action to clear user info (e.g., on logout)
    clearSuperAdminUserInfo: (state) => {
      state.id = "";
      state.email = "";
      state.name = "";
      state.role = "";
      state.mfa = "";
      state.secret = "";
      state.isLoggedIn = false;
    },
  },
});

export const { setSuperAdminUserInfo, clearSuperAdminUserInfo } =
  userSuperAdminSlice.actions;
export default userSuperAdminSlice.reducer;
