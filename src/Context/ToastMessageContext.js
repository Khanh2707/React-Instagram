import React, { createContext, useState, useContext } from "react";

const ToastMessageContext = createContext();

export const ToastMessageProvider = ({ children }) => {
  const [toastMessage, setToastMessage] = useState(null);

  return (
    <ToastMessageContext.Provider value={{ toastMessage, setToastMessage }}>
      {children}
    </ToastMessageContext.Provider>
  );
};

export const useToastMessage = () => useContext(ToastMessageContext);
