import SignUpFields from "@/models/userSignUpModel";
import { Grid2 } from "@mui/material";
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

export default function OrganizationDetails({
  values,
  handleChange,
  handleBlur,
  errors,
  touched,
  setFieldValue,
}: FormProps) {
  return (
    <Grid2 container spacing={0}>
      <Grid2
        size={{
          xs: 12,
        }}
      ></Grid2>
    </Grid2>
  );
}
