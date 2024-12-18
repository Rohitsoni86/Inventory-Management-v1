import { loggedInUserInfo } from "@/models/userModel";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// const initialState: UserState = {
//   userInfo: null,
//   isLoggedIn: false,
// };

const initialState: loggedInUserInfo = {
  id: "",
  email: "",
  name: "",
  role: "",
  organizationId: "",
  legalName: "",
  isLoggedIn: false,
};

const userSlice = createSlice({
  name: "userInfo",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<loggedInUserInfo>) => {
      const { id, email, name, role, organizationId, legalName, isLoggedIn } =
        action.payload;
      state.id = id;
      state.email = email;
      state.name = name;
      state.role = role;
      state.organizationId = organizationId;
      state.legalName = legalName;
      state.isLoggedIn = isLoggedIn || true;
    },
    // Action to clear user info (e.g., on logout)
    clearUser: (state) => {
      state.id = "";
      state.email = "";
      state.name = "";
      state.role = "";
      state.organizationId = "";
      state.legalName = "";
      state.isLoggedIn = false;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
