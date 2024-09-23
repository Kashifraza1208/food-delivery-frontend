import React, { useContext } from "react";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../context/StoreContext";

const FoodItem = ({ image, name, price, desc, id }) => {
  const { cartItems, addToCart, removeFromCart, url } =
    useContext(StoreContext);
  return (
    <div className="w-full mx-auto rounded-xl shadow-lg transition-transform duration-300 hover:scale-105 animate-fadeIn">
      <div className="relative">
        <img
          className="w-full rounded-t-xl"
          src={`${url}/images/${image}`}
          alt=""
        />
        {!cartItems[id] ? (
          <img
            className="w-9 absolute bottom-4 right-4 cursor-pointer rounded-full hover:border-2 hover:border-[#FF4C24]"
            onClick={() => addToCart(id)}
            src={assets.add_icon_white}
            alt="Add"
          />
        ) : (
          <div className="absolute bottom-4 right-4 flex items-center gap-2 p-1 rounded-full bg-white">
            <img
              className="w-7 cursor-pointer"
              src={assets.remove_icon_red}
              onClick={() => removeFromCart(id)}
              alt="Remove"
            />
            <p>{cartItems[id]}</p>
            <img
              className="w-7 cursor-pointer"
              src={assets.add_icon_green}
              onClick={() => addToCart(id)}
              alt="Add"
            />
          </div>
        )}
      </div>
      <div className="p-5">
        <div className="flex justify-between items-center mb-2">
          <p className="text-lg font-medium">{name}</p>
          <img className="w-16" src={assets.rating_starts} alt="Rating" />
        </div>
        <p className="text-gray-600 text-sm">{desc}</p>
        <p className="text-[#FF4C24] text-2xl font-medium my-2">${price}</p>
      </div>
    </div>
  );
};

export default FoodItem;
