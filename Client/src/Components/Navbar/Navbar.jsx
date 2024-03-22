import React, { useEffect } from "react";
import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { currentUser } from "../../Action/CurrentUser";
import decode from "jwt-decode";
function Navbar({ handleSlideIn, isNight }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.currentUserReducer);

  console.log("I am Form Navbar ", user);

  const handleLogOut = () => {
    dispatch({ type: "LOGOUT" });
    alert("You have logout Successfully");
    localStorage.removeItem("Profile");
    navigate("/");
    dispatch(currentUser(null));
  };

  useEffect(() => {
    const token = user?.token;

    if (token) {
      const decodeToken = decode(token);
      if (decodeToken.exp * 1000 < new Date().getTime()) {
        handleLogOut();
      }
    }

    dispatch(currentUser(JSON.parse(localStorage.getItem("Profile"))));
  }, [user?.token, dispatch]);

  return (
    <>
      <div
        className="navbar"
        style={{
          backgroundColor: isNight ? "#060A13" : "#f8f9f9",
          color: isNight ? "white" : "",
        }}
      >
        <div className="nav_links">
          <button
            className="hamburger"
            style={{
              backgroundColor: isNight ? "#060A13" : "#f8f9f9",
              color: isNight ? "white" : "",
            }}
            onClick={() => handleSlideIn()}
          >
            <img src="/hamburger.svg" alt="hamburger" width="15" />
          </button>

          <Link to={"/"}>
            <div className="web_log" style={{ cursor: "pointer" }}>
              {isNight ? (
                <img
                  id="stackLogo"
                  src="data:image/png;base64,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 "
                  alt="logo"
                />
              ) : (
                <img src="/stackOverflowLogo.png" alt="logo" />
              )}
            </div>
          </Link>
          <ul className="Links">
            <li>About</li>
            <li>Products</li>
            <li>For Teams</li>
          </ul>

          <div className="auth">
            <input type="search" placeholder="Search" id="searchIcon" />
            <img src="search_icon.svg" alt="" />
            <Link to={"/userNotification"}>
              <img src="/notifybell.png" id="NotifyImg" alt="icon" />
            </Link>
            {user === null ? (
              <Link to={"/user/login"}>
                <button className="btn">Log in</button>
              </Link>
            ) : (
              <>
                {/* className="userWithProfile" */}
                {user?.stackUser?.imageData ? (
                  <Link
                    to={`/user/updateProfile/${user.stackUser._id}`}
                    className="profileWithImg_link"
                  >
                    <img src={user.stackUser.imageData} id="idImg" alt="img" />
                  </Link>
                ) : (
                  <Link
                    to={`/user/updateProfile/${user.stackUser._id}`}
                    className="user_first_char"
                  >
                    <span>{user.stackUser.name.charAt(0).toUpperCase()} </span>
                  </Link>
                )}
                <button className="logout_btn" onClick={handleLogOut}>
                  logout
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
