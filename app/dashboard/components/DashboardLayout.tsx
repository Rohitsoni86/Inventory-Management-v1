"use client";
import {
  AppBar,
  Box,
  Button,
  Collapse,
  CssBaseline,
  Divider,
  Drawer,
  Icon,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import Image from "next/image";
import Link from "next/link";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PasswordIcon from "@mui/icons-material/Password";
import PersonIcon from "@mui/icons-material/Person";
import { Logout } from "@mui/icons-material";
import { usePathname, useRouter } from "next/navigation";
import { useAppSelector } from "@/app/store/hooks";
import ChikitsaSpinner from "@/app/components/Loader/LoaderSpinner";
import useUserVerification from "@/utils/userVerification";
import MenuIcon from "@mui/icons-material/Menu";

const drawerWidth = 240;

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const theme = useTheme();
  const router = useRouter();
  const pathname = usePathname();

  const isDesktop = useMediaQuery(theme.breakpoints.up("lg"));
  const isMobile = useMediaQuery(theme.breakpoints.down("lg"));
  const [open, setOpen] = useState(true);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const menuOpen = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [active, setActive] = useState("");

  const [openRoutes, setOpenRoutes] = useState<{ [key: string]: boolean }>({
    Products: false,
    Sales: false,
  });

  const handleToggleCollapse = (routeName: string) => {
    setOpenRoutes((prevState) => {
      // Close all routes, then toggle the clicked route
      const newOpenRoutes = Object.keys(prevState).reduce(
        (acc, key) => {
          acc[key] = key === routeName ? !prevState[key] : false; // Close all other routes
          return acc;
        },
        {} as { [key: string]: boolean }
      );

      return newOpenRoutes;
    });
  };

  const handlePasswordReset = () => {
    router.push("/");
  };

  const handleLogOut = () => {
    handleClose();
    // logoutMutation();
    router.push("/");
  };

  const routes = [
    {
      name: "Dashboard",
      icon: (
        <Icon>
          <Image src={"/Icons/home.svg"} alt="product" width={22} height={27} />
        </Icon>
      ),
    },
    {
      name: "Products",
      icon: (
        <Icon>
          <Image
            src={"/Icons/product.svg"}
            alt="product"
            width={22}
            height={27}
          />
        </Icon>
      ),
      children: [
        {
          name: "Create Product",
          icon: (
            <Icon>
              <Image
                src={"/Icons/prescriptionDigitization.svg"}
                alt="product"
                width={22}
                height={27}
              />
            </Icon>
          ),
        },
        {
          name: "All Products",
          icon: (
            <Icon>
              <Image
                src={"/Icons/aiDiagnosticsIntegration.svg"}
                alt="product"
                width={22}
                height={27}
              />
            </Icon>
          ),
        },
        {
          name: "Manage Category",
          icon: (
            <Icon>
              <Image
                src={"/Icons/healthClaimExchange.svg"}
                alt="product"
                width={22}
                height={27}
              />
            </Icon>
          ),
        },
        {
          name: "Manage Brands",
          icon: (
            <Icon>
              <Image
                src={"/Icons/aiPoweredChatbot.svg"}
                alt="product"
                width={22}
                height={27}
              />
            </Icon>
          ),
        },
        {
          name: "Manage Units",
          icon: (
            <Icon>
              <Image
                src={"/Icons/speechToText.svg"}
                alt="product"
                width={22}
                height={27}
              />
            </Icon>
          ),
        },
      ],
    },
    {
      name: "Sales",
      icon: (
        <Icon>
          <Image
            src={"/Icons/services.svg"}
            alt="product"
            width={22}
            height={27}
          />
        </Icon>
      ),
      children: [
        {
          name: "Sales By Date",
          icon: (
            <Icon>
              <Image
                src={"/Icons/customizable.svg"}
                alt="product"
                width={22}
                height={27}
              />
            </Icon>
          ),
        },
        {
          name: "Monthly Sales",
          icon: (
            <Icon>
              <Image
                src={"/Icons/accuracyBoost.svg"}
                alt="product"
                width={22}
                height={27}
              />
            </Icon>
          ),
        },
        {
          name: "Daily Sales",
          icon: (
            <Icon>
              <Image
                src={"/Icons/realTimeTransaction.svg"}
                alt="product"
                width={22}
                height={27}
              />
            </Icon>
          ),
        },
      ],
    },
    {
      name: "Manage Members",
      icon: (
        <Icon>
          <Image
            src={"/Icons/partner.svg"}
            alt="product"
            width={22}
            height={27}
          />
        </Icon>
      ),
    },
  ];

  const helpSupportRoutes = [
    {
      name: "Support",
      icon: (
        <Icon>
          <Image
            src={"/Icons/support.svg"}
            alt="product"
            width={22}
            height={27}
          />
        </Icon>
      ),
    },
    {
      name: "Setting",
      icon: (
        <Icon>
          <Image
            src={"/Icons/settings.svg"}
            alt="product"
            width={22}
            height={27}
          />
        </Icon>
      ),
    },
  ];

  console.log("Active", active);

  useEffect(() => {
    if (isDesktop) {
      // setDrawerWidth(240);
      setOpen(true);
    } else {
      // setDrawerWidth(0);
      setOpen(false);
    }
  }, [isDesktop]);

  const handleDrawerOpen = () => {
    setOpen(!open);
    // setDrawerWidth(240);
  };

  const handleDrawerClose = () => {
    setOpen(false);
    // setDrawerWidth(0);
  };

  useEffect(() => {
    console.log("Setting", pathname);
    if (pathname.startsWith("/dashboard/products/create-product")) {
      setActive("Create Product");
    } else if (pathname.startsWith("/dashboard/products/all-products")) {
      setActive("All Products");
    } else if (pathname.startsWith("/dashboard/products/manage-category")) {
      setActive("Manage Category");
    } else if (pathname.startsWith("/dashboard/products/manage-brands")) {
      setActive("Manage Brands");
    } else if (pathname.startsWith("/dashboard/products/manage-units")) {
      setActive("Manage Units");
    } else if (pathname.startsWith("/dashboard/sales/sale-by-dates")) {
      setActive("Sales By Date");
    } else if (pathname.startsWith("/dashboard/sales/sales-by-month")) {
      setActive("Monthly Sales");
    } else if (pathname.startsWith("/dashboard/sales/sales-daily")) {
      setActive("Daily Sales");
    } else {
      setActive("Dashboard");
    }
  }, [pathname]);

  // const { verificationLoading, isSuccess, isError } = useUserVerification();
  // const userVerifiedData = useAppSelector((state) => state.user);

  // if (verificationLoading) {
  //   return <ChikitsaSpinner />;
  // } else if (isError) {
  //   return (
  //     <Box
  //       sx={{
  //         width: "100%",
  //         display: "flex",
  //         gap: 4,
  //         flexDirection: "column",
  //         justifyContent: "center",
  //         alignItems: "center",
  //       }}
  //     >
  //       <Typography
  //         variant="h3"
  //         sx={{
  //           fontSize: "16px",
  //           fontWeight: 600,
  //           color: theme.palette.common.black,
  //         }}
  //       >
  //         Error fetching details, Please try again !
  //       </Typography>
  //       <Button
  //         variant="contained"
  //         onClick={() => router.push("/")}
  //         color="error"
  //         sx={{
  //           fontSize: "14px",
  //           fontWeight: 600,
  //           backgroundColor: theme.palette.error.main,
  //           color: theme.palette.common.white,
  //         }}
  //       >
  //         Go Back
  //       </Button>
  //     </Box>
  //   );
  // } else if (isSuccess && userVerifiedData) {
  //   console.log("User Data From Verification", isSuccess, userVerifiedData);
  // }

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          background: theme.palette.common.white,
          boxShadow: "0px 0px 1px  rgba(0, 0, 0, 1)",
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
              // border: "1px solid black",
            }}
          >
            {isMobile && (
              <IconButton size="small" onClick={handleDrawerOpen}>
                <MenuIcon sx={{ width: 30, height: 30 }} />
              </IconButton>
            )}
           <Image
            src="/InventoLogo.svg"
            width={90}
            height={60}
            alt="Invento Logo"
            priority={true}
          />
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Box>
              <Typography
                variant="h1"
                sx={{
                  fontSize: "16px",
                }}
              >
                Rohit Soni{" "}
                {/* {userVerifiedData?.id && userVerifiedData.name} */}
              </Typography>
            </Box>
            <IconButton onClick={handleClick}>
              <AccountCircleIcon
                sx={{
                  width: 40,
                  height: 40,
                  cursor: "pointer",
                }}
              />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              id="account-menu"
              open={menuOpen}
              onClose={handleClose}
              onClick={handleClose}
              transformOrigin={{ horizontal: "right", vertical: "top" }}
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
              <MenuItem onClick={handlePasswordReset}>
                <ListItemIcon>
                  <PasswordIcon fontSize="small" />
                </ListItemIcon>
                Reset Password
              </MenuItem>
              <Divider />
              <MenuItem
                onClick={() => {
                  router.push("/tenants/profile");
                }}
              >
                <ListItemIcon>
                  <PersonIcon fontSize="small" />
                </ListItemIcon>
                Profile
              </MenuItem>
              <Divider />

              <MenuItem onClick={handleLogOut}>
                <ListItemIcon>
                  <Logout fontSize="small" />
                </ListItemIcon>
                Logout
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer
       variant={isDesktop ? "permanent" : "temporary"}
       open={open}
       onClose={handleDrawerClose}
       sx={{
         width: open ? drawerWidth : 0,
         background: theme.palette.primary.main,
         flexShrink: 0,
         [`& .MuiDrawer-paper`]: {
           width: drawerWidth,
           boxSizing: "border-box",
           background: theme.palette.primary.main,
           color: theme.palette.common.white,
           transition: "transform 0.1s ease",
           transform: open ? "translateX(0)" : "translateX(-100%)",
         },
       }}
      >
        <Toolbar />

        <Box
          sx={{
            overflow: "auto",
            minHeight: "70vh",
          }}
        >
          <List>
            {routes?.map((route, routeIndex) => {
              if (route?.children) {
                return (
                  <div key={routeIndex}>
                    <ListItem
                      sx={{
                        padding: "2px 4px",
                      }}
                    >
                      <ListItemButton
                        onClick={() => {
                          handleToggleCollapse(route.name);
                        }}
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: "10px",
                          backgroundColor:
                            active === `${openRoutes[route.name]}`
                              ? `rgba(241, 250, 255, 0.5)`
                              : "none",
                          borderRadius: "4px",
                          "&:hover": {
                            backgroundColor:
                              active === `${openRoutes[route.name]}`
                                ? `rgba(241, 250, 255, 0.5)`
                                : "rgba(241, 250, 255, 0.1)",
                          },
                        }}
                      >
                        <ListItemIcon
                          sx={{
                            minWidth: "unset",
                          }}
                        >
                          {route.icon}
                        </ListItemIcon>
                        <ListItemText
                          primaryTypographyProps={{
                            fontWeight:
                              active === `${openRoutes[route.name]}`
                                ? "700"
                                : "500",
                            padding: "7px 0px",
                            fontSize: "14px",
                            color: theme.palette.common.white,
                          }}
                          primary={route.name}
                        />
                        {openRoutes[route.name] ? (
                          <ExpandLess />
                        ) : (
                          <ExpandMore />
                        )}
                      </ListItemButton>
                    </ListItem>
                    <Collapse
                      in={openRoutes[route.name]}
                      timeout="auto"
                      unmountOnExit
                    >
                      <List
                        component="div"
                        sx={{
                          overflow: "hidden",
                        }}
                      >
                        {route?.children.map((item, index) => {


                          return (
                            <Link
                              href={`/dashboard/${route.name.toLowerCase()}/${item.name.toLowerCase().split(" ").join("-")}`}
                              key={index}
                              onClick={() => {
                                if (!isDesktop) {
                                  setOpen(false);
                                }
                              }}
                            >
                              <ListItem
                                sx={{
                                  ml: 0.5,
                                  padding: "2px 4px",
                                }}
                              >
                                <ListItemButton
                                  onClick={() => {
                                    setActive(`${item.name}`);
                                  }}
                                  sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    gap: "10px",
                                    backgroundColor:
                                      active === `${item.name}`
                                        ? `rgba(241, 250, 255, 0.5)`
                                        : "none",
                                    borderRadius: "4px",
                                    "&:hover": {
                                      backgroundColor:
                                        active === `${item.name}`
                                          ? `rgba(241, 250, 255, 0.5)`
                                          : "rgba(241, 250, 255, 0.1)",
                                    },
                                  }}
                                >
                                  <ListItemIcon
                                    sx={{
                                      minWidth: "unset",
                                      mb: "1px",
                                    }}
                                  >
                                    {item.icon}
                                  </ListItemIcon>
                                  <ListItemText
                                    primary={item.name}
                                    disableTypography
                                    sx={{
                                      fontWeight:
                                        active === `${item.name}`
                                          ? "600"
                                          : "400",
                                      lineBreak: "30px",
                                      //   padding: "7px 0px",
                                      fontSize: "14px",
                                      color: theme.palette.common.white,
                                    }}
                                  />
                                </ListItemButton>
                              </ListItem>
                            </Link>
                          );
                        })}
                      </List>
                    </Collapse>
                  </div>
                );
              } else {
                return (
                  <Link
                    href={
                      route.name === "Dashboard"
                        ? "/dashboard"
                        : `/dashboard/${route.name.toLowerCase().split(" ").join("-")}`
                    }
                    key={routeIndex}
                    onClick={() => {
                      if (!isDesktop) {
                        setOpen(false);
                      }
                    }}
                  >
                    <ListItem
                      sx={{
                        padding: "2px 4px",
                      }}
                    >
                      <ListItemButton
                        onClick={() => {
                          setActive(route.name);
                        }}
                        sx={{
                          color: theme.palette.common.white,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: "10px",
                          backgroundColor:
                            active === route.name
                              ? `rgba(241, 250, 255, 0.5)`
                              : "none",
                          borderRadius: "4px",
                          "&:hover": {
                            backgroundColor:
                              active === route.name
                                ? `rgba(241, 250, 255, 0.5)`
                                : "rgba(241, 250, 255, 0.1)",
                          },
                        }}
                      >
                        <ListItemIcon
                          sx={{
                            minWidth: "unset",
                          }}
                        >
                          {route.icon}
                        </ListItemIcon>

                        <ListItemText
                          primary={
                            route.name === "Dashboard" ? "Home" : route.name
                          }
                          disableTypography
                          sx={{
                            fontWeight: active === route.name ? "600" : "400",
                            lineBreak: "30px",
                            fontSize: "16px",
                            // letterSpacing: "2px",
                          }}
                        />
                      </ListItemButton>
                    </ListItem>
                  </Link>
                );
              }
            })}
          </List>
        </Box>
        <Box>
          <List>
            {helpSupportRoutes?.map((route, routeIndex) => {
              return (
                <Link
                  href={`/dashboard/${route.name.toLowerCase().split(" ").join("-")}`}
                  key={routeIndex}
                  onClick={() => {
                    if (!isDesktop) {
                      setOpen(false);
                    }
                  }}
                >
                  <ListItem
                    sx={{
                      padding: "2px 4px",
                    }}
                  >
                    <ListItemButton
                      onClick={() => {
                        setActive(route.name);
                      }}
                      sx={{
                        color: theme.palette.common.white,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "10px",
                        backgroundColor:
                          active === route.name
                            ? `rgba(241, 250, 255, 0.5)`
                            : "none",
                        borderRadius: "4px",
                        "&:hover": {
                          backgroundColor:
                            active === route.name
                              ? `rgba(241, 250, 255, 0.5)`
                              : "rgba(241, 250, 255, 0.1)",
                        },
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          minWidth: "unset",
                        }}
                      >
                        {route.icon}
                      </ListItemIcon>

                      <ListItemText
                        primary={
                          route.name === "Dashboard" ? "Home" : route.name
                        }
                        disableTypography
                        sx={{
                          fontWeight: active === route.name ? "600" : "400",
                          lineBreak: "30px",
                          fontSize: "16px",
                        }}
                      />
                    </ListItemButton>
                  </ListItem>
                </Link>
              );
            })}
          </List>
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
}
