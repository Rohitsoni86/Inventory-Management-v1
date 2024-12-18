import Cookies from "js-cookie";

// NOTE : We can prevent the access to tokens directly as using httpOnly true
export const storeTokensInCookies = (
  accessToken: string,
  refreshToken: string
) => {
  console.log("Setting Cookies Tokens", accessToken, refreshToken);

  const expiryDate = new Date();
  expiryDate.setHours(expiryDate.getHours() + 1);

  Cookies.set("accessToken", accessToken, {
    expires: expiryDate,
    secure: true,
    sameSite: "Strict",
  });

  Cookies.set("refreshToken", refreshToken, {
    expires: 1,
    secure: true,
    sameSite: "Strict",
  });
};

export const clearAllCookies = () => {
  console.log("Setting Cookies Tokens Clearing All Cookies");
  // Remove the specific cookies by name
  Cookies.remove("accessToken");
  Cookies.remove("refreshToken");
};
