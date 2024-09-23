import axios from "axios";
import React, { useContext, useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate, useSearchParams } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";
// import "./Verify.css";

const Verify = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { url } = useContext(StoreContext);
  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");
  const navigate = useNavigate();
  console.log(success, orderId);

  const verifyPayment = async () => {
    try {
      const response = await axios.post(
        `${url}/api/v1/order/verify`,
        {
          success,
          orderId,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response, "d");
      if (response.data.success) {
        toast.success("Payment verified successfully");
        navigate("/myorders");
      } else {
        navigate("/");
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    verifyPayment();
    console.log("object");
  }, []);

  return (
    <button
      type="button"
      className="bg-gray-300 min-h-screen flex items-center justify-center w-full"
      disabled
    >
      <svg
        class="animate-spin -ml-1 mr-3 h-52 w-52 text-white"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          class="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          stroke-width="4"
        ></circle>
        <path
          class="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg>
    </button>
  );
};

export default Verify;
