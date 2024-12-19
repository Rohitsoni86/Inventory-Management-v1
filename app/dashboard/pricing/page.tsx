"use client";
import UnderDevelopment from "@/app/components/UnderDevelopmentPage";
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid2,
  InputLabel,
  Paper,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useState } from "react";
import CategoryList from "./components/CategoryList";
import CustomerList from "./components/CustomerList";
import AddCustomer from "./components/AddCustomer";
import AddCategory from "./components/AddCategory";
import AddUnit from "./components/AddUnit";
import UnitList from "./components/UnitList";

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
          <AddUnit />
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
            <UnitList />
          </Paper>
        </Box>
      </Box>
      {/* <Box
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
              md: "60%",
            },
          }}
        >
          <AddCustomer />
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
            <CustomerList />
          </Paper>
        </Box>
      </Box> */}
    </Box>
  );
};

export default PricingPage;
