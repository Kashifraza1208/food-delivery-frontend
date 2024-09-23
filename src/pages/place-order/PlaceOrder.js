import React, { useContext, useEffect, useState } from "react";

import { assets } from "../../assets/assets";
import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
import axios from "axios";
import { StoreContext } from "../../context/StoreContext";
import toast from "react-hot-toast";

const PlaceOrder = () => {
  const [payment, setPayment] = useState("cod");
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const {
    getTotalCartAmount,
    token,
    food_list,
    cartItems,
    url,
    setCartItems,
    // currency,
    // deliveryCharge,
  } = useContext(StoreContext);
  const navigate = useNavigate();

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  const placeOrder = async (e) => {
    e.preventDefault();
    let orderItems = [];
    if (food_list) {
      food_list.map((item) => {
        if (cartItems[item._id] > 0) {
          let itemInfo = item;
          itemInfo["quantity"] = cartItems[item._id];
          orderItems.push(itemInfo);
        }
      });
    }
    let orderData = {
      address: data,
      items: orderItems,
      amount: getTotalCartAmount() + 2,
    };
    try {
      const response = await axios.post(
        `${url}/api/v1/order/place`,
        orderData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.success) {
        const { session_url } = response.data;
        window.location.replace(session_url);
      }
      console.log(response, "kashif");
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  useEffect(() => {
    if (!token) {
      toast.error("To place an order, sign in first");
      navigate("/cart");
    } else if (getTotalCartAmount() === 0) {
      toast.error("To place an order, please add items first.");
      navigate("/cart");
    }
  }, [token]);

  return (
    <div className="bg-gray-100">
      <div className="max-w-7xl min-h-screen mx-auto px-6 md:px-12 lg:px-16 ">
        <form
          onSubmit={placeOrder}
          className="grid grid-cols-1 md:grid-cols-3 py-5 md:py-12 md:gap-5"
        >
          <div className="md:col-span-2 bg-sky-50 px-5 md:px-24 py-10">
            <p className="text-2xl font-bold mb-5">Delivery Information</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <input
                type="text"
                name="firstName"
                onChange={onChangeHandler}
                value={data.firstName}
                placeholder="First name"
                required
                className="w-full  p-2.5 border placeholder:text-gray-500 border-gray-300 rounded-lg"
              />
              <input
                type="text"
                name="lastName"
                onChange={onChangeHandler}
                value={data.lastName}
                placeholder="Last name"
                required
                className="w-full p-2.5 border placeholder:text-gray-500 border-gray-300 rounded-lg"
              />
            </div>
            <input
              type="email"
              name="email"
              onChange={onChangeHandler}
              value={data.email}
              placeholder="Email address"
              required
              className="w-full mb-4 p-2.5 border placeholder:text-gray-500 border-gray-300 rounded-lg"
            />
            <input
              type="text"
              name="street"
              onChange={onChangeHandler}
              value={data.street}
              placeholder="Street"
              required
              className="w-full mb-4 p-2.5 border placeholder:text-gray-500 border-gray-300 rounded-lg"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <input
                type="text"
                name="city"
                onChange={onChangeHandler}
                value={data.city}
                placeholder="City"
                required
                className="w-full p-2.5 border placeholder:text-gray-500 border-gray-300 rounded-lg"
              />
              <input
                type="text"
                name="state"
                onChange={onChangeHandler}
                value={data.state}
                placeholder="State"
                required
                className="w-full p-2.5 border placeholder:text-gray-500 border-gray-300 rounded-lg"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <input
                type="text"
                name="zipcode"
                onChange={onChangeHandler}
                value={data.zipcode}
                placeholder="Zip code"
                required
                className="w-full p-2.5 border placeholder:text-gray-500 border-gray-300 rounded-lg"
              />
              <input
                type="text"
                name="country"
                onChange={onChangeHandler}
                value={data.country}
                placeholder="Country"
                required
                className="w-full p-2.5 border placeholder:text-gray-500 border-gray-300 rounded-lg"
              />
            </div>
            <input
              type="text"
              name="phone"
              onChange={onChangeHandler}
              value={data.phone}
              placeholder="Phone"
              required
              className="w-full p-2.5 border placeholder:text-gray-500 border-gray-300 rounded-lg"
            />
          </div>
          <div className=" bg-white py-10 px-5 md:px-10">
            <div className="mb-8">
              <h2 className="text-xl font-bold mb-4">Cart Totals</h2>
              <div>
                <div className="flex justify-between mb-2">
                  <p>Subtotal</p>
                  <p>${getTotalCartAmount()}</p>
                </div>
                <hr className="mb-2" />
                <div className="flex justify-between mb-2">
                  <p>Delivery Fee</p>
                  <p> ${getTotalCartAmount() === 0 ? 0 : 6}</p>
                </div>
                <hr className="mb-2" />
                <div className="flex justify-between">
                  <b>Total</b>
                  <b>
                    ${getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 6}
                  </b>
                </div>
              </div>
            </div>
            {/* <div className="flex flex-col gap-4">
              <h2 className="text-xl font-semibold">Payment Method</h2>
              <div
                onClick={() => setPayment("cod")}
                className="flex items-center gap-4 border border-purple-500 p-4 rounded-lg cursor-pointer hover:bg-purple-300"
              >
                <img
              src={payment === "cod" ? assets.checked : assets.un_checked}
              alt="COD"
            />
                <p>COD ( Cash on delivery )</p>
              </div>
              <div
                onClick={() => setPayment("stripe")}
                className="flex items-center gap-4 border border-purple-500 p-4 rounded-lg cursor-pointer hover:bg-purple-300"
              >
                <img
              src={payment === "stripe" ? assets.checked : assets.un_checked}
              alt="Stripe"
            />
                <p>Stripe ( Credit / Debit )</p>
              </div>
            </div> */}
            <button className="mt-12 font-semibold w-full bg-red-600 text-white py-3 rounded-lg cursor-pointer">
              {payment === "cod" ? "Place Order" : "Proceed To Payment"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PlaceOrder;
