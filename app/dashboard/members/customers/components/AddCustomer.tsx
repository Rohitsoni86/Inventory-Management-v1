"use client";
import { usePostalCodeApi } from "@/api/general-api";
import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  FormHelperText,
  Grid2,
  InputAdornment,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { AxiosError, AxiosResponse } from "axios";
import { useFormik } from "formik";
import React, { useEffect } from "react";
import * as Yup from "yup"; // Import Yup for validation

interface Customers {
  customerEmail: string;
  customerCountryCode?: string;
  customerPhone: string;
  customerAddress: string;
  customerCity: string;
  customerState: string;
  customerCountry: string;
  customerPostalCode: string;
  customerBalance: number | null;
  customerFlagCode?: string;
  customerName: string;
  customerGender: string;
}

// Yup validation schema
const SignUpSchema = Yup.object({
  customerName: Yup.string()
    .required("Name is required")
    .min(3, "Must be at least 3 characters long")
    .trim()
    .max(30, "Must be less than 30 characters long")
    .matches(/^[a-zA-Z ]*$/, "Must be only alphabets"),

  customerEmail: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),

  customerPhone: Yup.string()
    .matches(/^[0-9]{10}$/, "Phone number must be exactly 10 digits")
    .matches(/^\d+$/, "Phone number must only contain digits") // Ensures only digits
    .required("Phone number is required"),

  customerAddress: Yup.string().max(255, "Address can't exceed 255 characters"),

  customerBalance: Yup.number()
    .required("Balance is required")
    .min(0, "Balance cannot be negative")
    .max(100000, "Balance cannot exceed limit 100000"),

  customerGender: Yup.string().required("Gender is required"),

  customerCity: Yup.string()
    .required("City is required")
    .matches(/^[a-zA-Z ]*$/, "Must be only alphabets"),

  customerState: Yup.string()
    .required("State is required")
    .matches(/^[a-zA-Z ]*$/, "Must be only alphabets"),

  customerCountry: Yup.string()
    .required("Country is required")
    .matches(/^[a-zA-Z ]*$/, "Must be only alphabets"),

  customerPostalCode: Yup.string()
    .required("Postal Code is required")
    .matches(/^[0-9]*$/, "Phone number must be only digits")
    .min(4, "Postal code must be 4 digits long")
    .max(8, "Postal code must not exceed 8 digits"),
});

