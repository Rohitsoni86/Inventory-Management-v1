"use client";
import { Box, Button, InputLabel, Paper, TextField, Typography, useTheme } from "@mui/material";
import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup"; // For validation

// Yup validation schema for the category name
const CategorySchema = Yup.object({
  categoryName: Yup.string()
    .required("Category name is required")
    .min(3, "Category name must be at least 3 characters")
    .max(50, "Category name must be less than 50 characters")
    .trim(),
});

const AddCategory = () => {
  const theme = useTheme();

  // Formik setup
  const { values, handleChange, handleSubmit, errors, touched } = useFormik({
    initialValues: {
      categoryName: "",
    },
    validationSchema: CategorySchema,
    onSubmit: async (values) => {
      console.log("Category Created:", values);
      // Call the API or logic for creating the category here
      // After successful submission, reset the form
      values.categoryName = "";
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
          Create Category
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
          required
          fullWidth
          type="text"
          autoComplete="off"
          name="categoryName"
          id="categoryName"
          placeholder="Name.."
          value={values.categoryName}
          onChange={handleChange}
          error={touched.categoryName && Boolean(errors.categoryName)}
          helperText={touched.categoryName && errors.categoryName}
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
};

export default AddCategory;
