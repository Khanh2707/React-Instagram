import React, { useContext } from "react";

import Sidebar from "./Sidebar";
import ToastMessage from "~/Components/ToastMessage";
import Modal from "~/Components/Modal";
import ModalTwo from "~/Components/ModalTwo";
import LoadingLine from "~/Components/LoadingLine";
import { AppContext } from "~/Context/AppContext";

function DefaultLayout({ children }) {
    const { isLoadingLine } = useContext(AppContext);

    return (
        <React.Fragment>
            {isLoadingLine && <LoadingLine />}
            <div id="main">
                <div id="allNavigationBar">
                    <Sidebar />
                </div>
                <div id="content">
                    {children}
                </div>
            </div>
            <Modal />
            <ModalTwo />
            <ToastMessage />
        </React.Fragment>
    );
}

export default DefaultLayout;