"use client";
import { Box, Card, CardContent, Typography, useTheme } from "@mui/material";
import React from "react";

// Define types for the props
interface ContactCardProps {
  title: string;
  icon: React.ReactNode; // ReactNode allows us to pass any valid React element (e.g., icons, strings, etc.)
  url: string;
  description: string;
}

const ContactCard: React.FC<ContactCardProps> = ({ title, icon, url, description }) => {
  const theme = useTheme();

  return (
    <Card
      sx={{
        background: theme.palette.common.black,
        border: "2px solid white",
        borderRadius: "8px",
        maxWidth: "300px",
        margin: "10px",
      }}
    >
      <a href={url} target="_blank" rel="noopener noreferrer">
        <CardContent
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Box>{icon}</Box>
          <Box>
            <Typography
              sx={{
                fontSize: "16px",
                fontWeight: 600,
                color: theme.palette.common.white,
              }}
            >
              {title}
            </Typography>
            <Typography
              sx={{
                fontSize: "14px",
                color: theme.palette.secondary.main,
              }}
            >
              {description}
            </Typography>
          </Box>
        </CardContent>
      </a>
    </Card>
  );
};

export default ContactCard;
