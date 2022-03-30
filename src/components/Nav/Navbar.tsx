import { FC } from "react";
import { Link } from "react-router-dom";
import "../../styles/navbar.scss";

const Navbar: FC<{}> = () => {
    return (
        <nav className="navbar">
            <Link to="/">Home</Link>
            <Link to="/product">San pham</Link>
            <Link to="/cart">Don hang</Link>
            <Link to="/purchase">San pham da mua</Link>
        </nav>
    );
};

export default Navbar;
