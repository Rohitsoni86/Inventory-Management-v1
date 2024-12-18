// "use client";
// import React, { useState, useEffect } from "react";
// import TextField from "@mui/material/TextField";
// import Box from "@mui/material/Box";
// import CachedIcon from "@mui/icons-material/Cached";
// import IconButton from "@mui/material/IconButton";
// import { useGenerateCaptcha } from "@/api/auth-api";
// import { useAppContext } from "../providers/app-context";
// import Image from "next/image";

// function Captcha() {
//   const {
//     generateCaptcha,
//     setGenerateCaptcha,
//     captchaResult,
//     setCaptchaResult,
//     captcha,
//     setCaptcha,
//   } = useAppContext();
//   const [timeOfGeneration, setTimeOfGeneration] = useState<number | null>(null);

//   // const { data, error, isError, isSuccess } =
//   //   useGenerateCaptcha(generateCaptcha);
//   // useEffect(() => {
//   //   if (isSuccess) {
//   //     setGenerateCaptcha(false);
//   //     setCaptcha(data?.data?.data);
//   //     setTimeOfGeneration(new Date().getTime() + 295000);
//   //   }
//   // }, [isSuccess]);

//   // useEffect(() => {
//   //   if (isError) {
//   //     console.log(error);
//   //     setGenerateCaptcha(false);
//   //   }
//   // }, [isError]);

//   // useEffect(() => {
//   //   const interval = setInterval(() => {
//   //     if (timeOfGeneration && new Date().getTime() > timeOfGeneration) {
//   //       setGenerateCaptcha(true);
//   //     }
//   //   }, 1000);

//   //   return () => clearInterval(interval);
//   // }, [timeOfGeneration]);

//   return (
//     <Box display="flex" gap={1}>
//       <Image
//         src={`data:image/svg+xml;base64,${captcha}`}
//         alt=""
//         width={250}
//         height={55}
//       />
//       <TextField
//         placeholder="Fill Captcha"
//         variant="outlined"
//         type="number"
//         name="captcha"
//         value={captchaResult || ""}
//         onKeyDown={(e) => {
//           if (e.key === "e" || e.key === "." || e.key === "-") {
//             e.preventDefault();
//           }
//         }}
//         onChange={(event) => {
//           if (event.target.value.length > 4) {
//             return;
//           }
//           setCaptchaResult(event.target.value);
//         }}
//       />
//       <IconButton
//         aria-label="captcha"
//         sx={{ color: "black", width: "50px", height: "50px" }}
//       >
//         <CachedIcon
//           onClick={() => {
//             setGenerateCaptcha(true);
//           }}
//         />
//       </IconButton>
//     </Box>
//   );
// }

// export default Captcha;
