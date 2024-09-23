import React, { useContext, useState } from "react";
import { assets } from "../../assets/assets";
import toast from "react-hot-toast";
import axios from "axios";

import { StoreContext } from "../../context/StoreContext";

const LoginPopup = ({ setShowLogin }) => {
  const { setToken, url, loadCartData } = useContext(StoreContext);
  const [currState, setCurrState] = useState("Sign Up");

  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  const onLogin = async (e) => {
    e.preventDefault();
    let new_url;
    try {
      if (currState === "Login") {
        new_url = "/api/v1/user/login";
      } else {
        new_url = "/api/v1/user/register";
      }
      const response = await axios.post(new_url, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.data.success) {
        toast.success(response.data.message);
        setToken(response.data.token);
        localStorage.setItem("token", response.data.token);
        // loadCartData({ token: response.data.token });
        setShowLogin(false);
      } else {
        toast.error(response?.data?.message);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-70 top-20">
      <form
        onSubmit={onLogin}
        className="bg-white mt-5 p-8 rounded-lg shadow-lg w-full max-w-sm mx-auto space-y-6"
      >
        <div className="flex justify-between items-center text-gray-700">
          <h2 className="text-xl font-bold">{currState}</h2>
          <img
            onClick={() => setShowLogin(false)}
            src={assets.cross_icon}
            alt="close"
            className="w-4 cursor-pointer"
          />
        </div>
        <div className="space-y-4">
          {currState === "Sign Up" && (
            <input
              name="name"
              onChange={onChangeHandler}
              value={data.name}
              type="text"
              placeholder="Your name"
              className="w-full px-4 py-2 border rounded-md outline-none focus:border-gray-500"
              required
            />
          )}
          <input
            name="email"
            onChange={onChangeHandler}
            value={data.email}
            type="email"
            placeholder="Your email"
            className="w-full px-4 py-2 border rounded-md outline-none focus:border-gray-500"
            required
          />
          <input
            name="password"
            onChange={onChangeHandler}
            value={data.password}
            type="password"
            placeholder="Password"
            className="w-full px-4 py-2 border rounded-md outline-none focus:border-gray-500"
            required
          />
        </div>
        <button className="w-full py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition">
          {currState === "Login" ? "Login" : "Create account"}
        </button>
        <div className="flex items-start space-x-2">
          <input type="checkbox" required className="mt-1" />
          <p className="text-sm">
            By continuing, I agree to the{" "}
            <a href="#" className="text-purple-600 underline">
              terms of use
            </a>{" "}
            &{" "}
            <a href="#" className="text-purple-600 underline">
              privacy policy
            </a>
            .
          </p>
        </div>
        {currState === "Login" ? (
          <p>
            Create a new account?{" "}
            <span
              onClick={() => setCurrState("Sign Up")}
              className="text-purple-600 font-semibold cursor-pointer"
            >
              Click here
            </span>
          </p>
        ) : (
          <p>
            Already have an account?{" "}
            <span
              onClick={() => setCurrState("Login")}
              className="text-purple-600 font-semibold cursor-pointer"
            >
              Login here
            </span>
          </p>
        )}
      </form>
    </div>
  );
};

export default LoginPopup;
