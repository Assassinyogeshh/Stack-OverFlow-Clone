import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchAllUsers } from '../../Action/Users';
import './User.css'
import LeftSideBar from '../../Components/LeftSideBar/LeftSideBar';
import { Link } from 'react-router-dom';


function User({ slideIn, handleSlideIn, isNight}) {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchAllUsers())
  }, [dispatch])

  const user = useSelector((state) => state.usersReducer)


  return (
    <>
      <div className="users_Page">
      <div className="LEFT_SIDE_BAR">
        <LeftSideBar slideIn={slideIn} handleSlideIn={handleSlideIn} />
      </div>

        <div className="all_users" style={{ backgroundColor: isNight ? '#060A13' : '',  color: isNight ? 'white' : '' 
  }}>

          <h1>Users</h1>
          <div className="stack_users">
            {Array.isArray(user.data) ? (

              user.data.map((users, index) => (
                <div className="users"  key={index}>
                  <Link className='remove_users_link_style' to={`/user/updateProfile/${users._id}`}>
                    <h3>{users.name.charAt(0).toUpperCase()}</h3>
                    <h5>{users.name}</h5>
                  </Link>
                </div>
              ))


            ) : (<p>no data available </p>)}
          </div>

        </div>

      </div>
    </>
  )
}

export default User