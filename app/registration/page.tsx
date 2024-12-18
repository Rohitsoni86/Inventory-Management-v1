"use client";
import {
  Box,
  Button,
  Container,
  Grid2,
  Step,
  Stepper,
  styled,
  Typography,
  useTheme,
} from "@mui/material";
import StepConnector, {
  stepConnectorClasses,
} from "@mui/material/StepConnector";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { useAppContext } from "@/app/providers/app-context";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import AdminDetailsForm from "./components/AdminDetailsForm";
import OrganizationDetailsForm from "./components/OrganizationDetailsForm";
import OrganizationAddressForm from "./components/OrganizationAddressForm";
import SignUpFields from "@/models/userSignUpModel";
import { SignUpSchema } from "@/schema/userSignupSchema";
import { AxiosError, AxiosResponse } from "axios";
import ErrorData from "@/models/apiError";
import { useSignUp } from "@/api/auth-api";
import ChikitsaSpinner from "../components/Loader/LoaderSpinner";

const QontoConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    left: "calc(-100% + 11px)",
    right: "calc(100% + 16px)",
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: theme.palette.secondary.main,
      transition: "border-color 0.5s ease, border-width 0.5s ease", // Smooth transition
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: theme.palette.secondary.main,
      transition: "border-color 0.5s ease, border-width 0.5s ease", // Smooth transition
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    borderColor: "#eaeaf0",
    borderTopWidth: 10,
    borderRadius: 4,
    transition: "border-color 0.5s ease, border-width 0.5s ease", // Smooth transition
    ...theme.applyStyles("dark", {
      borderColor: theme.palette.grey[800],
    }),
  },
}));

