import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from "react";
import Home from "./components/Home/Home";
// import Product from "./components/Product/Product";
import Navbar from "./components/Nav/Navbar";
import Footer from "./components/Footer/Footer";
import Cart from "./components/Cart/Cart";
import Purchase from "./components/Purchase/Purchase";

function App() {
    return (
        <div>
            <Router>
                <Navbar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    {/* <Route path="/product" element={<Product />} /> */}
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/purchase" element={<Purchase />} />
                </Routes>
                <Footer />
            </Router>
        </div>
    );
}

export default App;
