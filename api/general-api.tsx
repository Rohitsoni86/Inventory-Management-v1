import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError, AxiosResponse } from "axios";

const postalCodeApi = async ({ postalCode }: { postalCode: string }) => {
  const res = await axios.get(
    `https://api.postalpincode.in/pincode/${postalCode}`
  );
  return res;
};

export const usePostalCodeApi = (
  onSuccess: (data: AxiosResponse) => void,
  onError: (error: AxiosError) => void
) => {
  return useMutation({
    mutationFn: postalCodeApi,
    onSuccess,
    onError,
  });
};
