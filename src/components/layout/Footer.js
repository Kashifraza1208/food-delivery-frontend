import React from "react";
import { assets } from "../../assets/assets";

const Footer = () => {
  return (
    <footer id="contact" className="bg-black">
      <div className="text-[#D9D9D9] max-w-7xl mx-auto flex flex-col items-center gap-5 py-5">
        <div className="w-full px-6 md:px-12 lg:px-16 grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-9 py-5">
          {/* Company Info */}
          <div className="flex flex-col items-start gap-5">
            {" "}
            <h1 className="text-3xl font-bold text-[#00df9a]">Restaurant</h1>
            <p>
              Welcome to our restaurant! We serve delicious, fresh dishes made
              from the finest ingredients. Enjoy a cozy dining experience with
              us.
            </p>
            {/* Social Media Links */}
            <div className="flex gap-4">
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src={assets.facebook_icon}
                  alt="Facebook"
                  className="w-10"
                />
              </a>
              <a
                href="https://www.twitter.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={assets.twitter_icon} alt="Twitter" className="w-10" />
              </a>
              <a
                href="https://www.linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src={assets.linkedin_icon}
                  alt="LinkedIn"
                  className="w-10"
                />
              </a>
            </div>
          </div>

          {/* Company Links */}
          <div className="flex flex-col md:ms-28 items-start gap-5">
            <h2 className="text-white">COMPANY</h2>
            <ul>
              <li className="mb-2 cursor-pointer">Home</li>
              <li className="mb-2 cursor-pointer">About us</li>
              <li className="mb-2 cursor-pointer">Delivery</li>
              <li className="mb-2 cursor-pointer">Privacy policy</li>
            </ul>
          </div>

          {/* Contact Information */}
          <div className="flex flex-col items-start gap-5">
            <h2 className="text-white">GET IN TOUCH</h2>
            <ul>
              <li className="mb-2">+9185410044400</li>
              <li className="mb-2">kashifrazasonbarsa@gmail.com</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="bg-slate-900 p-6 text-center text-gray-400">
        <p className="text-center">
          Copyright 2024 © Md Kashif Raza - All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
