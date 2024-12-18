"use client";

import React from "react";

interface ErrorBoundaryProps {
  error: Error;
  reset: () => void;
}

const ErrorPage: React.FC<ErrorBoundaryProps> = ({ error, reset }) => {
  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h1>Something went wrong</h1>
      <p>{error.message}</p>
      <button onClick={reset}>Try again</button>
    </div>
  );
};

export default ErrorPage;
