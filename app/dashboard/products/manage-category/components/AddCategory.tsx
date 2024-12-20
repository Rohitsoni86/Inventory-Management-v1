"use client";
import {
  Box,
  Button,
  InputLabel,
  Paper,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useState } from "react";

const AddCategory = () => {
  const theme = useTheme();

  const [category, setCategory] = useState("");

  const handleCreateCategory = () => {
    // Api call
    setCategory("");
  };
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
          autoComplete="email"
          name="categoryName"
          id="categoryName"
          placeholder="Name.."
          value={category}
          onChange={(e) => {
            setCategory(e.target.value);
          }}
        />
      </Box>
      <Box
        sx={{
          px: 1,
        }}
      >
        <Button
          type="button"
          variant="contained"
          sx={{
            px: 11,
            display: "flex",
            justifyContent: "center",
            width: "100%",
          }}
          size="small"
          onClick={handleCreateCategory}
        >
          Add
        </Button>
      </Box>
    </Paper>
  );
};

export default AddCategory;
