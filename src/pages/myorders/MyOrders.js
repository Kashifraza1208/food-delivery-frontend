import React, { useContext, useEffect, useState } from "react";
import axios from "axios";

import { assets } from "../../assets/assets";
import { StoreContext } from "../../context/StoreContext";
import { Link } from "react-router-dom";

const MyOrders = ({ setShowLogin }) => {
  const [orderData, setData] = useState([]);
  const { token, url } = useContext(StoreContext);

  const fetchOrders = async () => {
    const response = await axios.post(
      `${url}/api/v1/order/userOrder`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    let reverseData = response.data.orders;

    setData([...reverseData].reverse());
  };

  useEffect(() => {
    if (token) {
      fetchOrders();
    }
  }, [token]);

  const getStatusColor = (status) => {
    switch (status) {
      case "Food Processing":
        return "text-red-500"; // Tailwind class for red text
      case "Out For Delivery":
        return "text-blue-500"; // Tailwind class for blue text
      case "Delivered":
        return "text-green-500"; // Tailwind class for green text
      default:
        return "text-gray-500"; // Default color if status doesn't match
    }
  };

  return (
    <div className="my-12 min-h-screen">
      <h2 className="text-2xl font-semibold md:text-3xl text-center">
        My Orders
      </h2>
      <div className="flex max-w-7xl mx-auto flex-col gap-5 mt-8 px-6 md:px-12 lg:px-16">
        {orderData &&
          orderData.map((order, index) => (
            <div
              key={index}
              className="grid grid-cols-3 md:grid-cols-6 items-center gap-8 md:gap-4 text-sm md:text-xs p-4 border border-purple-600"
            >
              <img src={assets.parcel_icon} alt="" className="md:w-12 w-7" />
              <p className="text-base md:text-lg">
                {order.items.map((item, idx) =>
                  idx === order.items.length - 1
                    ? `${item.name} x ${item.quantity}`
                    : `${item.name} x ${item.quantity}, `
                )}
              </p>
              <p className="text-base md:text-lg">${order.amount}.00</p>
              <p className="text-base md:text-lg">
                Items: {order.items.length}
              </p>
              <p>
                <span className={`${getStatusColor(order.status)} text-base`}>
                  &#x25cf;
                </span>{" "}
                <b
                  className={`font-medium ${getStatusColor(
                    order.status
                  )} uppercase`}
                >
                  {order.status}
                </b>
              </p>
              <button
                className="border-none focus:outline-none py-3 rounded bg-pink-100 text-gray-900 cursor-pointer text-sm"
                onClick={fetchOrders}
              >
                Track Order
              </button>
            </div>
          ))}

        {orderData.length === 0 && (
          <div className="flex gap-7 flex-col items-center justify-center">
            <p className="text-xl text-center">
              No orders found or please log in to see order details
            </p>
            <Link
              onClick={() => setShowLogin(true)}
              to="#"
              className=" bg-black py-2 px-7 no-underline text-white"
            >
              Go to Login
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyOrders;
