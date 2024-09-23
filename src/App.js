import React, { useState } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import Navbar from "./components/layout/Navbar";
import Cart from "./pages/cart/Cart";
import PlaceOrder from "./pages/place-order/PlaceOrder";
import Footer from "./components/layout/Footer";
import LoginPopup from "./components/login-popup/LoginPopup";
import { Toaster } from "react-hot-toast";
import ScrollToTop from "./utils/ScrollToTop.js";
import ScrollToTopButton from "./utils/ScrollToTopButton.js";
import Verify from "./pages/verify/Verify.js";
import MyOrders from "./pages/myorders/MyOrders.js";

const App = () => {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <BrowserRouter>
      {showLogin ? <LoginPopup setShowLogin={setShowLogin} /> : <></>}
      <ScrollToTop />
      <Navbar setShowLogin={setShowLogin} />
      <div className="">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/order" element={<PlaceOrder />} />
          <Route
            path="/myorders"
            element={<MyOrders setShowLogin={setShowLogin} />}
          />
          <Route path="/verify" element={<Verify />} />
        </Routes>
        <Footer />
        <ScrollToTopButton />
      </div>
      <Toaster />
    </BrowserRouter>
  );
};

export default App;
