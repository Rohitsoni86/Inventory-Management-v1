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

interface Employee {
  employeeName: string;
  employeeEmail: string;
  employeePhone: string;
  employeeAddress: string;
  employeeCity: string;
  employeeState: string;
  employeeCountry: string;
  employeePostalCode: string;
  employeeGender: string;
  employeePassword: string;
  employeePhoto?: File | null;
}

// Yup validation schema
const EmployeeSchema = Yup.object({
  employeeName: Yup.string()
    .required("Name is required")
    .min(3, "Must be at least 3 characters long")
    .trim()
    .max(30, "Must be less than 30 characters long")
    .matches(/^[a-zA-Z ]*$/, "Must be only alphabets"),

  employeeEmail: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),

  employeePhone: Yup.string()
    .matches(/^[0-9]{10}$/, "Phone number must be exactly 10 digits")
    .matches(/^\d+$/, "Phone number must only contain digits") // Ensures only digits
    .required("Phone number is required"),

  employeeAddress: Yup.string().max(255, "Address can't exceed 255 characters"),

  employeeGender: Yup.string().required("Gender is required"),

  employeeCity: Yup.string()
    .required("City is required")
    .matches(/^[a-zA-Z ]*$/, "Must be only alphabets"),

  employeeState: Yup.string()
    .required("State is required")
    .matches(/^[a-zA-Z ]*$/, "Must be only alphabets"),

  employeeCountry: Yup.string()
    .required("Country is required")
    .matches(/^[a-zA-Z ]*$/, "Must be only alphabets"),

  employeePostalCode: Yup.string()
    .required("Postal Code is required")
    .matches(/^[0-9]*$/, "Phone number must be only digits")
    .min(4, "Postal code must be 4 digits long")
    .max(8, "Postal code must not exceed 8 digits"),

  employeePassword: Yup.string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters long"),
});

