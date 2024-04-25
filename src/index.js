import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import GlobalStyles from './Components/GlobalStyles';
import { AppProvider } from './Context/AppContext';
import { ModalProvider } from './Context/ModalContext';
import { ToastMessageProvider } from './Context/ToastMessageContext';
import { ModalConfirmProvider } from './Context/ModalConfirmContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
    <GlobalStyles>
      <AppProvider>
        <ToastMessageProvider>
          <ModalConfirmProvider>
          <ModalProvider>
            <App />
          </ModalProvider>
          </ModalConfirmProvider>
        </ToastMessageProvider>
      </AppProvider>
    </GlobalStyles>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
