import React, { ErrorInfo, ReactNode } from "react";
import { useRouter } from "next/router";

// TypeScript Interfaces for props and state
interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

const ErrorBoundary: React.FC<ErrorBoundaryProps> = ({ children }) => {
  const [state, setState] = React.useState<ErrorBoundaryState>({
    hasError: false,
    error: null,
    errorInfo: null,
  });

  const router = useRouter();
  const { pathname } = router;

  // Method to handle error state and reset
  const resetError = () => {
    setState({ hasError: false, error: null, errorInfo: null });
  };

  // Catching error in child components
  if (state.hasError) {
    return (
      <div style={{ padding: "20px", textAlign: "center" }}>
        <h1>Error occurred</h1>
        <p>Something went wrong!</p>
        <p>Current Path: {pathname}</p>
        <p>An unexpected error occurred. Please try refreshing the page.</p>

        {/* Custom fallback UI depending on the pathname */}
        {/* {pathname === '/dashboard' && (
          <div>
            <p>Oops! Something went wrong on the Dashboard. Try refreshing!</p>
          </div>
        )} */}

        {/* {pathname === '/profile' && (
          <div>
            <p>There was an issue loading your Profile. Please try again later.</p>
          </div>
        )} */}

        {/* Default fallback UI */}
        {/* {!pathname && (
          <div>
            <p>An unexpected error occurred. Please try refreshing the page.</p>
          </div>
        )} */}

        <button onClick={resetError}>Retry</button>
      </div>
    );
  }

  return <>{children}</>;
};

export default ErrorBoundary;
