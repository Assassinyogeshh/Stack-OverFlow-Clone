import React from 'react'
import { useSelector } from "react-redux";
import './UserHistory.css'
import LeftSideBar from '../../Components/LeftSideBar/LeftSideBar';
const UserHistory = ({ slideIn, handleSlideIn, isNight }) => {

    const user = useSelector((state) => state.currentUserReducer)
    const loginHistory= user?.stackUser.userLoginHistory

    console.log(loginHistory);

  return (
   <>
       <div className="tags_page">
   <div className="LEFT_SIDE_BAR" > 
    <LeftSideBar slideIn={slideIn} handleSlideIn={handleSlideIn} />
      </div>
   <div className="showHistory" style={{backgroundColor:isNight?"#060A13":"White", color:isNight?"white":"black"}}>
      <ul>
    <h1>History</h1>
        {loginHistory && loginHistory.map((item, index)=>(
              <li className='history' key={index}>
                <p>Browser:{item.browser}</p>
                <p>Device:{item.deviceType}</p>
                <p>OS:{item.os}</p>
                <p>Time: {new Date(item.timestamp).toLocaleString()}</p>
              </li>
        ))}

      </ul>
   </div>
   </div>
   </>
  )
}

export default UserHistory
