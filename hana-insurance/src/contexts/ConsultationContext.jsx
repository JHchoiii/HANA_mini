// src/contexts/ConsultationContext.jsx
import React, { createContext, useState } from "react";

export const ConsultationContext = createContext();

export const ConsultationProvider = ({ children }) => {
  const [hasNewRequest, setHasNewRequest] = useState(false);

  const notifyNewRequest = () => {
    setHasNewRequest(true);
  };

  const clearRequest = () => {
    setHasNewRequest(false);
  };

  return (
    <ConsultationContext.Provider
      value={{ hasNewRequest, notifyNewRequest, clearRequest }}
    >
      {children}
    </ConsultationContext.Provider>
  );
};
