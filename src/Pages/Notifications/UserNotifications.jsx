import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import './UserNotifications.css'
const UserNotifications = ({isNight}) => {

 const [notification, setNotification]= useState([]);   
 const user = useSelector((state) => state.currentUserReducer);
 useEffect(()=>{
    async function loadNotification(){
        
  const apiUrl= "https://stack-overflow-clone-0jhm.onrender.com"

     const response= await fetch(`${apiUrl}/Questions/stackNotification`);
           const data= await response.json()
          //  console.log(data);
          //  console.log(data[0].notification[0]);
setNotification(data)

    }
    loadNotification()
 },[]);  


  return (
    <>
    <div style={{backgroundColor:isNight? "#060A13":"white", color:isNight? "white": ""}}>

    
            <h1>Notifications</h1>
        <div className="showNotification">
    { notification && notification.length>0 && user ?(

        notification.map((notify)=>(
        notify.notification.map((notifyData, index)=>(

          <div className="notification" key={index}>
          <p>New Question Posted By <mark> {notifyData.newUserPost.questionTitle}</mark>  Check It Now </p>
          <p> And The Post Question is : <mark> {notifyData.newUserPost.userPostedBy} </mark> </p>
          </div>
        ))
        
        ))) :(<h1>No Notification</h1>)}
        </div>
        </div>
   </>
      
  )
}

export default UserNotifications