export default function AddEmployee() {
  const initialValues: Employee = {
    employeeName: "",
    employeeEmail: "",
    employeePhone: "",
    employeePostalCode: "",
    employeeAddress: "",
    employeeCity: "",
    employeeState: "",
    employeeCountry: "",
    employeeGender: "",
    employeePassword: "",
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
  } = useFormik<Employee>({
    initialValues,
    validationSchema: EmployeeSchema,
    onSubmit: async (values) => {
      console.log("Form Submitted", values);
      // You can perform an API call or other logic here
    },
  });

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
        employeeCountry: "",
        employeeCity: "",
        employeeState: "",
      });
    } else {
      setValues({
        ...values,
        employeeCountry: capitalize(
          data?.data[0].PostOffice[0].Country.toLowerCase()
        ),
        employeeCity: capitalize(
          data?.data[0].PostOffice[0].District.toLowerCase()
        ),
        employeeState: capitalize(
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
      values.employeePostalCode &&
      values.employeePostalCode.toString().length >= 6
    ) {
      const timeOut = setTimeout(() => {
        postalCodeMutate({ postalCode: values.employeePostalCode as string });
      }, 500);
      return () => clearTimeout(timeOut);
    }
  }, [values.employeePostalCode]);

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
          Create Employee
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
            {/* Employee Name */}
            <Box>
              <InputLabel required>Name</InputLabel>
              <TextField
                size="small"
                fullWidth
                type="text"
                name="employeeName"
                id="employeeName"
                placeholder="Name of employee"
                value={values.employeeName}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.employeeName && Boolean(errors.employeeName)}
                helperText={touched.employeeName && errors.employeeName}
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
            {/* Employee Email */}
            <Box>
              <InputLabel required>Email</InputLabel>
              <TextField
                size="small"
                fullWidth
                type="email"
                name="employeeEmail"
                id="employeeEmail"
                placeholder="Email of employee"
                value={values.employeeEmail}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.employeeEmail && Boolean(errors.employeeEmail)}
                helperText={touched.employeeEmail && errors.employeeEmail}
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
            {/* Employee Phone */}
            <Box>
              <InputLabel required>Phone No.</InputLabel>
              <TextField
                size="small"
                fullWidth
                type="tel"
                name="employeePhone"
                id="employeePhone"
                placeholder="Phone Number"
                value={values.employeePhone}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.employeePhone && Boolean(errors.employeePhone)}
                helperText={touched.employeePhone && errors.employeePhone}
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
            {/* Employee Gender */}
            <Box>
              <InputLabel required>Gender</InputLabel>
              <FormControl
                fullWidth
                error={
                  touched?.employeeGender && Boolean(errors?.employeeGender)
                }
              >
                <Select
                  id="employeeGender"
                  name="employeeGender"
                  size="small"
                  value={values?.employeeGender}
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
                {touched?.employeeGender && errors?.employeeGender && (
                  <FormHelperText>{errors?.employeeGender}</FormHelperText>
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
            {/* Employee Postal Code */}
            <Box>
              <InputLabel required>Postal Code</InputLabel>
              <TextField
                size="small"
                fullWidth
                type="text"
                name="employeePostalCode"
                id="employeePostalCode"
                placeholder="Enter code"
                error={
                  touched?.employeePostalCode &&
                  Boolean(errors?.employeePostalCode)
                }
                value={values.employeePostalCode}
                onBlur={handleBlur}
                onChange={handleChange}
                helperText={
                  errors?.employeePostalCode &&
                  touched?.employeePostalCode &&
                  `${errors?.employeePostalCode}`
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
                  name="employeeCountry"
                  id="employeeCountry"
                  placeholder="Enter country"
                  error={
                    touched?.employeeCountry && Boolean(errors?.employeeCountry)
                  }
                  value={values.employeeCountry}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  helperText={
                    errors?.employeeCountry &&
                    touched?.employeeCountry &&
                    `${errors?.employeeCountry}`
                  }
                />
              </Box>
              <Box>
                <InputLabel required>State</InputLabel>
                <TextField
                  size="small"
                  fullWidth
                  type="text"
                  name="employeeState"
                  id="employeeState"
                  placeholder="Enter state"
                  value={values.employeeState}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={
                    touched?.employeeState && Boolean(errors?.employeeState)
                  }
                  helperText={
                    errors?.employeeState &&
                    touched?.employeeState &&
                    `${errors?.employeeState}`
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
            {/* Employee City */}
            <Box>
              <InputLabel required>City</InputLabel>
              <TextField
                size="small"
                fullWidth
                type="text"
                name="employeeCity"
                id="employeeCity"
                placeholder="Enter city"
                error={touched?.employeeCity && Boolean(errors?.employeeCity)}
                value={values.employeeCity}
                onBlur={handleBlur}
                onChange={handleChange}
                helperText={
                  errors?.employeeCity &&
                  touched?.employeeCity &&
                  `${errors?.employeeCity}`
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
            {/* Employee Address */}
            <Box>
              <InputLabel>Address</InputLabel>
              <TextField
                size="small"
                fullWidth
                type="text"
                name="employeeAddress"
                id="employeeAddress"
                placeholder="Address"
                value={values.employeeAddress}
                onChange={handleChange}
                onBlur={handleBlur}
                error={
                  touched.employeeAddress && Boolean(errors.employeeAddress)
                }
                helperText={touched.employeeAddress && errors.employeeAddress}
              />
            </Box>
          </Grid2>

          {/* Employee Password */}
          <Grid2
            size={{
              xs: 12,
              sm: 4,
              md: 4,
              lg: 4,
            }}
          >
            <Box>
              <InputLabel required>Password</InputLabel>
              <TextField
                size="small"
                fullWidth
                type="password"
                name="employeePassword"
                id="employeePassword"
                placeholder="Password"
                value={values.employeePassword}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.employeePassword && Boolean(errors.employeePassword)}
                helperText={touched.employeePassword && errors.employeePassword}
              />
            </Box>
          </Grid2>

          {/* Employee Photo */}
          {/* <Grid2
            size={{
              xs: 12,
              sm: 4,
              md: 4,
              lg: 4,
            }}
          >
            <Box>
              <InputLabel required>Photo</InputLabel>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  setFieldValue("employeePhoto", file);
                }}
                onBlur={handleBlur}
              />
              {touched.employeePhoto && errors.employeePhoto && (
                <FormHelperText error>{errors.employeePhoto}</FormHelperText>
              )}
            </Box>
          </Grid2> */}
        </Grid2>

        {/* Submit Button */}
        <Box sx={{ p: 1, mt: 2, textAlign: "right" }}>
          <Button
            type="submit"
            variant="contained"
            sx={{
              px: 11,
              width: {
                xs: "100%",
                md: "30%",
              },
            }}
            size="small"
          >
            Add Employee
          </Button>
        </Box>
      </Box>
    </Paper>
  );
}
