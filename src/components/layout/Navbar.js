import React, { useContext, useState } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { MdShoppingCart } from "react-icons/md";
import { FaSearch } from "react-icons/fa";
import { GoDotFill } from "react-icons/go";
import { Link as ScrollLink } from "react-scroll";
import { Link, Link as RouterLink } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";
import { assets } from "../../assets/assets";
import toast from "react-hot-toast";

const Navbar = ({ setShowLogin }) => {
  const [nav, setNav] = useState(false);
  const { cartItems, isZoom, token, setToken } = useContext(StoreContext);

  // Toggle function to handle the navbar's display
  const handleNav = () => {
    setNav(!nav);
  };

  // Array containing navigation items
  const navItems = [
    { id: 1, text: "Home", link: "home" },
    { id: 2, text: "Menu", link: "menu" },
    { id: 3, text: "Mobile App", link: "app-download" },
    { id: 4, text: "Contact Us", link: "contact" },
  ];

  return (
    <div className="bg-white w-full shadow-lg sticky left-0 right-0 top-0 z-50">
      <div className="px-6 md:px-12  lg:px-16 max-w-7xl w-full mx-auto flex justify-between items-center h-20 text-black">
        {/* Logo */}
        <RouterLink to="/">
          {" "}
          <h1 className="text-3xl font-bold text-[#00df9a]">Restaurant</h1>
        </RouterLink>

        {/* Desktop Navigation */}
        <div className="flex items-center justify-center md:gap-8">
          <ul className="hidden md:flex">
            {navItems.map((item) => (
              <RouterLink to="/">
                <li
                  key={item.id}
                  className="p-3 hover:bg-[#00df9a] rounded-xl m-2 cursor-pointer duration-300 hover:text-black"
                >
                  <ScrollLink
                    activeClass="active"
                    to={item.link}
                    spy={true}
                    smooth={true}
                    offset={-120}
                    duration={500}
                  >
                    {item.text}
                  </ScrollLink>
                </li>
              </RouterLink>
            ))}
          </ul>

          {/* Mobile Navigation Icon */}
          <div onClick={handleNav} className="block md:hidden cursor-pointer">
            {nav ? <AiOutlineClose size={24} /> : <AiOutlineMenu size={24} />}
          </div>

          {/* Mobile Navigation Menu */}
          <ul
            className={`fixed md:hidden top-0 left-0 w-[60%] h-full border-r border-r-gray-900 bg-white ease-in-out duration-500 ${
              nav ? "left-0" : "left-[-100%]"
            }`}
          >
            {/* Mobile Logo */}
            <h1 className="text-3xl font-bold text-[#00df9a]">Restaurant</h1>

            {/* Mobile Navigation Items */}
            {navItems.map((item) => (
              <li
                key={item.id}
                className="p-4 border-b rounded-xl hover:bg-[#00df9a] duration-300 hover:text-black cursor-pointer border-gray-600"
              >
                {item.text}
              </li>
            ))}
          </ul>

          {/* Search and Cart Icons */}
          <div className="flex items-center justify-center md:gap-10">
            <FaSearch className="text-xl md:text-xl cursor-pointer" />
            <div className="relative flex items-center justify-center cursor-pointer">
              <RouterLink to="/cart">
                {" "}
                <MdShoppingCart
                  className={`text-xl md:text-2xl  ${
                    isZoom ? "transition-transform duration-300 scale-110" : ""
                  }`}
                />
              </RouterLink>
              {Object.keys(cartItems).length > 0 && (
                <GoDotFill className="text-red-600 text-xl absolute -top-4 right-[-8px]" />
              )}
            </div>

            {!token ? (
              <button
                onClick={() => setShowLogin(true)}
                className="hidden md:block focus:outline-none rounded-3xl cursor-pointer hover:bg-[#00df9a] bg-white border border-gray-500 py-1.5 px-7 text-black"
              >
                Sign In
              </button>
            ) : (
              <div className="relative main-profile">
                <img
                  src={assets.kashif_pic}
                  alt=""
                  className="cursor-pointer drop-img w-10 h-10 md:h-16 md:w-16 rounded-full"
                />
                <ul className="absolute  list-items right-0 pt-5 z-10 hidden hover:block bg-white  -left-6 px-5 pb-5 space-y-2 w-40">
                  <li className="flex cursor-pointer items-center gap-2 justify-start">
                    <img src={assets.bag_icon} alt="" />
                    <RouterLink to="/myorders">
                      <p className="font-medium hover:text-red-600">Orders</p>
                    </RouterLink>
                  </li>
                  <hr />
                  <li
                    onClick={() => {
                      localStorage.removeItem("token");
                      setToken("");
                      toast.success("Logout Successfully");
                    }}
                    className="flex cursor-pointer items-center gap-2 justify-start"
                  >
                    {" "}
                    <img src={assets.logout_icon} alt="" />
                    <p className="font-medium hover:text-red-600">Logout</p>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
