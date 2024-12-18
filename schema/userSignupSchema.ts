import * as Yup from "yup";

import { validateXSS } from "@/utils/validateScriptInput";
import SignUpFields from "@/models/userSignUpModel";
import { isValidPhoneNumber } from "libphonenumber-js";

export const SignUpSchema: Yup.ObjectSchema<SignUpFields> = Yup.object({
  adminFirstName: Yup.string()
    .min(3, "Must be at least 3 characters long")
    .trim()
    .max(30, "Must be less than 30 characters long")
    .matches(/^[a-zA-Z ]*$/, "Must be only alphabets")
    .required("Please enter first name"),

  adminLastName: Yup.string()
    .trim()
    .min(3, "Must be at least 3 characters long")
    .max(30, "Must be less than 30 characters long")
    .matches(/^[a-zA-Z ]*$/, "Must be only alphabets"),

  adminEmail: Yup.string()
    .email("Invalid email format")
    .required("Email is required")
    .test("XSS", "Invalid characters detected", validateXSS),

  adminCountryCode: Yup.string().required("Admin Country Code is required"),
  adminFlagCode: Yup.string().required("Admin Country Code is required"),

  adminPhone: Yup.string()
    .matches(/^[0-9]*$/, "Phone number must be only digits")
    .test("isValidPhone", "Invalid phone number", (value, context) => {
      const countryCode = context.parent.adminFlagCode;
      const fullPhoneNumber = `${value}`;
      console.log("Validating Phone Number", countryCode, fullPhoneNumber);
      return value ? isValidPhoneNumber(fullPhoneNumber, countryCode) : true;
    })
    .required("Phone number is required"),

  adminPassword: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .max(20, "Password can't exceed 20 characters")
    .matches(/[a-zA-Z]/, "Password must contain at least one letter")
    .matches(/[0-9]/, "Password must contain at least one number")
    .matches(
      /[@$!%*?&]/,
      "Password must contain at least one special character"
    ),

  legalName: Yup.string()
    .required("Legal Name is required")
    .min(3, "Must be at least 3 characters")
    .max(100, "Exceeded 100 characters")
    .test("XSS", "Invalid characters detected", validateXSS),

  registrationNumber: Yup.string()
    .required("Registration Number is required")
    .test("XSS", "Invalid characters detected", validateXSS),

  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required")
    .test("XSS", "Invalid characters detected", validateXSS),

  flagCode: Yup.string().required("Country Code is required"),

  countryCode: Yup.string().required("Country Code is required"),
  phone: Yup.string()
    .matches(/^[0-9]*$/, "Phone number must be only digits")
    .test("isValidPhone", "Invalid phone number", (value, context) => {
      const countryCode = context.parent.flagCode;
      const fullPhoneNumber = `${value}`;
      console.log("Validating Phone Number", countryCode, fullPhoneNumber);
      return value ? isValidPhoneNumber(fullPhoneNumber, countryCode) : true;
    })
    .required("Phone number is required"),

  address: Yup.string().max(255, "Address can't exceed 255 characters"),

  city: Yup.string()
    .required("City is required")
    .matches(/^[a-zA-Z ]*$/, "Must be only alphabets")
    .test("XSS", "Invalid characters detected", validateXSS),
  // .test("XSS", "Invalid characters detected", (value) => {
  //   return value ? validateXSS(value) : true;
  // })
  state: Yup.string()
    .required("State is required")
    .matches(/^[a-zA-Z ]*$/, "Must be only alphabets")
    .test("XSS", "Invalid characters detected", validateXSS),
  // .test("XSS", "Invalid characters detected", (value) => {
  //   return value ? validateXSS(value) : true;
  // })
  country: Yup.string()
    .required("Country is required")
    .matches(/^[a-zA-Z ]*$/, "Must be only alphabets")
    .test("XSS", "Invalid characters detected", validateXSS),
  // .test("XSS", "Invalid characters detected", (value) => {
  //   return value ? validateXSS(value) : true;
  // })

  postalCode: Yup.string()
    .required("Postal Code is required")
    .matches(/^[0-9]*$/, "Phone number must be only digits")
    .min(4, "Postal code must be 4 digits long")
    .max(8, "Postal code must not exceed 8 digits"),

  companySize: Yup.string().required("Company Size is Required !"),
});
