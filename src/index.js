import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';

import reportWebVitals from './reportWebVitals';
import GlobalStyles from './Components/GlobalStyles';
import { AppProvider } from './Context/AppContext';
import { ModalProvider } from './Context/ModalContext';
import { ToastMessageProvider } from './Context/ToastMessageContext';
import { ModalTwoProvider } from './Context/ModalTwoContext';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
    <GlobalStyles>
      <AppProvider>
        <ToastMessageProvider>
          <ModalTwoProvider>
          <ModalProvider>
          <App />
          </ModalProvider>
          </ModalTwoProvider>
        </ToastMessageProvider>
      </AppProvider>
    </GlobalStyles>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
