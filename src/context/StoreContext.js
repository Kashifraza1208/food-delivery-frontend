import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const StoreContext = createContext();

export const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
  const [isZoom, setIsZoom] = useState(false);
  const [token, setToken] = useState("");
  const url = "https://food-delivery-backend-464e.onrender.com";

  const [food_list, setFoodList] = useState([]);

  const addToCart = async (itemId) => {
    setIsZoom(true);
    if (!cartItems[itemId]) {
      setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
    } else {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }
    console.log(token, "token");
    if (token) {
      await axios.post(
        `${url}/api/v1/cart/add`,
        { itemId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    }
  };

  async function loadData() {
    const response = await axios.get(`${url}/api/v1/food/lists`);
    setFoodList(response.data.foods);
    if (localStorage.getItem("token")) {
      setToken(localStorage.getItem("token"));
    }
  }

  const loadCartData = async (token) => {
    const response = await axios.post(
      `${url}/api/v1/cart/get`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    setCartItems(response.data.cartData);
  };

  const removeFromCart = async (itemId) => {
    loadData();
    setCartItems((prev) => {
      const updatedCart = { ...prev };

      if (updatedCart[itemId] > 1) {
        updatedCart[itemId] -= 1;
      } else {
        delete updatedCart[itemId];
      }

      return updatedCart;
    });

    if (token) {
      await axios.post(
        `${url}/api/v1/cart/remove`,
        { itemId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    }
  };

  const getTotalCartAmount = () => {
    let total = 0;
    for (let item in cartItems) {
      try {
        if (cartItems[item] > 0) {
          const filterData = food_list.find((product) => product._id === item);
          total += filterData.price * cartItems[item];
        }
      } catch (error) {
        console.log("kashif");
      }
    }
    return total;
  };

  useEffect(() => {
    console.log(cartItems);
  }, [cartItems]);

  useEffect(() => {
    loadData();

    const fetchData = async () => {
      await loadCartData(localStorage.getItem("token"));
    };
    fetchData();
  }, []);

  const contextValue = {
    food_list,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    isZoom,
    token,
    setToken,
    url,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};
