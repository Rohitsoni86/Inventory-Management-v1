import { useMutation } from "@tanstack/react-query";

import { AxiosError, AxiosResponse } from "axios";
import ErrorData from "@/models/apiError";
import SignUpFields from "@/models/userSignUpModel";
import { userApiInterceptor } from "./Interceptor/Interceptor";

const login = async (body: { email: string; password: string }) => {
  return await userApiInterceptor.post(
    `${process.env.BASE_URL}/api/v1/admin/login`,
    body
  );
};

export const useAdminLogin = (
  onSuccess: (data: AxiosResponse) => void,
  onError: (error: AxiosError<ErrorData>) => void
) => {
  return useMutation({
    mutationFn: login,
    onSuccess: onSuccess,
    onError: onError,
  });
};

const signUp = async (body: SignUpFields) => {
  return await userApiInterceptor.post(
    `${process.env.BASE_URL}/api/v1/user/organization`,
    body
  );
};

export const useSignUp = (
  onSuccess: (data: AxiosResponse) => void,
  onError: (error: AxiosError<ErrorData>) => void
) => {
  return useMutation({
    mutationFn: signUp,
    onSuccess: onSuccess,
    onError: onError,
  });
};
