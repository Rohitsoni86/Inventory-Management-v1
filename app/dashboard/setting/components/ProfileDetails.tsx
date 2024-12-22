"use client";
import {
  Box,
  Button,
  Grid2,
  IconButton,
  InputAdornment,
  InputLabel,
  TextField,
} from "@mui/material";
import Image from "next/image";
import React, { useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { FormikProps } from "formik";
import SignUpFields from "@/models/userSignUpModel";
import CountryCodeInput from "@/app/components/InternationalPhoneNumberComponent/CountryCodeInput";

interface AdminDetailsFormProps
  extends Pick<
    FormikProps<SignUpFields>,
    | "values"
    | "handleChange"
    | "handleBlur"
    | "errors"
    | "touched"
    | "setFieldValue"
  > {
  name?: string;
}

export default function AdminDetailsForm({
  values,
  handleChange,
  handleBlur,
  errors,
  touched,
  setFieldValue,
}: AdminDetailsFormProps) {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const togglePasswordVisibility = (): void => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <Grid2 container spacing={2}>
        <Grid2
          size={{
            xs: 12,
            md: 4,
          }}
        >
          <Box>
            <InputLabel required focused={true}>
              Name
            </InputLabel>
            <Box
              sx={{
                display: "flex",
                gap: 2,
              }}
            >
              <Box
                sx={{
                  width: "100%",
                }}
              >
                <TextField
                  variant="outlined"
                  size="small"
                  autoFocus={true}
                  autoComplete="off"
                  type="text"
                  fullWidth
                  placeholder="First Name"
                  name="adminFirstName"
                  error={
                    touched?.adminFirstName && Boolean(errors?.adminFirstName)
                  }
                  value={values?.adminFirstName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  helperText={
                    errors.adminFirstName &&
                    touched?.adminFirstName &&
                    `${errors.adminFirstName}`
                  }
                  id="adminFirstName"
                />
              </Box>
              <Box
                sx={{
                  width: "100%",
                }}
              >
                <TextField
                  variant="outlined"
                  size="small"
                  autoComplete="off"
                  type="text"
                  fullWidth
                  placeholder="Last Name"
                  name="adminLastName"
                  error={
                    touched?.adminLastName && Boolean(errors?.adminLastName)
                  }
                  value={values?.adminLastName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  helperText={
                    errors.adminLastName &&
                    touched?.adminLastName &&
                    `${errors.adminLastName}`
                  }
                  id="adminLastName"
                />
              </Box>
            </Box>
          </Box>
        </Grid2>
        <Grid2
          size={{
            xs: 12,
            md: 4,
          }}
        >
          
            <Box>
              <InputLabel required>Email</InputLabel>
              <TextField
                size="small"
                required
                fullWidth
                error={touched?.adminEmail && Boolean(errors?.adminEmail)}
                type="email"
                autoComplete="off"
                name="adminEmail"
                id="adminEmail"
                placeholder="Enter your email"
                value={values.adminEmail}
                onBlur={handleBlur}
                onChange={handleChange}
                helperText={
                  errors?.adminEmail &&
                  touched?.adminEmail &&
                  `${errors.adminEmail}`
                }
              />
            </Box>
         
        </Grid2>
        <Grid2
          size={{
            xs: 12,
            md: 4,
          }}
        >
           <Box>
              <InputLabel required>Phone</InputLabel>
              <CountryCodeInput<SignUpFields>
                values={values}
                handleChange={handleChange}
                handleBlur={handleBlur}
                errors={errors}
                touched={touched}
                setFieldValue={setFieldValue}
                countryCodeFieldName="adminFlagCode"
                phoneFieldName="adminPhone"
                callingCode="adminCountryCode"
              />
            </Box>
        </Grid2>
       
      </Grid2>
    </>
  );
}
