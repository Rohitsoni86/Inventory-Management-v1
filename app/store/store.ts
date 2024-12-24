import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/userDetails/userDetailsSlice";
import userSuperAdminInfoReducer from "./features/userDetails/userDetailsSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      user: userReducer,
      userSuperAdminInfo: userSuperAdminInfoReducer,
    },
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
