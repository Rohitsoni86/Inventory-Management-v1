"use client";
import { Box, Grid2, useTheme } from "@mui/material";
import Image from "next/image";
import React from "react";
import ContactCard from "./components/ContactCard";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import EmailIcon from "@mui/icons-material/Email";
import GitHubIcon from "@mui/icons-material/GitHub";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import InstagramIcon from "@mui/icons-material/Instagram";
import AddLocationIcon from "@mui/icons-material/AddLocation";
import PhoneForwardedIcon from "@mui/icons-material/PhoneForwarded";

function SupportPage() {
  const theme = useTheme();
  // Sample data for the contact cards (This can be passed as props or fetched from an API)
  const contactData = [
    {
      title: "LinkedIn",
      description: "LinkedIn Profile",
      link: "https://www.linkedin.com/in/engineer-rohit-soni-thetechyguy/",
      icon: (
        <LinkedInIcon
          fontSize={"large"}
          sx={{
            fontSize: "34px",
            color: theme.palette.common.white,
          }}
        />
      ),
    },
    {
      title: "Email",
      description: "Contact via Email",
      link: "mailto:dynamicsoni.rohit@gmail.com",
      icon: (
        <EmailIcon
          fontSize={"large"}
          sx={{
            fontSize: "34px",
            color: theme.palette.common.white,
          }}
        />
      ),
    },
    {
      title: "GitHub",
      description: "GitHub Profile",
      link: "https://github.com/Rohitsoni86",
      icon: (
        <GitHubIcon
          fontSize={"large"}
          sx={{
            fontSize: "34px",
            color: theme.palette.common.white,
          }}
        />
      ),
    },
    {
      title: "WhatsApp",
      description: "Message on WhatsApp",
      link: "https://wa.me/7742736286",
      icon: (
        <WhatsAppIcon
          fontSize={"large"}
          sx={{
            fontSize: "34px",
            color: theme.palette.common.white,
          }}
        />
      ),
    },
    {
      title: "Instagram",
      description: "Instagram Profile",
      link: "https://www.instagram.com/mr__rohitsoni__/",
      icon: (
        <InstagramIcon
          fontSize={"large"}
          sx={{
            fontSize: "34px",
            color: theme.palette.common.white,
          }}
        />
      ),
    },
    {
      title: "Location",
      description: "Find my Location",
      link: "https://goo.gl/maps/HfLoqE4hFaX7rMb3A",
      icon: (
        <AddLocationIcon
          fontSize={"large"}
          sx={{
            fontSize: "34px",
            color: theme.palette.common.white,
          }}
        />
      ),
    },
    {
      title: "Phone",
      description: "Call me",
      link: "tel:+917742736286",
      icon: (
        <PhoneForwardedIcon
          fontSize={"large"}
          sx={{
            fontSize: "34px",
            color: theme.palette.common.white,
          }}
        />
      ),
    },
  ];

  const firstFour = contactData.slice(0, 4);
  const lastThree = contactData.slice(-3);

  return (
    <Grid2
      container
      spacing={2}
      justifyContent={"center"}
      sx={{
        background: theme.palette.common.black,
        borderRadius: "22px",
        minHeight: "30vh",
        p: 2,
      }}
    >
      <Grid2
        size={{
          xs: 4,
        }}
        container
        spacing={2}
        direction="column"
      >
        {firstFour.map((contact, index) => (
          <Grid2 key={index}>
            <ContactCard
              title={contact.title}
              description={contact.description}
              url={contact.link}
              icon={contact.icon}
            />
          </Grid2>
        ))}
      </Grid2>
      <Grid2
        size={{
          xs: 4,
        }}
      >
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image
            src="/Images/rohitSoniDeveloperImage.png"
            width={300}
            height={400}
            alt="Rohit Soni Developer"
          />
        </Box>
      </Grid2>
      <Grid2
        size={{
          xs: 4,
        }}
        container
        spacing={2}
        direction="column"
      >
        {lastThree.map((contact, index) => (
          <Grid2 key={index}>
            <ContactCard
              title={contact.title}
              description={contact.description}
              url={contact.link}
              icon={contact.icon}
            />
          </Grid2>
        ))}
      </Grid2>
    </Grid2>
  );
}

export default SupportPage;
