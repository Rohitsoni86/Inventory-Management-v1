"use client";
import { Box, Button, Grid2, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import underConstruction from "@/public/Images/underConstruction.svg";
import { usePathname, useRouter } from "next/navigation";

const UnderDevelopment = () => {
  const router = useRouter();
  const pathName = usePathname();
  return (
    <Grid2
      container
      spacing={2}
      padding={4}
      sx={{
        height: "80vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Grid2
        size={{
          xs: 12,
          md: 6,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Typography
            sx={{
              fontWeight: "bold",
              fontSize: "40px",
            }}
          >
            This Page is Under Development
          </Typography>
          <Typography
            sx={{
              marginTop: "20px",
              fontSize: "16px",
            }}
          >
            This page is currently down, developers are working on it!
            {/* <br />
            We suggest you back home. */}
          </Typography>
          {pathName !== "/dashboard" && (
            <Button
              onClick={() => {
                router.back();
              }}
              sx={{
                padding: "15px",
                marginTop: "20px",
                margin: "30px 60px",
              }}
              startIcon={<ArrowBackRoundedIcon />}
              variant="contained"
            >
              Back Home
            </Button>
          )}
        </Box>
      </Grid2>
      <Grid2
        size={{
          xs: 12,
          md: 6,
        }}
      >
        <Image src={underConstruction} alt="Under Construction" />
      </Grid2>
    </Grid2>
  );
};

export default UnderDevelopment;
