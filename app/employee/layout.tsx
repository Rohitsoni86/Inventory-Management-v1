import React from "react";
import EmployeeLayout from "./components/EmployeeLayout";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <EmployeeLayout>{children}</EmployeeLayout>;
}
