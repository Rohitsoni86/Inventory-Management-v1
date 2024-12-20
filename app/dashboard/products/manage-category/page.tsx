"use client";
import { Box, Paper } from "@mui/material";
import React, { useState } from "react";
import CategoryList from "./components/CategoryList";
import AddCategory from "./components/AddCategory";

const PricingPage = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: {
            xs: "center",
            lg: "flex-start",
          },
          flexDirection: {
            xs: "column",
            md: "row",
          },
          gap: 4,
        }}
      >
        <Box
          sx={{
            width: {
              xs: "100%",
              md: "40%",
            },
          }}
        >
          <AddCategory />
        </Box>
        <Box
          sx={{
            width: {
              xs: "100%",
              md: "60%",
            },
          }}
        >
          <Paper>
            <CategoryList />
          </Paper>
        </Box>
      </Box>
    </Box>
  );
};

export default PricingPage;
