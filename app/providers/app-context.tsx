"use client";
import React, { createContext, useContext, useMemo, useState } from "react";

interface AppContextType {
  generateCaptcha: boolean;
  setGenerateCaptcha: React.Dispatch<React.SetStateAction<boolean>>;
  captchaResult: string | null;
  setCaptchaResult: React.Dispatch<React.SetStateAction<string | null>>;
  captcha: string | null;
  setCaptcha: React.Dispatch<React.SetStateAction<string | null>>;
  openToastSuccess: boolean;
  openToastError: boolean;
  setOpenToastSuccess: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenToastError: React.Dispatch<React.SetStateAction<boolean>>;
  message: string;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
  handleCloseToast: () => void;
}

// Create the context with the appropriate type
export const AppContext = createContext<AppContextType | undefined>(undefined);

interface AppProviderProps {
  children: React.ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  // Type the useState hooks according to your context state type
  const [generateCaptcha, setGenerateCaptcha] = useState<boolean>(true);
  const [captchaResult, setCaptchaResult] = useState<string | null>(null);
  const [captcha, setCaptcha] = useState<string | null>(null);

  // Toast Context
  const [openToastSuccess, setOpenToastSuccess] = useState<boolean>(false);
  const [openToastError, setOpenToastError] = useState<boolean>(false);

  const handleCloseToast = (): void => {
    setOpenToastSuccess(false);
    setOpenToastError(false);
    setMessage("");
  };

  const [message, setMessage] = useState<string>("");

  console.log("Messages", message);

  // Memoize the context value for performance optimization
  const value = useMemo(
    () => ({
      handleCloseToast,
      openToastSuccess,
      openToastError,
      setOpenToastSuccess,
      setOpenToastError,
      message,
      setMessage,
      generateCaptcha,
      setGenerateCaptcha,
      captchaResult,
      setCaptchaResult,
      captcha,
      setCaptcha,
    }),
    [
      handleCloseToast,
      openToastSuccess,
      openToastError,
      setOpenToastSuccess,
      setOpenToastError,
      message,
      setMessage,
      generateCaptcha,
      setGenerateCaptcha,
      captchaResult,
      setCaptchaResult,
      captcha,
      setCaptcha,
    ]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }

  return context;
};
