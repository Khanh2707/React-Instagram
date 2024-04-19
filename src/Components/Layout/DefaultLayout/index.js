import React from "react";
import ToastMessage from "./ToastMessage";
import Modal from "./Modal";
import Sidebar from "./Sidebar";

function DefaultLayout({ children }) {
    return (
        <React.Fragment>
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