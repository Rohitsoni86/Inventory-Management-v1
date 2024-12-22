"use client";
import { usePostalCodeApi } from "@/api/general-api";
import CountryCodeInput from "@/app/components/InternationalPhoneNumberComponent/CountryCodeInput";
import SignUpFields from "@/models/userSignUpModel";
import {
  Box,
  CircularProgress,
  FormControl,
  FormHelperText,
  Grid2,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  useTheme,
} from "@mui/material";
import { AxiosError, AxiosResponse } from "axios";
import { FormikProps } from "formik";
import React, { useEffect } from "react";

interface FormProps
  extends Pick<
    FormikProps<SignUpFields>,
    | "values"
    | "handleChange"
    | "handleBlur"
    | "errors"
    | "touched"
    | "setFieldValue"
    | "setValues"
  > {
  name?: string;
}

export default function OrganizationAddressSettings({
  values,
  handleChange,
  handleBlur,
  errors,
  touched,
  setValues,
  setFieldValue,
}: FormProps) {
  const theme = useTheme();
  const onPostalCodeSuccess = (data: AxiosResponse) => {
    const capitalize = (str: string) => {
      return str
        .toLowerCase()
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
    };

    console.log(data, "postal code");
    if (data?.data[0].Status === "Error") {
      setValues({
        ...values,
        country: "",
        city: "",
        state: "",
      });
    } else {
      setValues({
        ...values,
        country: capitalize(data?.data[0].PostOffice[0].Country.toLowerCase()),
        city: capitalize(data?.data[0].PostOffice[0].District.toLowerCase()),
        state: capitalize(data?.data[0].PostOffice[0].State.toLowerCase()),
      });
    }
  };

  const onPostalCodeError = (error: AxiosError) => {
    console.log(error, "error");
  };

  useEffect(() => {
    if (values.postalCode && values.postalCode.toString().length >= 6) {
      const timeOut = setTimeout(() => {
        postalCodeMutate({ postalCode: values.postalCode as string });
      }, 500);
      return () => clearTimeout(timeOut);
    }
  }, [values.postalCode]);

  const { mutateAsync: postalCodeMutate, isPending: searchingPincodeDetails } =
    usePostalCodeApi(onPostalCodeSuccess, onPostalCodeError);

  return (
    <Grid2 container spacing={2}>
      <Grid2
        size={{
          xs: 12,
          md: 4,
          lg: 3,
        }}
      >
        <Box>
          <InputLabel required>Postal Code</InputLabel>
          <TextField
            size="small"
            fullWidth
            type="text"
            name="postalCode"
            id="postalCode"
            placeholder="Enter code"
            error={touched?.postalCode && Boolean(errors?.postalCode)}
            value={values.postalCode}
            onBlur={handleBlur}
            onChange={handleChange}
            helperText={
              errors?.postalCode &&
              touched?.postalCode &&
              `${errors?.postalCode}`
            }
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    {searchingPincodeDetails && (
                      <CircularProgress
                        size="24px"
                        thickness={4}
                        sx={{
                          color: theme.palette.common.white,
                        }}
                      />
                    )}
                  </InputAdornment>
                ),
              },
            }}
          />
        </Box>
      </Grid2>
      <Grid2
        size={{
          xs: 12,
          md: 4,
          lg: 3,
        }}
      >
        <Box>
          <InputLabel required>Country</InputLabel>
          <TextField
            size="small"
            fullWidth
            type="text"
            name="country"
            id="country"
            placeholder="Enter state"
            error={touched?.country && Boolean(errors?.country)}
            value={values.country}
            onBlur={handleBlur}
            onChange={handleChange}
            helperText={
              errors?.country && touched?.country && `${errors?.country}`
            }
          />
        </Box>
      </Grid2>
      <Grid2
        size={{
          xs: 12,
          md: 4,
          lg: 3,
        }}
      >
        <Box>
          <InputLabel required>State</InputLabel>
          <TextField
            size="small"
            fullWidth
            type="text"
            name="state"
            id="state"
            placeholder="Enter code"
            value={values.state}
            onBlur={handleBlur}
            onChange={handleChange}
            error={touched?.state && Boolean(errors?.state)}
            helperText={errors?.state && touched?.state && `${errors?.state}`}
          />
        </Box>
      </Grid2>
      <Grid2
        size={{
          xs: 12,
          md: 4,
          lg: 3,
        }}
      >
        {" "}
        <Box>
          <InputLabel required>City</InputLabel>
          <TextField
            size="small"
            fullWidth
            type="text"
            name="city"
            id="city"
            placeholder="Enter city"
            error={touched?.city && Boolean(errors?.city)}
            value={values.city}
            onBlur={handleBlur}
            onChange={handleChange}
            helperText={errors?.city && touched?.city && `${errors?.city}`}
          />
        </Box>
      </Grid2>
      <Grid2
        size={{
          xs: 12,
          md: 12,
          lg: 12,
        }}
      >
        {" "}
        <Box>
          <InputLabel>Organization Address</InputLabel>
          <TextField
            size="small"
            fullWidth
            type="text"
            autoComplete="address"
            name="address"
            id="address"
            placeholder="Enter your business address"
            error={touched?.address && Boolean(errors?.address)}
            value={values.address}
            onBlur={handleBlur}
            onChange={handleChange}
            helperText={
              errors?.address && touched?.address && `${errors?.address}`
            }
          />
        </Box>
      </Grid2>
    </Grid2>
  );
}
