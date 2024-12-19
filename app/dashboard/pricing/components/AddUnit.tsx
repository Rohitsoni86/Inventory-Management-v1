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

export default function AddUnit() {
  const theme = useTheme();

  const [unit, setUnit] = useState("");

  const handleCreateCategory = () => {
    // Api call
    setUnit("");
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
          Create Unit
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
          name="unit"
          id="unit"
          placeholder="Name.."
          value={unit}
          onChange={(e) => {
            setUnit(e.target.value);
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
}
