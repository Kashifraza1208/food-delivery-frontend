import React, { useContext } from "react";

import { useNavigate } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext.js";
import toast from "react-hot-toast";

const Cart = () => {
  const { cartItems, food_list, removeFromCart, getTotalCartAmount } =
    useContext(StoreContext);
  const navigate = useNavigate();

  return (
    <div>
      <div className="my-20 px-6 md:px-12 lg:px-16 max-w-7xl mx-auto min-h-screen">
        <div className="cart-items">
          <div className="grid grid-cols-[1fr_1.5fr_1fr_1fr_1fr_0.5fr] items-center text-gray-500 text-base md:text-lg">
            <p>Items</p>
            <p>Title</p>
            <p>Price</p>
            <p>Quantity</p>
            <p>Total</p>
            <p>Remove</p>
          </div>
          <br />
          <hr className="h-px bg-gray-200 border-none" />
          {food_list &&
            food_list.map((item, index) => {
              const quantity = cartItems[item._id];
              if (quantity > 0) {
                return (
                  <div key={index} className="cart-items-item">
                    <div className="grid grid-cols-[1fr_1.5fr_1fr_1fr_1fr_0.5fr] items-center text-black my-2">
                      <img
                        src={`/images/${item?.image}`}
                        alt=""
                        className="w-12"
                      />
                      <p>{item?.name}</p>
                      <p>${item?.price}</p>
                      <div className="max-w-[40px]  text-center border border-gray-200 p-2 text-base">
                        {quantity}
                      </div>
                      <p>${item?.price * quantity}</p>
                      <p
                        className="cursor-pointer text-lg hover:text-red-600"
                        onClick={() => {
                          removeFromCart(item?._id);
                          toast.success("Removed From Cart");
                        }}
                      >
                        x
                      </p>
                    </div>
                    <hr className="h-px bg-gray-200 border-none" />
                  </div>
                );
              }
            })}
        </div>
        <div className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20">
          <div className=" flex flex-col gap-7">
            <h2 className="text-xl font-semibold">Cart Totals</h2>
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
            <button
              onClick={() => navigate("/order")}
              className="md:w-64 py-3 bg-red-600 text-white rounded cursor-pointer"
            >
              PROCEED TO CHECKOUT
            </button>
          </div>
          <div className="cart-promocode flex-1">
            <p className="text-gray-600 text-base md:text-lg">
              If you have a promo code, enter it here
            </p>
            <div className=" mt-2 flex justify-between border-none items-center outline-none bg-gray-200 rounded">
              <input
                type="text"
                placeholder="Promo code"
                className="bg-transparent focus:outline-none border-none outline-none  pl-2 flex-1"
              />
              <button className="md:w-32 w-28 py-3 bg-black text-white rounded">
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
