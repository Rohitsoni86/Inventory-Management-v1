import type { Metadata } from "next";
import { Quicksand } from "next/font/google";
import "./globals.css";
import TanstackProvider from "./providers/tanstack";
import ThemeContext from "./providers/mui-theme";
import { Suspense } from "react";
import { AppProvider } from "./providers/app-context";
import ToastContext from "./providers/toast-context";
import StoreProvider from "./StoreProvider";

const quicksand = Quicksand({
  subsets: ["latin"],
  weight: "variable",
});

export const metadata: Metadata = {
  title: "Chikitsa SDK",
  description: "Chikitsa SDK",
  icons: {
    icon: "/logo.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={quicksand.className}>
        <StoreProvider>
          <TanstackProvider>
            <AppProvider>
              <ThemeContext>
                <ToastContext>
                  <Suspense fallback={<div>...loading</div>}>
                    {children}
                  </Suspense>
                </ToastContext>
              </ThemeContext>
            </AppProvider>
          </TanstackProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
