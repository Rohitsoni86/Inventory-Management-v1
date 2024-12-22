"use client";
import { Box, Button, InputLabel, Paper, TextField, Typography, useTheme } from "@mui/material";
import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup"; // For validation

// Yup validation schema for the unit name
const UnitSchema = Yup.object({
  unit: Yup.string()
    .required("Unit name is required")
    .min(2, "Unit name must be at least 2 characters")
    .max(50, "Unit name must be less than 50 characters")
    .trim(),
});

const AddUnit = () => {
  const theme = useTheme();

  // Formik setup
  const { values, handleChange, handleSubmit, errors, touched } = useFormik({
    initialValues: {
      unit: "",
    },
    validationSchema: UnitSchema,
    onSubmit: async (values) => {
      console.log("Unit Created:", values);
      // Call the API or logic for creating the unit here
      // After successful submission, reset the form
      values.unit = "";
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
          Create Unit
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
          name="unit"
          id="unit"
          placeholder="Name.."
          value={values.unit}
          onChange={handleChange}
          error={touched.unit && Boolean(errors.unit)}
          helperText={touched.unit && errors.unit}
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

export default AddUnit;
