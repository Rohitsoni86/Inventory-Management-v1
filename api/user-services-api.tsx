import { useQuery } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import ErrorData from "@/models/apiError";
import { userApiInterceptor } from "./Interceptor/Interceptor";

const verifyUser = async (): Promise<AxiosResponse> => {
  return await userApiInterceptor.get(
    `${process.env.BASE_URL}/api/v1/user/verify`
  );
};

export const useVerifyUser = () => {
  return useQuery<AxiosResponse, AxiosError<ErrorData>>({
    queryKey: ["verifyUser"],
    queryFn: verifyUser,
  });
};
