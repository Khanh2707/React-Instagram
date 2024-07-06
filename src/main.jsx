import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

import GlobalStyles from './Components/GlobalStyles';
import { AppProvider } from './Context/AppContext';
import { ModalProvider } from './Context/ModalContext';
import { ToastMessageProvider } from './Context/ToastMessageContext';
import { ModalTwoProvider } from './Context/ModalTwoContext';

ReactDOM.createRoot(document.getElementById("root")).render(
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
  // </React.StrictMode>,
);