export default function AddCustomer() {
  const initialValues: Customers = {
    customerName: "",
    customerEmail: "",
    customerCountryCode: "+91",
    customerPhone: "",
    customerPostalCode: "",
    customerAddress: "",
    customerCity: "",
    customerState: "",
    customerCountry: "",
    customerBalance: null,
    customerFlagCode: "IN",
    customerGender: "",
  };

  const {
    values,
    handleChange,
    handleBlur,
    handleSubmit,
    errors,
    touched,
    setValues,
    setFieldValue,
  } = useFormik<Customers>({
    initialValues,
    validationSchema: SignUpSchema,
    onSubmit: async (values) => {
      console.log("Form Submitted", values);
      // You can perform an API call or other logic here
    },
  });

  const theme = useTheme();

  // Handle form submission when button is clicked
  const handleCreateCustomer = () => {
    handleSubmit();
  };

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
        customerCountry: "",
        customerCity: "",
        customerState: "",
      });
    } else {
      setValues({
        ...values,
        customerCountry: capitalize(
          data?.data[0].PostOffice[0].Country.toLowerCase()
        ),
        customerCity: capitalize(
          data?.data[0].PostOffice[0].District.toLowerCase()
        ),
        customerState: capitalize(
          data?.data[0].PostOffice[0].State.toLowerCase()
        ),
      });
    }
  };

  const onPostalCodeError = (error: AxiosError) => {
    console.log(error, "error");
  };

  useEffect(() => {
    if (
      values.customerPostalCode &&
      values.customerPostalCode.toString().length >= 6
    ) {
      const timeOut = setTimeout(() => {
        postalCodeMutate({ postalCode: values.customerPostalCode as string });
      }, 500);
      return () => clearTimeout(timeOut);
    }
  }, [values.customerPostalCode]);

  const { mutateAsync: postalCodeMutate, isPending: searchingPincodeDetails } =
    usePostalCodeApi(onPostalCodeSuccess, onPostalCodeError);

  return (
    <Paper
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        pb: 2,
      }}
    >
      <Box
        sx={{
          borderBottom: `2px solid ${theme.palette.grey[600]}`,
          p: 2,
        }}
      >
        <Typography
          sx={{
            fontSize: {
              xs: "18px",
              lg: "22px",
            },
            fontWeight: 700,
            color: theme.palette.primary.main,
          }}
        >
          Create Customer
        </Typography>
      </Box>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          gap: 2,
          px: 2,
        }}
      >
        <Grid2 container spacing={2}>
          <Grid2
            size={{
              xs: 12,
              sm: 4,
              md: 4,
              lg: 4,
            }}
          >
            {/* Customer Name */}
            <Box>
              <InputLabel required>Name</InputLabel>
              <TextField
                size="small"
                fullWidth
                type="text"
                name="customerName"
                id="customerName"
                placeholder="Name of customer"
                value={values.customerName}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.customerName && Boolean(errors.customerName)}
                helperText={touched.customerName && errors.customerName}
              />
            </Box>
          </Grid2>
          <Grid2
            size={{
              xs: 12,
              sm: 4,
              md: 4,
              lg: 4,
            }}
          >
            {/* Customer Email */}
            <Box>
              <InputLabel required>Email</InputLabel>
              <TextField
                size="small"
                fullWidth
                type="email"
                name="customerEmail"
                id="customerEmail"
                placeholder="Email of customer"
                value={values.customerEmail}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.customerEmail && Boolean(errors.customerEmail)}
                helperText={touched.customerEmail && errors.customerEmail}
              />
            </Box>
          </Grid2>
          <Grid2
            size={{
              xs: 12,
              sm: 4,
              md: 4,
              lg: 4,
            }}
          >
            {/* Customer Phone */}
            <Box>
              <InputLabel required>Phone No.</InputLabel>
              <TextField
                size="small"
                fullWidth
                type="tel"
                name="customerPhone"
                id="customerPhone"
                placeholder="Phone Number"
                value={values.customerPhone}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.customerPhone && Boolean(errors.customerPhone)}
                helperText={touched.customerPhone && errors.customerPhone}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">+91</InputAdornment>
                    ),
                  },
                }}
              />
            </Box>
          </Grid2>
          <Grid2
            size={{
              xs: 12,
              sm: 4,
              md: 4,
              lg: 4,
            }}
          >
            <Box>
              <InputLabel required>Gender</InputLabel>
              <FormControl
                fullWidth
                error={
                  touched?.customerGender && Boolean(errors?.customerGender)
                }
              >
                <Select
                  id="customerGender"
                  name="customerGender"
                  size="small"
                  value={values?.customerGender}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  displayEmpty
                >
                  <MenuItem value="" disabled>
                    Select Gender
                  </MenuItem>
                  <MenuItem value="male">Male</MenuItem>
                  <MenuItem value="female">Female</MenuItem>
                  <MenuItem value="others">Others</MenuItem>
                </Select>
                {touched?.customerGender && errors?.customerGender && (
                  <FormHelperText>{errors?.customerGender}</FormHelperText>
                )}
              </FormControl>
            </Box>
          </Grid2>

          <Grid2
            size={{
              xs: 12,
              sm: 4,
              md: 4,
              lg: 4,
            }}
          >
            <Box>
              <InputLabel required>Postal Code</InputLabel>
              <TextField
                size="small"
                fullWidth
                type="text"
                name="customerPostalCode"
                id="customerPostalCode"
                placeholder="Enter code"
                error={
                  touched?.customerPostalCode &&
                  Boolean(errors?.customerPostalCode)
                }
                value={values.customerPostalCode}
                onBlur={handleBlur}
                onChange={handleChange}
                helperText={
                  errors?.customerPostalCode &&
                  touched?.customerPostalCode &&
                  `${errors?.customerPostalCode}`
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
              sm: 4,
              md: 4,
              lg: 4,
            }}
          >
            <Box sx={{ display: "flex", gap: 2 }}>
              <Box>
                <InputLabel required>Country</InputLabel>
                <TextField
                  size="small"
                  fullWidth
                  type="text"
                  name="customerCountry"
                  id="customerCountry"
                  placeholder="Enter country"
                  error={
                    touched?.customerCountry && Boolean(errors?.customerCountry)
                  }
                  value={values.customerCountry}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  helperText={
                    errors?.customerCountry &&
                    touched?.customerCountry &&
                    `${errors?.customerCountry}`
                  }
                />
              </Box>
              <Box>
                <InputLabel required>State</InputLabel>
                <TextField
                  size="small"
                  fullWidth
                  type="text"
                  name="customerState"
                  id="customerState"
                  placeholder="Enter state"
                  value={values.customerState}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={
                    touched?.customerState && Boolean(errors?.customerState)
                  }
                  helperText={
                    errors?.customerState &&
                    touched?.customerState &&
                    `${errors?.customerState}`
                  }
                />
              </Box>
            </Box>
          </Grid2>
          <Grid2
            size={{
              xs: 12,
              sm: 4,
              md: 4,
              lg: 4,
            }}
          >
            <Box>
              <InputLabel required>City</InputLabel>
              <TextField
                size="small"
                fullWidth
                type="text"
                name="customerCity"
                id="customerCity"
                placeholder="Enter city"
                error={touched?.customerCity && Boolean(errors?.customerCity)}
                value={values.customerCity}
                onBlur={handleBlur}
                onChange={handleChange}
                helperText={
                  errors?.customerCity &&
                  touched?.customerCity &&
                  `${errors?.customerCity}`
                }
              />
            </Box>
          </Grid2>
          <Grid2
            size={{
              xs: 12,
              sm: 4,
              md: 4,
              lg: 4,
            }}
          >
            {/* Customer Address */}
            <Box>
              <InputLabel>Address</InputLabel>
              <TextField
                size="small"
                fullWidth
                type="text"
                name="customerAddress"
                id="customerAddress"
                placeholder="Address"
                value={values.customerAddress}
                onChange={handleChange}
                onBlur={handleBlur}
                error={
                  touched.customerAddress && Boolean(errors.customerAddress)
                }
                helperText={touched.customerAddress && errors.customerAddress}
              />
            </Box>
          </Grid2>

          <Grid2
             size={{
              xs: 12,
              sm: 4,
              md: 4,
              lg: 4,
            }}
          >
            {/* Customer Balance */}
            <Box>
              <InputLabel required>Balance</InputLabel>
              <TextField
                size="small"
                fullWidth
                type="number"
                name="customerBalance"
                id="customerBalance"
                placeholder="Balance"
                value={values.customerBalance || ""}
                onChange={handleChange}
                onBlur={handleBlur}
                error={
                  touched.customerBalance && Boolean(errors.customerBalance)
                }
                helperText={touched.customerBalance && errors.customerBalance}
              />
            </Box>
          </Grid2>
        </Grid2>

        {/* Submit Button */}
        <Box sx={{ p: 1, mt: 2,textAlign:"right" }}>
          <Button
            type="submit"
            variant="contained"
            sx={{
              px: 11,
              width: {
                xs:"100%",
                md:"30%"
              },
            }}
            size="small"
          >
            Add Customer
          </Button>
        </Box>
      </Box>
    </Paper>
  );
}
