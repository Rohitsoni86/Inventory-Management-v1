"use client";
import {
  Box,
  Button,
  Grid2,
  IconButton,
  Typography,
  useTheme,
} from "@mui/material";
import React from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import WestIcon from "@mui/icons-material/West";
import { useRouter } from "next/navigation";
import LockResetIcon from "@mui/icons-material/LockReset";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import SignUpFields from "@/models/userSignUpModel";
import { useFormik } from "formik";
import { SignUpSchema } from "@/schema/userSignupSchema";
import { useAppContext } from "@/app/providers/app-context";
import AdminDetailsForm from "./components/ProfileDetails";
import OrganizationDetails from "./components/OrganizationDetails";
import OrganizationAddressSettings from "./components/OrganizationAddress";

const SettingsPage = () => {
  const theme = useTheme();
  const router = useRouter();

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
      // makeUserSignup({ ...values });
    },
  });

  const { setMessage, setOpenToastError, setOpenToastSuccess } =
    useAppContext();

    const featureUnavailable = () => {
      setOpenToastError(true)
      setMessage("This feature is not available right now !")
    }

  return (
    <Grid2 container spacing={2}>
      <Grid2
        size={{
          xs: 12,
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <Button
            sx={{
              fontSize: "16px",
              fontWeight: 900,
            }}
            startIcon={
              <WestIcon
                sx={{
                  fontSize: "25px",
                }}
              />
            }
            onClick={() => router.push("/dashboard/products/speech-to-text")}
          >
            <Typography
              sx={{
                fontSize: "14px",
                fontWeight: 600,
              }}
            >
              Back
            </Typography>
          </Button>
        </Box>
      </Grid2>
      <Grid2
        size={{
          xs: 12,
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            px: 2,
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
              flexDirection: "row",
            }}
          >
            <Box>
              <AccountCircleIcon
                sx={{
                  width: 100,
                  height: 100,
                  cursor: "pointer",
                }}
              />
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-start",
                flexDirection: "column",
              }}
            >
              <Box>
                <Typography
                  sx={{
                    fontSize: "16px",
                    fontWeight: 700,
                  }}
                >
                  Rohit Soni
                </Typography>
              </Box>
              <Box>
                <Typography
                  sx={{
                    fontSize: "16px",
                    fontWeight: 700,
                  }}
                >
                  rohitsonimax@gmail.com
                </Typography>
              </Box>
              <Box>
                <Typography
                  sx={{
                    fontSize: "16px",
                    fontWeight: 700,
                  }}
                >
                  7742736286
                </Typography>
              </Box>
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
            <Button
              type="button"
              variant="contained"
              fullWidth
              size="medium"
              startIcon={<LockResetIcon />}
              onClick={featureUnavailable}
            >
              Reset Password
            </Button>
            <Button
              type="button"
              variant="outlined"
              fullWidth
              size="medium"
              startIcon={<ManageAccountsIcon />}
              onClick={featureUnavailable}
            >
              Change Profile Picture
            </Button>
          </Box>
        </Box>
      </Grid2>
      <Grid2
        size={{
          xs: 12,
        }}
      >
        <AdminDetailsForm
          values={values}
          handleChange={handleChange}
          handleBlur={handleBlur}
          errors={errors}
          touched={touched}
          setFieldValue={setFieldValue}
        />
      </Grid2>
      <Grid2
        size={{
          xs: 12,
        }}
      >
        <OrganizationDetails
          values={values}
          handleChange={handleChange}
          handleBlur={handleBlur}
          errors={errors}
          touched={touched}
          setFieldValue={setFieldValue}
          
        />
      </Grid2>
      <Grid2
        size={{
          xs: 12,
        }}
      >
        <OrganizationAddressSettings
          values={values}
          handleChange={handleChange}
          handleBlur={handleBlur}
          errors={errors}
          touched={touched}
          setFieldValue={setFieldValue}
          setValues={setValues}
        />
      </Grid2>
      <Grid2
          size={{
            xs: 12,
            md: 12,
          }}
          sx={{
            display:"flex",
            justifyContent:"flex-end"
          }}
        >
          <Button
            type="button"
            variant="contained"
            sx={{
              width:{
                xs:"100%",
                md:"30%"
              }
            }}
            size="medium"
            
          >
           Save 
          </Button>
        </Grid2>
    </Grid2>
  );
};

export default SettingsPage;
