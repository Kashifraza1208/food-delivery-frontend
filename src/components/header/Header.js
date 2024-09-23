import React from "react";
import { Link } from "react-scroll";

const Header = () => {
  return (
    <div className="relative h-screen w-full">
      {/* Background overlay with reduced opacity */}
      <div
        className="absolute  bg-cover bg-center bg-black  inset-0 z-10"
        style={{
          backgroundImage: "url(/bg2.jpeg)",
        }}
      ></div>

      {/* Content section */}
      <div className="relative z-10 px-6 md:px-12 lg:px-16 max-w-7xl mx-auto">
        <div className="pt-20 md:pt-28 flex flex-col text-white items-start gap-6 max-w-2xl px-4 md:px-0">
          <h2 className="text-3xl md:text-4xl lg:text-6xl font-bold">
            Order Your Favourite Food here
          </h2>
          <p className="text-sm md:text-base lg:text-lg font-medium">
            Choose from a diverse menu featuring a delectable array of dishes
            crafted with the finest ingredients and culinary expertise. Our
            mission is to satisfy your cravings and elevate your dining
            experience, one delicious meal at a time.
          </p>
          <button className="text-sm focus:outline-none md:text-base lg:text-lg border bg-gray-200 text-gray-500 font-semibold py-2.5 rounded-3xl px-7">
            <Link
              activeClass="active"
              to="menu"
              spy={true}
              smooth={true}
              offset={-120}
              duration={500}
            >
              View Menu
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
