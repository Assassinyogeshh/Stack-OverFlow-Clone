import React, { useEffect, useState } from "react";
import "./LeftSideBar.css";
import { Link, useLocation } from "react-router-dom";
function LeftSideBar({ slideIn, handleSlideIn }) {
  const location = useLocation();

  const profileString = localStorage.getItem("Profile");
  const profile = JSON.parse(profileString);
  const userId = profile?.stackUser._id;

  console.log(userId);

  const slideInStyle = {
    transform: "translateX(0%)",
  };

  const slideOutStyle = {
    transform: "translateX(-100%)",
  };


  const [isNightL, setIsNightL] = useState(false);

  useEffect(() => {
    const currentTime = new Date().getHours();
    setIsNightL(currentTime < 6 || currentTime >= 18); 
  }, []);

  return (
    <>
      <div
        className="left_container_side"
        style={{
          ...(slideIn ? slideInStyle : slideOutStyle),
          backgroundColor: isNightL ? "#060A13" : "white",
          color: isNightL ? "white" : " "  
        }}
      >
        <ul className="left_side_list">
          <li onClick={() => handleSlideIn()}>
            <Link
              to={"/"}
              className={`remove_left_link_style ${
                location.pathname === "/" ? "active" : ""
              }`}
            >
              <p>Home</p>
            </Link>
          </li>
        </ul>

        <span className="Public_Span">Public</span>
        <ul className="public_lists">
          <li onClick={() => handleSlideIn()}>
            <div className="Question_with_img">
              <img src="/Question_Side_img.svg" alt="" />
              <Link
                className={`remove_left_link_style adjust_img ${
                  location.pathname === "/Questions/fetchAllQuestions"
                    ? "active"
                    : ""
                }`}
                to={`/Questions/fetchAllQuestions`}
              >
                <p>Questions</p>
              </Link>
            </div>
          </li>
          <li onClick={() => handleSlideIn()}>
            <Link
              className={`remove_left_link_style ${
                location.pathname === "/Tags" ? "active" : ""
              }`}
              to={"/Tags"}
            >
              <p>Tags</p>
            </Link>
          </li>
          <li onClick={() => handleSlideIn()}>
            <Link
              className={`remove_left_link_style ${
                location.pathname === "/user/getAllUsers" ? "active" : ""
              }`}
              to={"/user/getAllUsers"}
            >
              <p>Users</p>
            </Link>
          </li>
          <li onClick={() => handleSlideIn()}>
            <Link
              className={`remove_left_link_style ${
                location.pathname === `/UserPlan/${userId}` ? "active" : ""
              }`}
              to={`/UserPlan/${userId}`}
            >
              <p>Subscription</p>
            </Link>
          </li>
          <li onClick={() => handleSlideIn()}>
            <Link
              className={`remove_left_link_style ${
                location.pathname === `/UserHistory/${userId}` ? "active" : ""
              }`}
              to={`/UserHistory/${userId}`}
            >
              <p>History</p>
            </Link>
          </li>
          <li onClick={() => handleSlideIn()}>
            <Link
              className={`remove_left_link_style ${
                location.pathname === `/userLocation` ? "active" : ""
              }`}
              to={`/userLocation`}
            >
              <p>Location</p>
            </Link>
          </li>
          <li onClick={() => handleSlideIn()}>
            <Link
              className={`remove_left_link_style ${
                location.pathname === `/publicPage/${userId}` ? "active" : ""
              }`}
              to={`/publicPage/${userId}`}
            >
              <p>Public Place</p>
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
}

export default LeftSideBar;
