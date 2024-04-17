import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchAllUsers } from "../../Action/Users";
import EditProfile from "./EditProfile";
import "./UserProfile.css";
import LeftSideBar from "../../Components/LeftSideBar/LeftSideBar";
import moment from "moment";

function UserProfile({ slideIn, handleSlideIn, isNight}) {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [isEditingProfile, setIsEditingProfile] = useState(false);

  useEffect(() => {
    dispatch(fetchAllUsers());
  }, [dispatch]);

  const user = useSelector((state) => state.usersReducer);
  const currentProfile = user.data?.find((user) => user._id === id);
  const currentUser = useSelector((state) => state.currentUserReducer);
  const currentUserId = currentUser?.stackUser?._id;
  // console.log(currentProfile);
  const updateUserProfile = () => {
    setIsEditingProfile((prevEditing) => !prevEditing);
  };
  console.log("I am Form Navbar ", user.data);


  return (
    <div className="user_profile">
      <div className="LEFT_SIDE_BAR">
        <LeftSideBar slideIn={slideIn} handleSlideIn={handleSlideIn} />
      </div>
      {currentProfile ? (
        <>
          <div className="user_profile_details" style={{ backgroundColor: isNight ? '#060A13' : '',  color: isNight ? 'white' : '' 
  }}>
            <div className="user_profile_names" style={{height:currentProfile?.imageData?"10rem": ""}}>
              {currentProfile?.imageData?(
                <div className="user_first_image"><img src={currentProfile?.imageData} alt="" /></div>
                
              ):(
                <div className="user_first_character">{currentProfile.name.charAt(0).toUpperCase()}</div>
              )}
             
              <div className="user_profile_name">
                <span>
                  <h3>{currentProfile.name}</h3>
                  <span className="join_date_with-cake">
                    <img src="" alt="" />
                    <p>asked {moment(currentProfile.joinedOn).fromNow()}</p>
                  </span>
                </span>
              </div>
            </div>

            <div className="user_tags">
              <h3>Tags Watched</h3>
              {currentProfile.tags.length === 0 ? (
                <p>0 Tags Watched</p>
              ) : Array.isArray(currentProfile.tags) ? (
                currentProfile?.tags.map((tag, index) => (
                  <div className="user_tags" key={index}>
                    <p>{tag}</p>
                  </div>
                ))
              ) : (
                <p>No data</p>
              )}
            </div>

            <div>
              {currentProfile.about ? (
                <span>
                  <h3>About</h3>
                  <p>{currentProfile.about}</p>
                </span>
              ) : (
                <p>No bio found</p>
              )}
            </div>
            <div className="import_edit_profile_section" >
              {isEditingProfile && (
                <EditProfile userId={id} userProfile={currentProfile} />
              )}
            </div>
          </div>

          <div className="edit_profilebtn" style={{ backgroundColor: isNight ? '#060A13' : '',  color: isNight ? 'white' : '' 
  }}>
            {currentUserId === id ? (
              <button onClick={updateUserProfile}>
                {isEditingProfile ? "Cancel Edit" : "Edit Profile"}
              </button>
            ) : null}
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default UserProfile;
