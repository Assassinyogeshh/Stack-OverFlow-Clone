import React, { useEffect, useState } from 'react';
import './UserPlan.css';
import { Link,useParams, useNavigate } from 'react-router-dom'; 
import { useDispatch } from 'react-redux';
import { userCheckOut } from '../../Action/UsersQuestion';
import axios from 'axios';
import LeftSideBar from '../../Components/LeftSideBar/LeftSideBar';

function UserPlan({ slideIn, handleSlideIn, isNight }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
const [checkPayment, setCheckPayment]= useState();

  const { id } = useParams();
  const apiUrl = "https://stack-overflow-clone-0jhm.onrender.com";

  const checkoutHandler = async (amount, plan) => {
    try {
     dispatch(userCheckOut(amount, plan, navigate, id));

    } catch (error) {
      console.log(error);
    }
  }

  useEffect(()=>{
    const getUserPaidData = async () => {
      try {
       const response= await axios.get(`${apiUrl}/Questions/getPaidData/${id}`)

        const isAmountPaid= response?.data?.userPaidData[0]?.orderDetails?.amount_due;

        setCheckPayment(isAmountPaid);

        if (isAmountPaid===0) {
          alert("Payment Successfully Paid")
          navigate(`/paymentsuccess/${id}`);
        }

      } catch (error) {
        console.log(error);
      }
    };
    getUserPaidData();
  }, [id, checkPayment, navigate])

    const addFreePlan= async ()=>{
      const plan= 'Silver'
      const userId= id
         try {
            await axios.post(`${apiUrl}/Questions/subscriptionData`, {
              plan,
              userId,
            });
          } catch (error) {
            console.log(error);
          }

    }

   
  
  return (
    <>
          <div className="tags_page">
      <div className="LEFT_SIDE_BAR"> 
          <LeftSideBar slideIn={slideIn} handleSlideIn={handleSlideIn} />
        </div>

      <div className="pricing-table" style={{ backgroundColor: isNight ? '#060A13' : ''  }}>
        <div className="ptable-item">
          <div className="ptable-single">
            <div className="ptable-header">
              <div className="ptable-title">
                <h2>Silver</h2>
              </div>
              <div className="ptable-price">
                <h2><small>$</small>0<span>/ M</span></h2>
              </div>
            </div>
            <div className="ptable-body">
              <div className="ptable-description">
                <ul>
                  <li>Pure HTML & CSS</li>
                  <li>Responsive Design</li>
                  <li>Well-commented Code</li>
                  <li>Easy to Use</li>
                </ul>
              </div>
            </div>
            <div className="ptable-footer">
              <div className="ptable-action">
                <Link to={'/'} onClick={addFreePlan}>Free</Link>
              </div>
            </div>
          </div>
        </div>

        <div className="ptable-item featured-item">
          <div className="ptable-single">
            <div className="ptable-header">
              <div className="ptable-status">
                <span>Hot</span>
              </div>
              <div className="ptable-title">
                <h2>Gold</h2>
              </div>
              <div className="ptable-price">
                <h2><small>$</small>199<span>/ M</span></h2>
              </div>
            </div>
            <div className="ptable-body">
              <div className="ptable-description">
                <ul>
                  <li>Pure HTML & CSS</li>
                  <li>Responsive Design</li>
                  <li>Well-commented Code</li>
                  <li>Easy to Use</li>
                </ul>
              </div>
            </div>
            <div className="ptable-footer">
              <div className="ptable-action">
                <Link onClick={()=>checkoutHandler(199, "Gold")} >Buy Now</Link>
              </div>
            </div>
          </div>
        </div>

        <div className="ptable-item">
          <div className="ptable-single">
            <div className="ptable-header">
              <div className="ptable-title">
                <h2>Platinum</h2>
              </div>
              <div className="ptable-price">
                <h2><small>$</small>1000<span>/ LifeTime</span></h2>
              </div>
            </div>
            <div className="ptable-body">
              <div className="ptable-description">
                <ul>
                  <li>Pure HTML & CSS</li>
                  <li>Responsive Design</li>
                  <li>Well-commented Code</li>
                  <li>Easy to Use</li>
                </ul>
              </div>
            </div>
            <div className="ptable-footer">
              <div className="ptable-action">
                <Link onClick={()=>checkoutHandler(1000, "Platinum")} >Buy Now</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
    </>
  );
}

export default UserPlan;
