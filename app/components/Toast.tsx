import { Alert, Snackbar } from "@mui/material";
import React from "react";

interface toastSuccessProps {
  openToastSuccess: boolean;
  handleClose: () => void;
  message: string;
}

interface toastErrorProps {
  openToastError: boolean;
  handleClose: () => void;
  message: string;
}

export function SuccessToast({
  openToastSuccess,
  handleClose,
  message,
}: toastSuccessProps) {
  return (
    <Snackbar
      open={openToastSuccess}
      autoHideDuration={3000}
      onClose={handleClose}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
    >
      <Alert
        onClose={handleClose}
        severity="success"
        variant="filled"
        sx={{ width: "100%" }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
}

export function ErrorToast({
  openToastError,
  handleClose,
  message,
}: toastErrorProps) {
  return (
    <Snackbar
      open={openToastError}
      autoHideDuration={3000}
      onClose={handleClose}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
    >
      <Alert
        onClose={handleClose}
        severity="error"
        variant="filled"
        sx={{ width: "100%" }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
}
