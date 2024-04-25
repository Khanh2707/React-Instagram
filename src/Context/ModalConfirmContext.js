import React, { createContext, useState, useContext } from 'react';

const ModalConfirmContext = createContext();

export const ModalConfirmProvider = ({ children }) => {
  const [isMouthModalConfirm, setIsMouthModalConfirm] = useState(false);
  const [mouthedContent, setMouthedContent] = useState(null);

  return (
    <ModalConfirmContext.Provider value={{ isMouthModalConfirm, setIsMouthModalConfirm, mouthedContent, setMouthedContent }}>
      {children}
    </ModalConfirmContext.Provider>
  );
};

export const useModalConfirm = () => useContext(ModalConfirmContext);