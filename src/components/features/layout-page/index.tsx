import { Outlet } from "react-router-dom";
import Footer from "./../../shared/Footer/Footer";
import Navbar from "./../../shared/Nav/Navbar";
import ScrollTop from "./../../shared/ScrollTop/ScrollTop";

const LayoutPage: React.FC = () => {
    const path = window.location.pathname;

    return (
        <>
            {path === "/dashboard" ? <></> : <Navbar />}
            <Outlet />
            {path === "/dashboard" ? <></> : <Footer />}
            <ScrollTop />
        </>
    );
};

export default LayoutPage;
