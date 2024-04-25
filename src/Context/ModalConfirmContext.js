// import React, { createContext, useContext, useState } from 'react';

// const ModalConfirmContext = createContext();

// export const useModalConfirm = () => useContext(ModalConfirmContext);

// export const ModalConfirmProvider = ({ children }) => {
//     const [isModalConfirmOpen, setIsModalConfirmOpen] = useState(false);
//     const [modalConfirmContent, setModalConfirmContent] = useState(null);

//     const openModalConfirm = (content) => {
//         setModalConfirmContent(content);
//         setIsModalConfirmOpen(true);
//     };

//     const closeModalConfirm = () => {
//         setIsModalConfirmOpen(false);
//         setModalConfirmContent(null);
//     };

//     return (
//         <ModalConfirmContext.Provider value={{ isModalConfirmOpen, modalConfirmContent, openModalConfirm, closeModalConfirm }}>
//             {children}
//         </ModalConfirmContext.Provider>
//     );
// };