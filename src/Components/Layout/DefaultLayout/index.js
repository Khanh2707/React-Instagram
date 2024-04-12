import React from "react";
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
        </React.Fragment>
    );
}

export default DefaultLayout;