import React, { createContext, useState, useContext } from 'react';

const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
  const [isMouthModal, setIsMouthModal] = useState(false);
  const [mouthedContent, setMouthedContent] = useState(null);

  return (
    <ModalContext.Provider value={{ isMouthModal, setIsMouthModal, mouthedContent, setMouthedContent }}>
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => useContext(ModalContext);