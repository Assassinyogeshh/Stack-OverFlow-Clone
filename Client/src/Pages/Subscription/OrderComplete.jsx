import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
const OrderComplete = ({isNight}) => {
  const [searchParams] = useSearchParams();

  const referenceNum = searchParams.get("reference");

  const details = searchParams.get("orderDetails");
  const data = JSON.parse(details);

  const planPrice = data?.amount / 100;

  const plan =
    planPrice === 99
      ? "Silver"
      : planPrice === 199
      ? "Gold"
      : planPrice === 299
      ? "Platinum"
      : "Free";

  const userId = searchParams.get("UserID");
  useEffect(() => {
    const subscriptionData = async () => {
      console.log("getting data", plan, userId);
      try {
        await axios.post("http://localhost:3000/Questions/subscriptionData", {
          plan,
          userId,
        });
      } catch (error) {
        console.log(error);
      }
    };
    subscriptionData();
  }, [plan, userId]);

  return (
    <>
      <div
        className="status"
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          width: "100vw",
          backgroundColor: isNight ? '#060A13' : '',  color: isNight ? 'white' : '' 
        }}
      >
        <h3>Order Successful</h3>
        <span
          style={{
            display: "flex",
            columnGap: "0.5rem",
            justifyContent: "center",
          }}
        >
          <p>Reference No-</p>
          <p>{referenceNum}</p>
        </span>
      </div>
    </>
  );
};

export default OrderComplete;
