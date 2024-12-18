import React, { useState, ChangeEvent } from "react";
import {
  TextField,
  InputAdornment,
  MenuItem,
  Select,
  FormControl,
  Box,
  SelectChangeEvent,
} from "@mui/material";
import { FormikProps, FormikValues } from "formik";
import countryCodes from "./country_data"; // Assume countryCodes is your data source
import Image from "next/image";

// Define the structure of Country Data
interface CountryData {
  code: string;
  dialCode: string;
  flag: string;
  name: string;
  flagSvg: string;
}

// Make the component generic
interface CountryCodeInputProps<T>
  extends Pick<
    FormikProps<T>,
    | "values"
    | "handleChange"
    | "handleBlur"
    | "errors"
    | "touched"
    | "setFieldValue"
  > {
  countryCodeFieldName: keyof T; // Country field key from the form model
  phoneFieldName: keyof T; // Phone field key from the form model
  callingCode: keyof T;
  defaultCountry?: string; // Optional default country code
}

const CountryCodeInput = <T extends FormikValues>({
  values,
  handleChange,
  handleBlur,
  errors,
  touched,
  countryCodeFieldName,
  phoneFieldName,
  callingCode,
  setFieldValue,
  defaultCountry = "IN", // Default country as India
}: CountryCodeInputProps<T>) => {
  // Initial state with default country
  const [selectedCountry, setSelectedCountry] = useState<CountryData>(
    countryCodes.find((country) => country.code === defaultCountry) || {
      code: "IN",
      dialCode: "+91",
      flag: "IN",
      name: "India",
      flagSvg: "https://flagcdn.com/40x30/in.png",
    }
  );

  // Handle country selection
  const handleCountryChange = (event: SelectChangeEvent<string>) => {
    const newCountryCode = event.target.value;
    const newCountry = countryCodes.find(
      (country) => country.code === newCountryCode
    );

    if (newCountry) {
      setSelectedCountry(newCountry);
      handleChange({
        target: {
          name: countryCodeFieldName as string,
          value: newCountry.code,
        },
      });
      setFieldValue(callingCode as string, `${newCountry.dialCode}`);
    }
  };

  // Handle phone number change
  const handlePhoneNumberChange = (event: ChangeEvent<HTMLInputElement>) => {
    handleChange({
      target: { name: phoneFieldName as string, value: event.target.value },
    });
  };

  // Get selected country data
  const selectedCountryData = countryCodes.find(
    (country) => country.code === selectedCountry.code
  );

  return (
    <Box sx={{ width: "100%", display: "flex", gap: 1 }}>
      <Box>
        <FormControl fullWidth>
          <Select
            value={values[countryCodeFieldName as keyof T] as string}
            onChange={handleCountryChange}
            name={countryCodeFieldName as string}
            onBlur={handleBlur}
            size="small"
            renderValue={(selected) => {
              const selectedCountry = countryCodes.find(
                (country) => country.code === selected
              );
              return selectedCountry ? (
                <Image
                  src={selectedCountry.flagSvg}
                  alt={selectedCountry.name}
                  width={22}
                  height={13}
                />
              ) : null;
            }}
          >
            {countryCodes.map((country) => (
              <MenuItem key={country.code} value={country.code}>
                <Image
                  src={country.flagSvg}
                  alt={country.name}
                  width={22}
                  height={16}
                  style={{ marginRight: 8 }}
                />
                {country.name} {country.dialCode}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <TextField
        name={phoneFieldName as string}
        variant="outlined"
        fullWidth
        size="small"
        autoComplete="off"
        value={values[phoneFieldName as keyof T] as string}
        onChange={handlePhoneNumberChange}
        onBlur={handleBlur}
        error={
          !!(
            touched[phoneFieldName as string] &&
            errors[phoneFieldName as string]
          )
        }
        helperText={
          touched[phoneFieldName as string] && errors[phoneFieldName as string]
            ? `${errors[phoneFieldName as string]}`
            : ""
        }
        slotProps={{
          input: {
            startAdornment: selectedCountryData && (
              <InputAdornment position="start">
                {selectedCountryData.dialCode}
              </InputAdornment>
            ),
          },
        }}
      />
    </Box>
  );
};

export default CountryCodeInput;
