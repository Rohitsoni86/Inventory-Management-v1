import React from "react";

function EmployeeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div>{children}</div>;
}

export default EmployeeLayout;
