import { Box, Paper } from "@mui/material";
import React from "react";
import AddBrands from "./components/AddBrand";
import BrandsList from "./components/BrandsList";

const ManageBrands = () => {
  return (
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
        <AddBrands />
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
          <BrandsList />
        </Paper>
      </Box>
    </Box>
  );
};

export default ManageBrands;
