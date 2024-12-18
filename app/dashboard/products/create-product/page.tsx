"use client";

import { useAppContext } from "@/app/providers/app-context";
import { ProductFormValues } from "@/models/product";
import ProductListingSchema from "@/schema/productListingSchema";
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  Grid2,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  styled,
  TextareaAutosize,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { useFormik } from "formik";
import Image from "next/image";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import imageCompression from 'browser-image-compression';

const CreateProductPage = () => {
  const theme = useTheme();
  const router = useRouter();
  const Params = useSearchParams();

  const [base64Image, setBase64Image] = useState(null);
  const [imageURL, setImageURL] = useState(null);
  const [imageUploadingError, setImageUploadingError] = useState("");

  console.log("ProductId", Params.get("productId"));

  const { setMessage, setOpenToastError, setOpenToastSuccess } =
    useAppContext();

  const initialValues = {
    productName: "", // Name of the product
    productCategory: "", // Product category
    productBrand: "", // Product brand
    productCode: "", // Product code
    productDescription: "", // Product description
    productType: "", // Product type (e.g., Standard, Variable, etc.)
    productCost: "", // Product cost
    productPrice: "", // Product selling price
    productUnit: "", // Unit type for product (e.g., Kilogram, Meter)
    productSaleUnit: "", // Unit type for sale
    productPurchaseUnit: "", // Unit type for purchase
    productQuantity: "", // Quantity of the product (e.g., 100/200)
    selectedImage: null, // Image selected for the product
    imageUrl: "", // URL for the selected image
    hospitalLogo: null, // Additional field for logo (if required)
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
    resetForm,
  } = useFormik<ProductFormValues>({
    initialValues,
    validationSchema: ProductListingSchema,
    onSubmit: async (values) => {
      console.log("Submit Called", values);
      // makeUserSignup({ ...values });
    },
  });

  // const onSignUpSuccess = (data: AxiosResponse) => {
  //   console.log("Login Success Data", data.data.user);
  //   setOpenToastSuccess(true);
  //   setMessage("Login Successful");
  //   router.push("/");
  // };

  // const onSignUpError = (error: AxiosError<ErrorData>) => {
  //   setOpenToastError(true);
  //   setMessage(error?.response?.data?.message || error.message);
  //   console.error("Login Error Data", error);
  // };

  // const { mutateAsync: makeUserSignup, isPending: signUpLoading } = useSignUp(
  //   onSignUpSuccess,
  //   onSignUpError
  // );

  console.log("Values", values);
  console.log("Errors", touched, errors);

  // if (signUpLoading) {
  //   return <ChikitsaSpinner />;
  // }

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.size > 1024 * 1024) {
        console.log("Please select an image smaller than 1MB.");
        setBase64Image(null);
        setFieldValue("hospitalLogo", "");
        setImageUploadingError("Please select an image smaller than 1MB.");

        return;
      }

      if (
        !file.type.startsWith("image/jpeg") &&
        !file.type.startsWith("image/png")
      ) {
        console.log("Please select a JPEG or PNG image.");
        setBase64Image(null);
        setFieldValue("hospitalLogo", "");
        setImageUploadingError("Please select a JPEG or PNG image.");

        return;
      }
      setFieldValue("imageUrl", null);
      setFieldValue("selectedImage", file);

      try {
        setImageUploadingError("Uploading......");
        const compressedFile = await imageCompression(file, {
          maxSizeMB: 0.5,
          maxWidthOrHeight: 1920,
          useWebWorker: true,
        });
        const newFile = new File([compressedFile], file?.name, {
          type: compressedFile.type,
          lastModified: Date.now(),
        });

        console.log("Converted File From Compressed File", newFile);
        const reader = new FileReader();
        reader.onload = () => {
          const base64String = reader.result.split(",")[1];
          console.log("Compressed Base 64 image", base64String);
          setBase64Image(base64String);
        };
        reader.readAsDataURL(newFile);
        setImageUploadingError("");
      } catch (error) {
        console.error("Error compressing image:", error);
        setImageUploadingError("Error uploading image try again");
      }
    }
  };

  useEffect(() => {
    if (base64Image) {
      setFieldValue("base64Image", base64Image);
    }
  }, [base64Image]);

  return (
    <Grid2 container spacing={2}>
      <Grid2
        size={{
          xs: 12,
          lg: 12,
        }}
        sx={{
          boxShadow: "0px 0px 1px 2px rgba(0, 0, 0, 0.2)",
          p: 2,
          borderRadius: "12px",
        }}
      >
        <Grid2 container spacing={2}>
          <Grid2
            size={{
              xs: 12,
              md: 6,
            }}
            sx={{
              display: "flex",
              flexDirection: "column",
              flexWrap: "wrap",
              gap: 2,
            }}
          >
            <Box>
              <InputLabel required focused={true}>
                Name
              </InputLabel>
              <TextField
                variant="outlined"
                size="small"
                autoFocus={true}
                autoComplete="off"
                type="text"
                fullWidth
                placeholder="Name of product"
                name="productName"
                error={touched?.productName && Boolean(errors?.productName)}
                value={values?.productName}
                onChange={handleChange}
                onBlur={handleBlur}
                helperText={
                  errors.productName &&
                  touched?.productName &&
                  `${errors.productName}`
                }
                id="productName"
              />
            </Box>
            <Box>
              <InputLabel required>Category</InputLabel>
              <TextField
                variant="outlined"
                size="small"
                autoComplete="off"
                type="text"
                fullWidth
                name="productCategory"
                error={
                  touched?.productCategory && Boolean(errors?.productCategory)
                }
                value={values?.productCategory}
                onChange={handleChange}
                onBlur={handleBlur}
                helperText={
                  errors.productCategory &&
                  touched?.productCategory &&
                  `${errors.productCategory}`
                }
                id="productCategory"
              />
            </Box>
            <Box>
              <InputLabel required>Brand</InputLabel>
              <TextField
                variant="outlined"
                size="small"
                autoComplete="off"
                type="text"
                fullWidth
                name="productBrand"
                error={touched?.productBrand && Boolean(errors?.productBrand)}
                value={values?.productBrand}
                onChange={handleChange}
                onBlur={handleBlur}
                helperText={
                  errors.productBrand &&
                  touched?.productBrand &&
                  `${errors.productBrand}`
                }
                id="productBrand"
              />
            </Box>
            <Box>
              <InputLabel required>Product Code</InputLabel>
              <TextField
                variant="outlined"
                size="small"
                autoComplete="off"
                type="text"
                fullWidth
                placeholder="Code of Product"
                name="productCode"
                error={touched?.productCode && Boolean(errors?.productCode)}
                value={values?.productCode}
                onChange={handleChange}
                onBlur={handleBlur}
                helperText={
                  errors.productCode &&
                  touched?.productCode &&
                  `${errors.productCode}`
                }
                id="productName"
              />
            </Box>
            <Box>
              <InputLabel required>Product Description</InputLabel>
              <TextField
                // minRows={4}
                autoComplete="off"
                fullWidth
                size="small"
                placeholder="Description of Product"
                name="productDescription"
                error={
                  touched?.productDescription &&
                  Boolean(errors?.productDescription)
                }
                value={values?.productDescription}
                onChange={handleChange}
                onBlur={handleBlur}
                helperText={
                  errors.productDescription &&
                  touched?.productDescription &&
                  `${errors.productDescription}`
                }
                id="productName"
              />
            </Box>
          </Grid2>
          <Grid2
            size={{
              xs: 12,
              md: 6,
            }}
          >
            <Box>
              <InputLabel required>Product Image</InputLabel>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-evenly",
                  alignItems: "center",
                  flexWrap: "wrap",
                  borderRadius: "10px",
                  padding: "10px",
                  border: "2px solid #E9E9E9",
                }}
              >
                <Box flexGrow={1}>
                  <Box
                    sx={{
                      border: `2px solid ${imageUploadingError ? "red" : "#D6D6D6"}`,
                      borderRadius: "10px",
                      borderStyle: "dashed",
                      width: "70%",
                      height: "200px",
                      margin: "auto",
                      display: "flex",
                      padding: "12px",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                      textAlign: "center",
                      marginTop: "40px",
                      marginBottom: "40px",
                      position: "relative",
                    }}
                  >
                    <input
                      id="contained-button-file"
                      type="file"
                      name="hospitalLogo"
                      onChange={(event) => {
                        handleFileChange(event);
                        setFieldValue(
                          "hospitalLogo",
                          event?.currentTarget?.files[0]
                        );
                      }}
                      style={{
                        position: "absolute",
                        width: "100%",
                        height: "100%",
                        top: 0,
                        left: 0,
                        opacity: 0,
                        cursor: "pointer",
                        zIndex: 10,
                      }}
                    />
                    {errors?.hospitalLogo && touched?.hospitalLogo ? (
                      <Typography component="p" variant="body2" color="error">
                        {errors?.hospitalLogo}
                      </Typography>
                    ) : null}
                    <label htmlFor="contained-button-file">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="69"
                        height="60"
                        viewBox="0 0 69 60"
                        fill="none"
                      >
                        <path
                          d="M36.028 14.7459L36.1203 14.7734L36.1243 14.7688C36.5619 14.8481 36.9961 14.5861 37.1247 14.152C38.2963 10.2153 41.9874 7.46512 46.0998 7.46512C46.5867 7.46512 46.9816 7.07024 46.9816 6.58338C46.9816 6.0965 46.5867 5.70164 46.0998 5.70164C41.0457 5.70164 36.7985 9.06673 35.4348 13.6494C35.2956 14.1162 35.5615 14.6068 36.028 14.7459Z"
                          fill="#053c61"
                          stroke="#F9FFF9"
                          strokeWidth="0.3"
                        />
                        <path
                          d="M56.3438 42.4384H51.9534C51.5494 42.4384 51.2217 42.1107 51.2217 41.7067C51.2217 41.3027 51.5494 40.9749 51.9534 40.9749H56.3438C62.3956 40.9749 67.3197 36.0509 67.3197 29.999C67.3197 23.9471 62.3956 19.023 56.3438 19.023H56.2382C56.026 19.023 55.8242 18.9311 55.6852 18.7706C55.5462 18.6101 55.4834 18.3974 55.5138 18.1873C55.5791 17.7315 55.612 17.2737 55.612 16.8279C55.612 11.5829 51.3444 7.31531 46.0995 7.31531C44.059 7.31531 42.1131 7.95296 40.4719 9.15978C40.1112 9.42478 39.599 9.30718 39.3905 8.91047C34.7425 0.0596993 22.6023 -1.12887 16.3082 6.57053C13.6568 9.81417 12.615 14.0336 13.4498 18.146C13.5418 18.6002 13.1942 19.0236 12.7327 19.0236H12.4395C6.3876 19.0236 1.46353 23.9477 1.46353 29.9996C1.46353 36.0514 6.3876 40.9755 12.4395 40.9755H16.8298C17.2338 40.9755 17.5615 41.3032 17.5615 41.7072C17.5615 42.1113 17.2338 42.439 16.8298 42.439H12.4395C5.5805 42.439 0 36.8585 0 29.9995C0 23.3329 5.27155 17.8742 11.8651 17.5731C11.2457 13.3066 12.4301 9.00295 15.1751 5.64437C21.9138 -2.5996 34.828 -1.67556 40.2871 7.51707C42.0287 6.42522 44.0215 5.85244 46.0992 5.85244C52.4538 5.85244 57.4892 11.261 57.0486 17.58C63.5813 17.9463 68.7829 23.3763 68.7829 29.999C68.7829 36.8585 63.2024 42.4384 56.3434 42.4384L56.3438 42.4384Z"
                          fill="#053c61"
                        />
                        <path
                          d="M15.85 41.2935C15.85 51.4634 24.1237 59.737 34.2935 59.737C44.4634 59.737 52.737 51.4633 52.737 41.2935C52.737 31.1235 44.4634 22.85 34.2935 22.85C24.1235 22.85 15.85 31.1237 15.85 41.2935ZM17.6138 41.2935C17.6138 32.0966 25.0964 24.6138 34.2935 24.6138C43.4904 24.6138 50.9732 32.0964 50.9732 41.2935C50.9732 50.4904 43.4904 57.9732 34.2935 57.9732C25.0966 57.9732 17.6138 50.4905 17.6138 41.2935Z"
                          fill="#053c61"
                          stroke="#F9FFF9"
                          strokeWidth="0.3"
                        />
                        <path
                          d="M33.9428 48.6577C33.9428 49.0364 34.2499 49.3435 34.6285 49.3435C35.0071 49.3435 35.3142 49.0368 35.3142 48.6577V34.7292C35.3142 34.3505 35.0071 34.0435 34.6285 34.0435C34.2498 34.0435 33.9428 34.3505 33.9428 34.7292V48.6577Z"
                          fill="#053c61"
                          stroke="#053c61"
                          strokeWidth="0.3"
                        />
                        <path
                          d="M34.6281 35.7001L30.8274 39.5008L34.6281 35.7001ZM34.6281 35.7001L38.4289 39.5008C38.5626 39.6346 38.7386 39.7017 38.9137 39.7017L34.6281 35.7001ZM29.8576 39.5008C30.1254 39.7686 30.5597 39.7688 30.8273 39.5008L38.9138 39.7017C39.0886 39.7017 39.2647 39.6352 39.3987 39.5008C39.6665 39.2329 39.6665 38.7989 39.3986 38.5311L35.113 34.2454C34.8452 33.9776 34.4108 33.9775 34.1432 34.2454C34.1432 34.2455 34.1431 34.2455 34.1431 34.2455L29.8576 38.5311C29.5897 38.799 29.5897 39.233 29.8576 39.5008Z"
                          fill="#053c61"
                          stroke="#053c61"
                          strokeWidth="0.3"
                        />
                      </svg>
                      <Typography
                        variant="h6"
                        sx={{
                          fontSize: "16px",
                          fontWeight: "bold",
                          lineHeight: "19px",
                          color: theme.palette.common.black,
                          margin: "0px",
                          padding: "0px",
                          marginBottom: "10px",
                        }}
                      >
                        Drag & drop Files or{" "}
                        <span
                          style={{
                            color: theme.palette.primary.main,
                            fontWeight: "bold",
                            fontSize: "17px",
                            textDecoration: "underline",
                          }}
                        >
                          Browse
                        </span>
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: "13px",
                          lineHeight: "19px",
                          color: "gray",
                          margin: "0px",
                          padding: "0px",
                          marginBottom: "10px",
                        }}
                      >
                        JPG or PNG, file size no more than 1MB
                      </Typography>
                      {imageUploadingError && (
                        <Typography
                          variant="body1"
                          sx={{
                            marginTop: "12px",
                            color: "red",
                            fontWeight: "600",
                          }}
                        >
                          {imageUploadingError}
                        </Typography>
                      )}
                    </label>
                  </Box>
                </Box>

                <Box flexGrow={1}>
                  {values?.imageUrl || values?.selectedImage ? (
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      {values?.imageUrl && (
                        <img
                          src={values?.imageUrl}
                          alt="Selected"
                          width={200}
                          height={150}
                        />
                      )}
                      {values?.selectedImage && (
                        <Image
                          src={URL.createObjectURL(values?.selectedImage)}
                          alt="Selected"
                          width={200}
                          height={150}
                        />
                      )}
                      <Button
                        variant="contained"
                        sx={{
                          mt: 2,
                          padding: "10px 20px",
                          backgroundColor: "#c95450",
                        }}
                        onClick={() => {
                          setFieldValue("selectedImage", null);
                          setFieldValue("imageUrl", null);
                          setFieldValue("hospitalLogo", null);
                        }}
                      >
                        Discard
                      </Button>
                    </Box>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="75"
                      height="63"
                      viewBox="0 0 75 63"
                      fill="none"
                    >
                      <path
                        d="M3.29297 1.21406C2.37422 1.64062 1.68516 2.3625 1.22578 3.36328C0.930469 3.98672 0.914062 5.26641 0.914062 31.5164V58.9969L1.34062 59.85C1.8 60.7852 2.47266 61.425 3.45703 61.868C4.08047 62.1633 5.54062 62.1797 37.5164 62.1797H70.9031L71.7562 61.7531C72.6914 61.2937 73.3312 60.6211 73.7742 59.6367C74.0695 59.0133 74.0859 57.75 74.0859 31.5C74.0859 5.25 74.0695 3.98672 73.7742 3.36328C73.3312 2.37891 72.6914 1.70625 71.7562 1.24687L70.9031 0.820312H4.11328L3.29297 1.21406ZM59.8453 9.36797C61.2562 9.66328 62.4375 10.3195 63.5203 11.3859C66.4242 14.3062 66.4242 18.5062 63.5203 21.4266C62.3719 22.575 61.1742 23.1984 59.5992 23.4609C56.6297 23.9859 53.4961 22.3125 52.0852 19.4414C51.5438 18.3422 51.5273 18.2273 51.5273 16.4062C51.5273 14.5852 51.5438 14.4703 52.0852 13.3711C53.5453 10.4016 56.7937 8.72812 59.8453 9.36797ZM31.1672 23.6906C31.7086 24.0023 32.9719 25.643 37.7461 32.2383C43.7344 40.5234 44.1445 41.0156 45.3258 41.2617C45.9984 41.393 47.0484 41.0977 47.6391 40.6055C47.9016 40.3922 48.9352 39.0633 49.9523 37.6687C51.1172 36.0281 51.9867 35.0109 52.3805 34.7648C53.2172 34.2398 54.3328 34.2562 55.1203 34.7977C55.7273 35.2078 66.8672 50.4 67.1953 51.2695C67.4906 52.0406 67.3922 52.5656 66.8508 53.0906L66.3586 53.5664L38.025 53.6156C11.2992 53.6484 9.65859 53.632 9.11719 53.3695C8.80547 53.2055 8.44453 52.8773 8.32969 52.6312C7.87031 51.6469 7.09922 52.7953 24.6375 28.5961C28.2305 23.6414 28.5422 23.3133 29.8547 23.2969C30.2484 23.2969 30.757 23.4445 31.1672 23.6906Z"
                        fill="#CCCCCC"
                      />
                    </svg>
                  )}
                </Box>
              </Box>
            </Box>
          </Grid2>
        </Grid2>
      </Grid2>
      <Grid2
        size={{
          xs: 12,
          lg: 12,
        }}
        sx={{
          boxShadow: "0px 0px 1px 2px rgba(0, 0, 0, 0.2)",
          p: 2,
          borderRadius: "12px",
        }}
      >
        <Grid2 container spacing={2}>
          <Grid2
            size={{
              xs: 12,
              md: 6,
            }}
          >
            <Box>
              <InputLabel required>Product Type</InputLabel>
              <FormControl
                fullWidth
                error={touched?.productType && Boolean(errors?.productType)}
              >
                <Select
                  size="small"
                  value={values.productType}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  fullWidth
                  name="productType"
                  variant="outlined"
                  displayEmpty
                >
                  <MenuItem value="">Select Type</MenuItem>
                  <MenuItem value="standard">Standard Product</MenuItem>
                  <MenuItem value="variable">Variable Product</MenuItem>
                  <MenuItem value="service">Service Product</MenuItem>
                  <MenuItem value="combo">Combo Product</MenuItem>
                  <MenuItem value="other">Other</MenuItem>
                </Select>
                {touched?.productType && errors?.productType && (
                  <FormHelperText>{errors?.productType}</FormHelperText>
                )}
              </FormControl>
            </Box>
          </Grid2>
          <Grid2
            size={{
              xs: 12,
              md: 6,
            }}
          >
            <Box>
              <InputLabel required>Product Cost</InputLabel>
              <TextField
                variant="outlined"
                size="small"
                autoFocus={true}
                autoComplete="off"
                type="text"
                fullWidth
                placeholder="Cost in Rupees"
                name="productCost"
                error={touched?.productCost && Boolean(errors?.productCost)}
                value={values?.productCost}
                onChange={handleChange}
                onBlur={handleBlur}
                helperText={
                  errors.productCost &&
                  touched?.productCost &&
                  `${errors.productCost}`
                }
                id="productCost"
              />
            </Box>
          </Grid2>
          <Grid2
            size={{
              xs: 12,
              md: 6,
            }}
          >
            <Box>
              <InputLabel required>Product Selling Price</InputLabel>
              <TextField
                variant="outlined"
                size="small"
                autoFocus={true}
                autoComplete="off"
                type="text"
                fullWidth
                placeholder="Selling Price in Rupees"
                name="productPrice"
                error={touched?.productPrice && Boolean(errors?.productPrice)}
                value={values?.productPrice}
                onChange={handleChange}
                onBlur={handleBlur}
                helperText={
                  errors.productPrice &&
                  touched?.productPrice &&
                  `${errors.productPrice}`
                }
                id="productPrice"
              />
            </Box>
          </Grid2>
          <Grid2
            size={{
              xs: 12,
              md: 6,
            }}
          >
            <Box>
              <InputLabel required>Product Unit</InputLabel>
              <FormControl
                fullWidth
                error={touched?.productUnit && Boolean(errors?.productUnit)}
              >
                <Select
                  size="small"
                  value={values.productUnit}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  fullWidth
                  name="productUnit"
                  variant="outlined"
                  displayEmpty
                >
                  <MenuItem value="">Select Unit Type</MenuItem>
                  <MenuItem value="kilogram">Kilogram</MenuItem>
                  <MenuItem value="meter">Meter</MenuItem>
                  <MenuItem value="piece">Service Product</MenuItem>
                  <MenuItem value="centimeter">Centimeter</MenuItem>
                  <MenuItem value="inch">Inch</MenuItem>
                </Select>
                {touched?.productUnit && errors?.productUnit && (
                  <FormHelperText>{errors?.productUnit}</FormHelperText>
                )}
              </FormControl>
            </Box>
          </Grid2>
          <Grid2
            size={{
              xs: 12,
              md: 6,
            }}
          >
            <Box>
              <InputLabel required>Sale Unit</InputLabel>
              <FormControl
                fullWidth
                error={
                  touched?.productSaleUnit && Boolean(errors?.productSaleUnit)
                }
              >
                <Select
                  size="small"
                  value={values.productSaleUnit}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  fullWidth
                  name="productSaleUnit"
                  variant="outlined"
                  displayEmpty
                >
                  <MenuItem value="">Sale Unit Type</MenuItem>
                  <MenuItem value="kilogram">Kilogram</MenuItem>
                  <MenuItem value="meter">Meter</MenuItem>
                  <MenuItem value="centimeter">Centimeter</MenuItem>
                  <MenuItem value="inch">Inch</MenuItem>
                </Select>
                {touched?.productSaleUnit && errors?.productSaleUnit && (
                  <FormHelperText>{errors?.productSaleUnit}</FormHelperText>
                )}
              </FormControl>
            </Box>
          </Grid2>
          <Grid2
            size={{
              xs: 12,
              md: 6,
            }}
          >
            <Box>
              <InputLabel required>Purchase Unit</InputLabel>
              <FormControl
                fullWidth
                error={
                  touched?.productPurchaseUnit &&
                  Boolean(errors?.productPurchaseUnit)
                }
              >
                <Select
                  size="small"
                  value={values.productPurchaseUnit}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  fullWidth
                  name="productPurchaseUnit"
                  variant="outlined"
                  displayEmpty
                >
                  <MenuItem value="">Purchase Unit Type</MenuItem>
                  <MenuItem value="kilogram">Kilogram</MenuItem>
                  <MenuItem value="meter">Meter</MenuItem>
                  <MenuItem value="centimeter">Centimeter</MenuItem>
                  <MenuItem value="inch">Inch</MenuItem>
                </Select>
                {touched?.productPurchaseUnit &&
                  errors?.productPurchaseUnit && (
                    <FormHelperText>
                      {errors?.productPurchaseUnit}
                    </FormHelperText>
                  )}
              </FormControl>
            </Box>
          </Grid2>
          <Grid2
            size={{
              xs: 12,
              md: 6,
            }}
          >
            <Box>
              <InputLabel required>Purchase Unit</InputLabel>
              <FormControl
                fullWidth
                error={
                  touched?.productPurchaseUnit &&
                  Boolean(errors?.productPurchaseUnit)
                }
              >
                <Select
                  size="small"
                  value={values.productPurchaseUnit}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  fullWidth
                  name="productPurchaseUnit"
                  variant="outlined"
                  displayEmpty
                >
                  <MenuItem value="">Purchase Unit Type</MenuItem>
                  <MenuItem value="kilogram">Kilogram</MenuItem>
                  <MenuItem value="meter">Meter</MenuItem>
                  <MenuItem value="centimeter">Centimeter</MenuItem>
                  <MenuItem value="inch">Inch</MenuItem>
                </Select>
                {touched?.productPurchaseUnit &&
                  errors?.productPurchaseUnit && (
                    <FormHelperText>
                      {errors?.productPurchaseUnit}
                    </FormHelperText>
                  )}
              </FormControl>
            </Box>
          </Grid2>
          <Grid2
            size={{
              xs: 12,
              md: 6,
            }}
          >
            <Box>
              <InputLabel required>Product Quantity</InputLabel>
              <TextField
                variant="outlined"
                size="small"
                autoFocus={true}
                autoComplete="off"
                type="text"
                fullWidth
                placeholder="Eg 100/200"
                name="productQuantity"
                error={
                  touched?.productQuantity && Boolean(errors?.productQuantity)
                }
                value={values?.productQuantity}
                onChange={handleChange}
                onBlur={handleBlur}
                helperText={
                  errors.productQuantity &&
                  touched?.productQuantity &&
                  `${errors.productQuantity}`
                }
                id="productQuantity"
              />
            </Box>
          </Grid2>
        </Grid2>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            gap: 2,
            mt: 2,
          }}
        >
          <Button
            type="button"
            variant="outlined"
            onClick={() => {
              resetForm();
            }}
            sx={{
              px: 4,
              display: "flex",
              justifyContent: "center",
              // width: "100%",
            }}
            size="small"
          >
            Reset Form
          </Button>
          <Button
            type="submit"
            variant="contained"
            sx={{
              px: 4,
              display: "flex",
              justifyContent: "center",
              // width: "100%",
            }}
            size="small"
          >
            Create Product
          </Button>
        </Box>
      </Grid2>
    </Grid2>
  );
};

export default CreateProductPage;
