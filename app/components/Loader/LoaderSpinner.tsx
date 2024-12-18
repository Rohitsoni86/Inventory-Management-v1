import React from "react";
import { CircularProgress, Container, Grid2, useTheme } from "@mui/material";

function ChikitsaSpinner() {
  const theme = useTheme();
  return (
    <Grid2
      container
      sx={{ height: "60vh", alignItems: "center", justifyContent: "center" }}
    >
      <Container
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Grid2
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
        >
          <Grid2
            size={{
              xs: 12,
            }}
          >
            <CircularProgress
              size="44px"
              thickness={4.5}
              sx={{
                color: theme.palette.secondary.main,
              }}
            />
          </Grid2>
        </Grid2>
      </Container>
    </Grid2>
  );
}

export default ChikitsaSpinner;
