"use client";
import {
  Box,
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
import CountryCodeInput from "../../components/InternationalPhoneNumberComponent/CountryCodeInput";

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
              error={touched?.adminFirstName && Boolean(errors?.adminFirstName)}
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
              error={touched?.adminLastName && Boolean(errors?.adminLastName)}
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
      <Box>
        <InputLabel required>Email</InputLabel>
        <TextField
          size="small"
          autoFocus={false}
          required
          fullWidth
          error={touched?.adminEmail && Boolean(errors?.adminEmail)}
          type="email"
          autoComplete="off"
          name="adminEmail"
          id="adminEmail"
          placeholder="Enter your email or phone number"
          value={values.adminEmail}
          onBlur={handleBlur}
          onChange={handleChange}
          helperText={
            errors?.adminEmail && touched?.adminEmail && `${errors.adminEmail}`
          }
        />
      </Box>
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
      <Box>
        <InputLabel required>Password</InputLabel>
        <TextField
          size="small"
          fullWidth
          type={showPassword ? "text" : "password"}
          placeholder="Enter password"
          autoComplete="current-password"
          name="adminPassword"
          id="adminPassword"
          error={touched?.adminPassword && Boolean(errors?.adminPassword)}
          value={values.adminPassword}
          onBlur={handleBlur}
          onChange={handleChange}
          helperText={
            errors?.adminPassword &&
            touched?.adminPassword &&
            `${errors?.adminPassword}`
          }
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={togglePasswordVisibility}
                    edge="end"
                    tabIndex={-1}
                  >
                    {showPassword ? (
                      <VisibilityIcon />
                    ) : (
                      <Image
                        src="/Icons/EyeCloseIconSvg.svg"
                        alt="Chikitsa Password Eye close Icon"
                        width={24}
                        height={24}
                      />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            },
          }}
        />
      </Box>
    </>
  );
}
