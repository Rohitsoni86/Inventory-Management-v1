"use client";
import CountryCodeInput from "@/app/components/InternationalPhoneNumberComponent/CountryCodeInput";
import SignUpFields from "@/models/userSignUpModel";
import {
  Box,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { FormikProps } from "formik";
import React from "react";

interface FormProps
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

export default function OrganizationDetailsForm({
  values,
  handleChange,
  handleBlur,
  errors,
  touched,
  setFieldValue,
}: FormProps) {
  return (
    <>
      <Box>
        <InputLabel required>Organization Legal Name</InputLabel>
        <TextField
          size="small"
          autoFocus
          required
          fullWidth
          type="text"
          autoComplete="legalName"
          name="legalName"
          id="legalName"
          placeholder="Enter legal name "
          error={touched?.legalName && Boolean(errors?.legalName)}
          value={values.legalName}
          onBlur={handleBlur}
          onChange={handleChange}
          helperText={
            errors?.legalName && touched?.legalName && `${errors?.legalName}`
          }
        />
      </Box>
      <Box>
        <InputLabel required>Registration Number</InputLabel>
        <TextField
          size="small"
          required
          fullWidth
          type="text"
          autoComplete="registrationNumber"
          name="registrationNumber"
          id="registrationNumber"
          placeholder="Enter registration number"
          error={
            touched?.registrationNumber && Boolean(errors?.registrationNumber)
          }
          value={values.registrationNumber}
          onBlur={handleBlur}
          onChange={handleChange}
          helperText={
            errors?.registrationNumber &&
            touched?.registrationNumber &&
            `${errors?.registrationNumber}`
          }
        />
      </Box>
      <Box>
        <InputLabel required>Official Email</InputLabel>
        <TextField
          size="small"
          required
          fullWidth
          type="email"
          autoComplete="email"
          name="email"
          id="email"
          placeholder="Enter organization email"
          error={touched?.email && Boolean(errors?.email)}
          value={values.email}
          onBlur={handleBlur}
          onChange={handleChange}
          helperText={errors?.email && touched?.email && `${errors?.email}`}
        />
      </Box>
      <Box>
        <InputLabel required>Organization Phone</InputLabel>
        {/* <TextField
          size="small"
          required
          fullWidth
          type="phone"
          autoComplete="phone"
          name="phone"
          id="phone"
          placeholder="Enter organization phone"
          error={touched?.phone && Boolean(errors?.phone)}
          value={values.phone}
          onBlur={handleBlur}
          onChange={handleChange}
          helperText={errors?.phone && touched?.phone && `${errors?.phone}`}
        /> */}
        {/* <Box> */}
        {/* <InputLabel required>Phone</InputLabel> */}
        <CountryCodeInput<SignUpFields>
          values={values}
          handleChange={handleChange}
          handleBlur={handleBlur}
          errors={errors}
          touched={touched}
          setFieldValue={setFieldValue}
          countryCodeFieldName="flagCode"
          phoneFieldName="phone"
          callingCode="countryCode"
        />
      </Box>
      {/* </Box> */}

      <Box>
        <InputLabel required>Company Size</InputLabel>
        <FormControl
          fullWidth
          error={touched?.companySize && Boolean(errors?.companySize)}
        >
          <Select
            size="small"
            value={values.companySize}
            onChange={handleChange}
            onBlur={handleBlur}
            fullWidth
            name="companySize"
            variant="outlined"
            displayEmpty
          >
            <MenuItem value="">Select Size</MenuItem>
            <MenuItem value="1-10">1-10</MenuItem>
            <MenuItem value="11-50">11-50</MenuItem>
            <MenuItem value="51-200">51-200</MenuItem>
            <MenuItem value="201-500">201-500</MenuItem>
            <MenuItem value="501-1000">501-1000</MenuItem>
            <MenuItem value="1000+">1000+</MenuItem>
          </Select>
          {touched?.companySize && errors?.companySize && (
            <FormHelperText>{errors?.companySize}</FormHelperText>
          )}
        </FormControl>
      </Box>
    </>
  );
}
