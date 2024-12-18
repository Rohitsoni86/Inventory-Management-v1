import { storeTokensInCookies } from "@/utils/storeOrRefreshTokens";
import axios from "axios";
import Cookies from "js-cookie";

export const userApiInterceptor = axios.create({
  baseURL: `${process.env.BASE_URL}`,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

userApiInterceptor.defaults.headers.common["Content-Type"] = "application/json";

userApiInterceptor.interceptors.request.use(
  (config) => {
    const accessToken = Cookies.get("accessToken");
    console.log("Getting Accesss TOken", accessToken);
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

userApiInterceptor.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    console.log("Error Response: ", error);

    // If the error is due to 401 (unauthorized) or 403 (forbidden) and no retry has been made
    if (
      (error?.response?.status === 403 || error?.response?.status === 401) &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        // Get the refresh token from cookies
        const refreshToken = Cookies.get("refreshToken");

        if (!refreshToken) {
          // If no refresh token, log out the user or handle as needed
          console.log("No refresh token found");
          return Promise.reject(error);
        }

        // Send a request to refresh the access token
        const refreshResponse = await axios.get(
          `${process.env.BASE_URL}/api/v1/user/refresh`,
          {
            headers: {
              "r-token": `Bearer ${refreshToken}`,
            },
          }
        );

        console.log(
          "refresh token response",
          refreshResponse.data.tokens.accessToken
        );

        const newAccessToken = refreshResponse.data.tokens.accessToken;
        const newRToken = refreshResponse.data.tokens.refreshToken;

        // Store the new access token in cookies
        storeTokensInCookies(newAccessToken, newRToken);
        // Cookies.set("accessToken", newAccessToken, { path: "/", secure: true });

        // Retry the original request with the new access token
        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
        return userApiInterceptor(originalRequest); // Retry the request
      } catch (refreshError) {
        console.error("Error refreshing token:", refreshError);
        // Handle error, maybe log out the user or navigate to login page
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);
