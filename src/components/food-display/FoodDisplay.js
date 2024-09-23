import React, { useContext } from "react";
import { StoreContext } from "../../context/StoreContext";
import FoodItem from "../food-item/FoodItem";
import { FadeIn } from "../FadeIn";

const FoodDisplay = ({ category }) => {
  const { food_list } = useContext(StoreContext);

  return (
    <FadeIn>
      <div
        id="food-dispaly"
        className="mt-7 px-6 md:px-12 lg:px-16  max-w-7xl mx-auto"
      >
        <h1 className="text-3xl md:text-4xl font-bold">Top dishes near you</h1>

        <div
          className="grid  mt-8 gap-7"
          style={{
            rowGap: "50px",
            gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
          }}
        >
          {food_list.map((item, index) => {
            if (category === "All" || category === item.category) {
              return (
                <FoodItem
                  key={index}
                  image={item.image}
                  name={item.name}
                  desc={item.description}
                  price={item.price}
                  id={item._id}
                />
              );
            }
          })}
        </div>
      </div>
    </FadeIn>
  );
};

export default FoodDisplay;
