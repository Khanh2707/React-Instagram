import React, { createContext, useContext, useState } from 'react';

const ModalTwoContext = createContext();

export const useModalTwo = () => useContext(ModalTwoContext);

export const ModalTwoProvider = ({ children }) => {
    const [isModalTwoOpen, setIsModalTwoOpen] = useState(false);
    const [modalTwoContent, setModalTwoContent] = useState(null);

    const openModalTwo = (content) => {
        setModalTwoContent(content);
        setIsModalTwoOpen(true);
    };

    const closeModalTwo = () => {
        setIsModalTwoOpen(false);
        setModalTwoContent(null);
    };

    return (
        <ModalTwoContext.Provider value={{ isModalTwoOpen, modalTwoContent, openModalTwo, closeModalTwo }}>
            {children}
        </ModalTwoContext.Provider>
    );
};