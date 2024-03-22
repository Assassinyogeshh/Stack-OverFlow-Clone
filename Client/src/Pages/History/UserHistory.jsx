import React from 'react'
import { useSelector } from "react-redux";
import './UserHistory.css'
const UserHistory = () => {

    const user = useSelector((state) => state.currentUserReducer)
    const loginHistory= user?.stackUser.userLoginHistory

    console.log(loginHistory);

  return (
   <>
   <div className="showHistory">
    <h1>History</h1>
      <ul>
        {loginHistory && loginHistory.map((item, index)=>(
              <li className='history' key={index}>
                <p>Browser:{item.browser}</p>
                <p>Device:{item.deviceType}</p>
                <p>OS:{item.os}</p>
                <p>Time:{item.timestamp}</p>
              </li>
        ))}
      </ul>
   </div>
   </>
  )
}

export default UserHistory