export default function Registration() {
  const theme = useTheme();
  const router = useRouter();
  const steps = ["1", "2", "3", "4"];
  const [activeStep, setActiveStep] = useState(0);

  const initialValues: SignUpFields = {
    legalName: "",
    registrationNumber: "",
    email: "",
    countryCode: "+91",
    phone: "",
    address: "",
    city: "",
    state: "",
    country: "",
    postalCode: "",
    companySize: "",
    flagCode: "IN",
    // Admin user details
    adminFirstName: "",
    adminLastName: "",
    adminEmail: "",
    adminCountryCode: "+91",
    adminPhone: "",
    adminPassword: "",
    adminFlagCode: "IN",
  };

  const {
    values,
    handleChange,
    handleBlur,
    handleSubmit,
    errors,
    touched,
    setValues,
    setFieldValue,
  } = useFormik<SignUpFields>({
    initialValues,
    validationSchema: SignUpSchema,
    onSubmit: async (values) => {
      console.log("Submit Called", values);
      makeUserSignup({ ...values });
    },
  });

  const onSignUpSuccess = (data: AxiosResponse) => {
    console.log("Login Success Data", data.data.user);
    setOpenToastSuccess(true);
    setMessage("Login Successful");
    router.push("/");
  };

  const onSignUpError = (error: AxiosError<ErrorData>) => {
    setOpenToastError(true);
    setMessage(error?.response?.data?.message || error.message);
    console.error("Login Error Data", error);
  };

  const { mutateAsync: makeUserSignup, isPending: signUpLoading } = useSignUp(
    onSignUpSuccess,
    onSignUpError
  );

  console.log("Values", values);
  console.log("Errors", touched, errors);

  const { setMessage, setOpenToastError, setOpenToastSuccess } =
    useAppContext();

  const validateRequiredStep1Fields = (): boolean => {
    const {
      adminFirstName,
      adminLastName,
      adminEmail,
      adminPhone,
      adminPassword,
    } = values;
    return (
      !!adminFirstName &&
      !!adminLastName &&
      !!adminEmail &&
      !!adminPhone &&
      !!adminPassword
    );
  };

  const checkForStep1Errors = (): boolean => {
    const {
      adminFirstName,
      adminLastName,
      adminEmail,
      adminPhone,
      adminPassword,
    } = errors;
    return !(
      (touched.adminFirstName && adminFirstName) ||
      (touched.adminLastName && adminLastName) ||
      (touched.adminEmail && adminEmail) ||
      (touched.adminPhone && adminPhone) ||
      (touched.adminPassword && adminPassword)
    );
  };

  const validateRequiredStep2Fields = (): boolean => {
    const { legalName, registrationNumber, email, phone, companySize } = values;
    return (
      !!legalName && !!registrationNumber && !!email && !!phone && !!companySize
    );
  };

  const checkForStep2Errors = (): boolean => {
    const { legalName, registrationNumber, email, phone, companySize } = errors;
    return !(
      (touched.legalName && legalName) ||
      (touched.registrationNumber && registrationNumber) ||
      (touched.email && email) ||
      (touched.phone && phone) ||
      (touched.companySize && companySize)
    );
  };

  // const validateRequiredStep3Fields = (): boolean => {
  //   const { postalCode, country, state, city, address } = values;
  //   return !!postalCode && !!country && !!state && !!city && !!address;
  // };

  // const checkForStep3Errors = (): boolean => {
  //   const { postalCode, country, state, city, address } = errors;
  //   return !(
  //     (touched.postalCode && postalCode) ||
  //     (touched.country && country) ||
  //     (touched.state && state) ||
  //     (touched.city && city) ||
  //     (touched.address && address)
  //   );
  // };

  if (signUpLoading) {
    return <ChikitsaSpinner />;
  }
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
            // border: "1px solid black",
          }}
        >
          <Grid2
            size={{
              xs: 6,
            }}
            sx={{
              // border: "1px solid black",
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
                  Welcome to Invento!
                </Typography>
                <Typography
                  variant="h1"
                  sx={{
                    color: theme.palette.primary.main,
                    fontSize: "32px",
                    lineHeight: "42px",
                    fontWeight: 700,
                  }}
                >
                  Join us for seamless inventory management.
                </Typography>
              </Box>
              <Box>
                <Image
                  width={350}
                  height={350}
                  src="/Images/SignupBanner.svg"
                  alt="Invento"
                  // priority={true}
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
                  Discover scalable solutions, real-time insights, and
                  effortless integration to drive your business growth. Start
                  now and elevate your digital journey!
                </Typography>
              </Box>
            </Box>
          </Grid2>
          <Grid2
            size={{
              xs: 4,
            }}
            sx={
              {
                // border: "1px solid black",
              }
            }
          >
            <Box
              sx={{
                paddingX: 2,
              }}
            >
              <Typography
                variant="h2"
                color="primary"
                sx={{
                  fontSize: "28px",
                  lineHeight: "43px",
                  fontWeight: 700,
                }}
              >
                {activeStep === 0 && "Admin Details !"}
                {activeStep === 1 && "Organization Details !"}
                {activeStep === 2 && "Organization Address !"}
              </Typography>
            </Box>
            <Box
              sx={{
                textAlign: "left",
              }}
            >
              <Stepper
                alternativeLabel
                activeStep={activeStep}
                connector={<QontoConnector />}
              >
                {steps.map((label) => (
                  <Step key={label}></Step>
                ))}
              </Stepper>
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
                sx={{
                  // border: "2px solid red",
                  display: "flex",
                  width: "100%",
                  flexDirection: "column",
                  gap: 2,
                  px: 2,
                  // height: "100%",
                }}
                onSubmit={handleSubmit}
              >
                {activeStep === 0 && (
                  <AdminDetailsForm
                    values={values}
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                    errors={errors}
                    touched={touched}
                    setFieldValue={setFieldValue}
                  />
                )}
                {activeStep === 1 && (
                  <OrganizationDetailsForm
                    values={values}
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                    errors={errors}
                    touched={touched}
                    setFieldValue={setFieldValue}
                  />
                )}
                {activeStep === 2 && (
                  <OrganizationAddressForm
                    values={values}
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                    errors={errors}
                    touched={touched}
                    setValues={setValues}
                  />
                )}

                <Box
                  sx={{
                    display: "flex",
                    // flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: 1,
                  }}
                >
                  {activeStep !== 0 && (
                    <Button
                      variant="outlined"
                      sx={{
                        px: 11,
                        display: "flex",
                        justifyContent: "center",
                        width: "100%",
                      }}
                      size="medium"
                      onClick={() => {
                        setActiveStep(activeStep - 1);
                      }}
                    >
                      Back
                    </Button>
                  )}

                  {activeStep === 2 ? (
                    <Button
                      type="submit"
                      variant="contained"
                      sx={{
                        px: 11,
                        display: "flex",
                        justifyContent: "center",
                        width: "100%",
                      }}
                      size="medium"
                    >
                      SignUp
                    </Button>
                  ) : (
                    <Button
                      type="button"
                      variant="contained"
                      sx={{
                        px: 11,
                        display: "flex",
                        justifyContent: "center",
                        width: "100%",
                      }}
                      size="medium"
                      onClick={() => {
                        if (activeStep === 0) {
                          const requiredFieldsFilled =
                            validateRequiredStep1Fields();
                          const noErrors = checkForStep1Errors();
                          if (requiredFieldsFilled && noErrors) {
                            setActiveStep((prevStep) => prevStep + 1);
                          } else {
                            setOpenToastError(true);
                            setMessage(
                              "Opps! Please fill all required details before proceeding."
                            );
                          }
                        } else if (activeStep === 1) {
                          const requiredFieldsFilled =
                            validateRequiredStep2Fields();
                          const noErrors = checkForStep2Errors();
                          if (requiredFieldsFilled && noErrors) {
                            setActiveStep((prevStep) => prevStep + 1);
                          } else {
                            setOpenToastError(true);
                            setMessage(
                              "Opps! Please fill all required details before proceeding."
                            );
                          }
                        } else if (activeStep === 2) {
                          // const requiredFieldsFilled =
                          //   validateRequiredStep3Fields();
                          // const noErrors = checkForStep3Errors();
                          // if (requiredFieldsFilled && noErrors) {
                          //   handleSubmit();
                          // } else {
                          //   setOpenToastError(true);
                          //   setMessage(
                          //     "Opps! Please fill all required details before proceeding."
                          //   );
                          // }
                        }
                      }}
                    >
                      Next
                    </Button>
                  )}
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
                  Already have an account ?{" "}
                  <Link href={"/"}>
                    <Typography
                      sx={{
                        display: "inline",
                        color: theme.palette.secondary.main,
                      }}
                    >
                      Login
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
