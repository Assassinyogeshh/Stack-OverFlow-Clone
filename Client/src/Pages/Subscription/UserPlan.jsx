import React from 'react';
import './UserPlan.css';
import { Link, useParams} from 'react-router-dom'; 
import { useDispatch } from 'react-redux';
import { userCheckOut } from '../../Action/UsersQuestion';
import axios from 'axios';

function UserPlan({isNight}) {

  const dispatch= useDispatch();
  const {id:userId}= useParams();

    const checkoutHandler = async (amount, plan) => {
 
      try {
        const response= dispatch(userCheckOut(amount, plan))
        console.log(response);
      } catch (error) {
        console.log(error);
      }

    }

    const addFreePlan= async ()=>{
      const plan= 'Silver'
      console.log("getting id",userId)
         try {
            await axios.post("http://localhost:3000/Questions/subscriptionData", {
              plan,
              userId,
            });
          } catch (error) {
            console.log(error);
          }

    }

    
  return (
    <>
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
    </>
  );
}

export default UserPlan;
