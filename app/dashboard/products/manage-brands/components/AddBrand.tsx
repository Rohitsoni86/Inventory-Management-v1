"use client";
import { Box, Button, InputLabel, Paper, TextField, Typography, useTheme } from "@mui/material";
import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup"; // For validation

// Yup validation schema for the brand name
const BrandSchema = Yup.object({
  brand: Yup.string()
    .required("Brand name is required")
    .min(3, "Brand name must be at least 3 characters")
    .max(50, "Brand name must be less than 50 characters")
    .trim(),
});

export default function AddBrands() {
  const theme = useTheme();

  // Formik setup
  const { values, handleChange, handleSubmit, errors, touched } = useFormik({
    initialValues: {
      brand: "",
    },
    validationSchema: BrandSchema,
    onSubmit: async (values) => {
      console.log("Brand Created:", values);
      // You can call an API to create the brand here
      // After successful submission, reset the form
      values.brand = "";
    },
  });

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
          Create Brand
        </Typography>
      </Box>

      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          px: 1,
        }}
      >
        <InputLabel required>Give it a Name</InputLabel>
        <TextField
          size="medium"
          autoFocus
          // required
          fullWidth
          type="text"
          name="brand"
          id="brand"
          placeholder="Name.."
          value={values.brand}
          onChange={handleChange}
          error={touched.brand && Boolean(errors.brand)}
          helperText={touched.brand && errors.brand}
        />

        <Box
          sx={{
            pt: 2,
          }}
        >
          <Button
            type="submit"
            variant="contained"
            sx={{
              px: 11,
              display: "flex",
              justifyContent: "center",
              width: "100%",
            }}
            size="small"
          >
            Add
          </Button>
        </Box>
      </Box>
    </Paper>
  );
}
