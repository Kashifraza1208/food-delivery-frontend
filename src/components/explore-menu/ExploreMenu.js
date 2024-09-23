import React from "react";
import { menu_list } from "../../assets/assets";
import { FadeIn } from "../FadeIn";

const ExploreMenu = ({ category, setCategory }) => {
  return (
    <FadeIn>
      <div
        id="menu"
        className=" flex flex-col mt-10  gap-5 px-6 md:px-12 lg:px-16  max-w-7xl mx-auto"
      >
        <h1 className="text-3xl md:text-4xl font-bold">Explore our menu</h1>

        <p className=" text-base text-left md:text-xl">
          Choose from a diverse menu featuring a delectable array of dishes. Our
          mission is to satisfy your aravings and aelevate your dining
          experience, and delicious meal at a time.
        </p>
        <div className="flex items-center sidebar-scroll  justify-between gap-9  my-5">
          {menu_list.map((item) => {
            return (
              <div
                key={item.id}
                className="explore-explore-menu-list-item"
                onClick={() =>
                  setCategory((prev) =>
                    prev === item.menu_name ? "All" : item.menu_name
                  )
                }
              >
                <img
                  src={item.menu_image}
                  className={`${
                    category === item.menu_name ? "active" : ""
                  }   rounded-full w-44 cursor-pointer min-w-20`}
                  alt=""
                />
                <p className="text-center mt-3 text-gray-500 font-medium">
                  {item.menu_name}
                </p>
              </div>
            );
          })}
        </div>
        <hr className="border border-b-gray-400" />
      </div>
    </FadeIn>
  );
};

export default ExploreMenu;
