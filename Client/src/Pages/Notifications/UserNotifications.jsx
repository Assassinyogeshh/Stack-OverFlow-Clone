import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import './UserNotifications.css'
const UserNotifications = ({isNight}) => {

 const [notification, setNotification]= useState([]);   
 const user = useSelector((state) => state.currentUserReducer);
 useEffect(()=>{
    async function loadNotification(){
    const apiUrl='http://localhost:3000'
     const response= await fetch(`${apiUrl}/Questions/stackNotification`);
           const data= await response.json()
        //    console.log(data.notification);
setNotification(data.notification)

    }
    loadNotification()
 },[]);  
 
  return (
    <>
    <div style={{backgroundColor:isNight? "#060A13":"white", color:isNight? "white": ""}}>

    
            <h1>Notifications</h1>
        <div className="showNotification">
    { notification && notification.length>0 && user ?(
        
        notification.map((notify, index)=>(
            <div className="notification" key={index}>
        <p>New Question Posted By Check It Now {notify.newUserPost.userPostedBy}</p>
        <p> And The Post Question is {notify.newUserPost.questionTitle}</p>
        </div>
        
        ))) :(<h1>No Notification</h1>)}
        </div>
        </div>
   </>
      
  )
}

export default UserNotifications
