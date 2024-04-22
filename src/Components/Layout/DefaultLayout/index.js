import React, { useContext } from "react";
import ToastMessage from "./ToastMessage";
import Modal from "./Modal";
import Sidebar from "./Sidebar";
import LoadingLine from "../../../effects/LoadingLine";
import { AppContext } from "../../../Context/AppContext";

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
            <ToastMessage />
        </React.Fragment>
    );
}

export default DefaultLayout;