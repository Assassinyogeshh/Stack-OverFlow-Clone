import React, { useEffect, useState } from "react";
import {Link, useParams} from 'react-router-dom'; 
import axios from "axios";
const OrderComplete = ({isNight}) => {
  const[newOrder, setNewOrder]=useState(null);
  const { id } = useParams();

  const referenceNum = newOrder?.reference;
  const apiUrl= "https://stack-overflow-clone-0jhm.onrender.com"

  const planPrice = newOrder?.orderDetails.amount/100;

  const plan =
    planPrice === 99
      ? "Silver"
      : planPrice === 199
      ? "Gold"
      : planPrice === 1000
      ? "Platinum"
      : "Free";

  const userId = newOrder?.UserId;
  useEffect(() => {
    const subscriptionData = async () => {
      console.log("getting data", plan, userId);
      try {
        await axios.post(`${apiUrl}/Questions/subscriptionData`, {
          plan,
          userId,
        });
      } catch (error) {
        console.log(error);
      }
    };
    subscriptionData();
  }, [plan, userId, newOrder, planPrice]);
  
  useEffect(()=>{

const getUserPlanData=async()=>{
  try {
  
    const response = await fetch(
      `${apiUrl}/Questions/getPaidData/${id}`);
    const data = await response.json();
    console.log("I am created data", data?.userPaidData[0]);

    const newData=data?.userPaidData[0]
 
    setNewOrder(newData)

   

  } catch (error) {
    console.log(error);
  }
}

getUserPlanData()
  },[])


  
  console.log(newOrder?.UserId)
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
          backgroundColor: isNight ? '#060A13' : '',
          color: isNight ? 'white' : ''
        }}
      >
       
          <>
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

           
          </>
      
      </div>
    </>
  );

}

export default OrderComplete;
