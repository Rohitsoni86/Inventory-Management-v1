import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useAppContext } from "@/app/providers/app-context";
import { useVerifyUser } from "@/api/user-services-api";
import {
  clearUser,
  setUser,
} from "@/app/store/features/userDetails/userDetailsSlice";
import { clearAllCookies } from "./storeOrRefreshTokens";
import { useRouter } from "next/navigation";

const useUserVerification = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { setMessage, setOpenToastError } = useAppContext();

  const {
    data,
    isLoading: verificationLoading,
    isError,
    error,
    isSuccess,
  } = useVerifyUser();

  useEffect(() => {
    if (isSuccess) {
      console.log("Query Success", data);

      const { user, organization } = data?.data || {};

      if (user) {
        const { id, email, firstName, lastName, role, organizationId } = user;

        // Dispatch user info to global state (Redux)
        dispatch(
          setUser({
            id,
            email,
            name: `${firstName} ${lastName}`,
            role,
            organizationId,
            legalName: organization?.legalName,
            isLoggedIn: true,
          })
        );
      }
    }

    if (isError) {
      // Handle errors
      setOpenToastError(true);
      setMessage(error?.response?.data?.message || error.message);
      console.error("Login Error Data", error);

      dispatch(clearUser());
      clearAllCookies();
      router.push("/");
    }
  }, [isSuccess, isError]);

  return {
    verificationLoading,
    isSuccess,
    isError,
  };
};

export default useUserVerification;
