import React, { createContext, useState } from "react";

const LoadingContext = createContext();

export const LoadingProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const showError = (message) => {
    setError(message);
    setTimeout(() => setError(null), 4000);
  };

  return (
    <LoadingContext.Provider value={{ loading, setLoading, error, showError }}>
      {children}
    </LoadingContext.Provider>
  );
};

export default LoadingContext;
