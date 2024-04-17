import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ForgetPassword = ({ isNight }) => {
  const [formData, setFormData] = useState({
    email: "",
    newPassword: "",
    newConfirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { email, newPassword, newConfirmPassword } = formData;

    console.log(email, newPassword, newConfirmPassword);
    try {
      // Send request to backend to initiate password reset
  const apiUrl= "https://stack-overflow-clone-0jhm.onrender.com"

      const response = await axios.post(
        `${apiUrl}/user/forgetPassword`,
        { email, newPassword, newConfirmPassword }
      );

      console.log(response.data);
      if (response.data) {
        alert(response.data);
        navigate("/user/login");
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <>
      <div
        className="auth_user"
        style={{
          backgroundColor: isNight ? "#060A13" : "",
          color: isNight ? "white" : " ",
        }}
      >
        <span className="stack_logo_img">
          <img src="/stack_logo.png" alt="stack logo" />
        </span>
        <div
          className="loginBox"
          style={{ background: isNight ? "none" : "white" }}
        >
          <form className="Login_Page" onSubmit={handleSubmit}>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              autoComplete="off"
            />

            <label htmlFor="password">Password:</label>
            <input
              type="password"
              name="newPassword"
              id="password"
              value={formData.newPassword}
              onChange={handleChange}
              required
              autoComplete="off"
            />

            <label htmlFor="Cpassword">Confirm Password:</label>
            <input
              type="password"
              name="newConfirmPassword"
              id="Cpassword"
              value={formData.newConfirmPassword}
              onChange={handleChange}
              required
              autoComplete="off"
            />

            <button type="submit" className="submitBtn">
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ForgetPassword;
