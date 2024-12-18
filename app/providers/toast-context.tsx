"use client";
import { ReactNode } from "react";
import { useAppContext } from "./app-context";
import { ErrorToast, SuccessToast } from "../components/Toast";

const ToastContext = ({ children }: { children: ReactNode }) => {
  const { openToastError, message, handleCloseToast, openToastSuccess } =
    useAppContext();

  console.log("Messages", message);

  return (
    <>
      {}
      <SuccessToast
        openToastSuccess={openToastSuccess}
        message={message}
        handleClose={handleCloseToast}
      ></SuccessToast>
      <ErrorToast
        openToastError={openToastError}
        message={message}
        handleClose={handleCloseToast}
      ></ErrorToast>
      {children}
    </>
  );
};

export default ToastContext;
