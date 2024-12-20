import { Box, Paper } from "@mui/material";
import React from "react";
import AddUnit from "./components/AddUnit";
import UnitList from "./components/UnitList";

const ManageUnits = () => {
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
  );
};

export default ManageUnits;
