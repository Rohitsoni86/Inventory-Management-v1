"use client";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Grid2,
  IconButton,
  InputAdornment,
  InputLabel,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { useAppContext } from "./providers/app-context";
import { useState } from "react";
import Image from "next/image";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Link from "next/link";
import LoginFields from "@/models/userModel";
import { loginSchema } from "@/schema/userLoginSchema";
import { useLogin } from "@/api/auth-api";
import { AxiosError, AxiosResponse } from "axios";
import ErrorData from "@/models/apiError";
import {
  clearAllCookies,
  storeTokensInCookies,
} from "@/utils/storeOrRefreshTokens";
import {
  clearUser,
  setUser,
} from "./store/features/userDetails/userDetailsSlice";
import { useAppDispatch } from "./store/hooks";

export default function Home() {
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const router = useRouter();
  dispatch(clearUser());

  const { setMessage, setOpenToastError, setOpenToastSuccess } =
    useAppContext();
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const initialValues: LoginFields = {
    email: "",
    password: "",
  };

  const { values, handleChange, handleBlur, handleSubmit, errors, touched } =
    useFormik<LoginFields>({
      initialValues,
      validationSchema: loginSchema,
      onSubmit: async (values) => {
        console.log("Submit Called", values);
        // mutateAsync(values);
      },
    });

  // const onLoginSuccess = (data: AxiosResponse) => {
  //   console.log("Login Success Data", data?.data?.user);
  //   console.log("Login Success Data", data?.data?.organization);
  //   console.log("Login Success Data", data?.data?.tokens);

  //   const { id, email, firstName, lastName, role, organizationId } =
  //     data.data.user;
  //   setOpenToastSuccess(true);
  //   setMessage("Login Successful");
  //   dispatch(
  //     setUser({
  //       id,
  //       email,
  //       name: `${firstName} ${lastName}`,
  //       role,
  //       organizationId,
  //       legalName: data?.data?.organization?.legalName,
  //       isLoggedIn: true,
  //     })
  //   );
  //   storeTokensInCookies(
  //     data?.data?.tokens.accessToken,
  //     data?.data?.tokens.refreshToken
  //   );
  //   router.push("/dashboard");
  // };

  // const onLoginError = (error: AxiosError<ErrorData>) => {
  //   setOpenToastError(true);
  //   setMessage(error?.response?.data?.message || error.message);
  //   console.error("Login Error Data", error);
  //   dispatch(clearUser());
  //   clearAllCookies();
  // };

  // const { mutateAsync, isPending: loginLoading } = useLogin(
  //   onLoginSuccess,
  //   onLoginError
  // );


  return (
    <Container maxWidth="xl">
      <Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
          }}
        >
          <Image
            src="/InventoLogo.svg"
            width={90}
            height={90}
            alt="Invento Logo"
            priority={true}
          />
        </Box>
        <Grid2
          container
          spacing={2}
          alignContent="center"
          alignItems="center"
          justifyContent="space-evenly"
          sx={{
            width: "100%",
            minHeight: "70vh",
          }}
        >
          <Grid2
            size={{
              xs: 6,
            }}
            sx={{
              px: 8,
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <Box
                sx={{
                  textAlign: "center",
                }}
              >
                <Typography
                  variant="h1"
                  sx={{
                    color: theme.palette.primary.main,
                    fontSize: "32px",
                    lineHeight: "42px",
                    fontWeight: 700,
                  }}
                >
                  Welcome back to Invento !
                </Typography>
              </Box>
              <Box>
                <Image
                  width={350}
                  height={350}
                  src="/Images/LoginBanner.svg"
                  alt="Invento"
                  priority={true}
                />
              </Box>
              <Box>
                <Typography
                  variant="h2"
                  color="primary"
                  sx={{
                    fontSize: "18px",
                    lineHeight: "25px",
                    alignSelf: "center",
                    fontWeight: "400",
                    textJustify: "auto",
                    textAlign: "center",
                  }}
                >
                  Log in to manage your Inventory, explore real-time insights, and
                  unlock scalable solutions. Continue driving growth and
                  elevating your digital journey!
                </Typography>
              </Box>
            </Box>
          </Grid2>
          <Grid2
            size={{
              xs: 4,
            }}
          >
            <Box
              sx={{
                paddingX: 2,
                mt: 1,
              }}
            >
              <Typography
                variant="h2"
                color="primary"
                sx={{
                  fontSize: "32px",
                  lineHeight: "43px",
                  fontWeight: 700,
                }}
              >
                Login
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
                alignItems: "center",
                height: "100%",
                mt: 4,
                gap: 2,
              }}
            >
              <Box
                component="form"
                noValidate
                sx={{
                  display: "flex",
                  width: "100%",
                  flexDirection: "column",
                  gap: 2,
                  px: 2,
                }}
                onSubmit={handleSubmit}
              >
                <Box>
                  <InputLabel required>Email</InputLabel>
                  <TextField
                    size="small"
                    autoFocus
                    required
                    fullWidth
                    error={touched?.email && Boolean(errors?.email)}
                    type="email"
                    autoComplete="email"
                    name="email"
                    id="email"
                    placeholder="Enter your email"
                    value={values.email}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    helperText={
                      errors?.email &&
                      touched?.email && (
                        <Typography
                          component="span"
                          variant="body2"
                          color="error"
                        >
                          {errors?.email}
                        </Typography>
                      )
                    }
                  />
                </Box>
                <Box>
                  <InputLabel required>Password</InputLabel>
                  <TextField
                    size="small"
                    fullWidth
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter password"
                    autoComplete="current-password"
                    name="password"
                    id="password"
                    error={touched?.password && Boolean(errors?.password)}
                    value={values.password}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    helperText={
                      errors?.password &&
                      touched?.password && (
                        <Typography
                          component="span"
                          variant="body2"
                          color="error"
                        >
                          {errors?.password}
                        </Typography>
                      )
                    }
                    slotProps={{
                      input: {
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              onClick={togglePasswordVisibility}
                              edge="end"
                              tabIndex={-1}
                            >
                              {showPassword ? (
                                <VisibilityIcon />
                              ) : (
                                <Image
                                  src="/Icons/EyeCloseIconSvg.svg"
                                  alt="Chikitsa Password Eye close Icon"
                                  width={24}
                                  height={24}
                                />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      },
                    }}
                  />
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    alignItems: "center",
                  }}
                >
                  <Typography
                    // onClick={() => setOpenForgotPasswordModal(true)}
                    sx={{
                      fontSize: "12px",
                      fontWeight: "600",
                      textTransform: "capitalize",
                      textAlign: "right",
                      cursor: "pointer",
                    }}
                  >
                    Forgot Password ?
                  </Typography>
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Button
                    type="submit"
                    variant="contained"
                    sx={{
                      mt: 2,
                      px: 11,
                      display: "flex",
                      justifyContent: "center",
                      width: "100%",
                    }}
                    size="large"
                  >
                    Login
                    {/* {loginLoading ? (
                      <CircularProgress
                        size="26px"
                        thickness={4}
                        sx={{
                          color: theme.palette.common.white,
                        }}
                      />
                    ) : (
                      "Login"
                    )} */}
                  </Button>
                </Box>
              </Box>
              <Box>
                <Typography
                  variant="h3"
                  color="primary"
                  sx={{
                    fontSize: "16px",
                    lineHeight: "43px",
                    fontWeight: 500,
                    color: theme.palette.grey[700],
                  }}
                >
                  don&apos;t have an account ?{" "}
                  <Link href={"/registration"}>
                    {" "}
                    <Typography
                      sx={{
                        display: "inline",
                        color: theme.palette.secondary.main,
                      }}
                    >
                      Sing Up
                    </Typography>
                  </Link>
                </Typography>
              </Box>
            </Box>
          </Grid2>
        </Grid2>
      </Box>
    </Container>
  );
}


// import React from 'react';
// import { Autocomplete, TextField } from '@mui/material';

// const categories = [
//   'Engine Parts',
//   'Transmission Parts',
//   'Suspension and Steering Parts',
//   'Braking System Parts',
//   'Electrical System Parts',
//   'Fuel and Exhaust System Parts',
//   'Cooling System Parts',
//   'Body and Exterior Parts',
//   'Interior Parts',
//   'Lighting and Electrical Components',
//   'Climate Control Parts',
//   'Tires and Wheels',
//   'Performance and Tuning Parts',
//   'Miscellaneous Parts',
//   'OEM and Aftermarket Parts',
//   'Car Care and Maintenance Products',
//   'Diagnostic and Testing Tools',
//   'Safety Equipment',
// ];

// const SparePartsAutocomplete = () => {
//   return (
//     <div style={{ width: 300 }}>
//       <Autocomplete
//         disablePortal
//         id="categories-autocomplete"
//         options={categories}
//         renderInput={(params) => <TextField {...params} label="Select Category" />}
//         fullWidth
//       />
//     </div>
//   );
// };

// export default SparePartsAutocomplete;