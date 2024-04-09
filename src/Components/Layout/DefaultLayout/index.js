import Sidebar from "./Sidebar";

function DefaultLayout({ children }) {
    return (
        <div id="main">
            <div id="allNavigationBar">
                <Sidebar />
            </div>
            <div id="content">
                {children}
            </div>
        </div>
    );
}

export default DefaultLayout;