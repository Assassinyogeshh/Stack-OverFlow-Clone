import React, { useEffect, useState } from "react";
import "./AskQuestions.css";
import { useFormik } from "formik";
import { askQuestion, checkUserPlanExpiry } from "../../Action/UsersQuestion";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
function AskQuestions({ isNight }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.currentUserReducer);
  const [count, setCount] = useState(0);
  const [plan, setPlan] = useState("Silver");
  const [shareConfig, setShareConfig] = useState(null);
  const [time, setTime] = useState();
  const [checkPlanExpiry, setPlanExpiry] = useState(null);

  const apiUrl = "https://stack-overflow-clone-0jhm.onrender.com";
  const checkingUserPlanExpiry = () => {
    if (plan === "Gold") {
      const storedDate = new Date(checkPlanExpiry);

      const currentDate = new Date();

      const timeDifference = currentDate - storedDate;

      // Calculate one month in milliseconds (30 days for simplicity)
      const oneMonthInMillis = 30 * 24 * 60 * 60 * 1000;

      // Checking if one month has passed
      if (timeDifference >= oneMonthInMillis) {
        console.log("One month has passed since the stored date.");
        dispatch(checkUserPlanExpiry());
        alert("Your Plan Expired ");
        navigate("/");
      } else {
        console.log("One month has not passed yet.");
      }
    }
  };

  useEffect(() => {
    getLastQuestionTime();
  }, [getLastQuestionTime]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const ProfileToken = JSON.parse(localStorage.getItem("Profile"));

        if (!ProfileToken) {
          alert("Sign In Before Subscribe");
          return;
        }

        const token = ProfileToken.token;

        if (!token) {
          throw new Error("Authorization token not found in localStorage");
        }

        const config = {
          headers: {
            Authorization: `Bearer ${token}`, // The token prefix may vary (e.g., Bearer)
            "Content-Type": "application/json", // Set the appropriate content type
          },
        };

        setShareConfig(config);

        const response = await fetch(`${apiUrl}/Questions/userPlan`, config);
        const data = await response.json();
        const checkUserPlan = data?.data[0].trackUserPlan;
        setPlanExpiry(checkUserPlan);
        const newPlan = data?.data[0].planName;
        setPlan(newPlan || plan);
        if (checkUserPlan) {
          checkingUserPlanExpiry();
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  function is24HoursPassed(lastQuestionTime) {
    const now = new Date();
    return now - lastQuestionTime >= 24 * 60 * 60 * 1000;
  }

  async function getLastQuestionTime() {
    try {
      if (shareConfig) {
        const response = await fetch(
          `${apiUrl}/Questions/gettingTime`,
          shareConfig
        );
        if (response.ok) {
          const data1 = await response.json();
          setTime(data1.timeData);
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  // Function to set the last question time in localStorage
  const setLastQuestionTime = async (updatedTime) => {
    try {
      const response = await axios.post(
        `${apiUrl}/Questions/updateQuestionTime`,
        { updatedTime },
        shareConfig
      );
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const handleUserPlan = () => {
    let Silver = 1;
    let Gold = 5;
    if (plan === "Silver") {
      if ((count === 0 && !time) || is24HoursPassed(new Date(time))) 
      {
        setCount(count);
        const updatedTime = new Date().toISOString(); // Update the last question time
        console.log("this is different", updatedTime);
        setLastQuestionTime(updatedTime);
      } else if (count >= 0 || time) {
        setCount((prevCount) => prevCount - Silver);
      }
    } else if (plan === "Gold") {
      if ((count === 0 && !time) || is24HoursPassed(new Date(time))) {
        setCount(Gold - 1);
        const updatedTime = new Date().toISOString(); // Update the last question time
        setLastQuestionTime(updatedTime);
        localStorage.setItem("count", Gold - 1);
      } else if (count >= 0) {
        const getLastCount = parseInt(localStorage.getItem("count"), 10);
        setCount(getLastCount);
        if (count >= 0) {
          setCount((prevCount) => {
            const checkLastQuestion = prevCount - 1;
            localStorage.setItem("count", checkLastQuestion);
            if (checkLastQuestion === 0) {
              const updatedTime = new Date().toISOString(); // Update the last question time
              setLastQuestionTime(updatedTime);
            }
            return checkLastQuestion;
          });
        }
      }
    }

    if (count < 0) {
      alert("You Have Reached Your Daily Limit");
      navigate("/");
    }
  };

  const initialValues = {
    quetionTitle: "",
    quetionBody: "",
    quetionTags: [],
    userPosted: user?.stackUser?.name,
  };
  const { values, handleSubmit, handleChange } = useFormik({
    initialValues,
    onSubmit: async (values, Action) => {
      try {
        if (!user) {
          alert("Failed To Found User Details");
        }

        const tagsArray = values.quetionTags.split(" ");

        const response = await dispatch(
          askQuestion({ ...values, quetionTags: tagsArray }, navigate)
        );

        if (response.status === 200) {
          alert(`Question Posted Successfully`);
          navigate("/");
        }
      } catch (error) {
        console.log(error);
        setCount((prevCount) => prevCount - 1);
        alert("Failed To Post Question Successfully");
      }
    },
  });

  return (
    <>
      <div
        className="ask_public_questions_page"
        style={{ backgroundColor: isNight ? "#060A13" : "" }}
      >
        <div className="ask_public_question">
          <h1>Ask a public Question [{plan}]</h1>
          <div
            className="ask_question_form"
            style={{ backgroundColor: isNight ? "#060A13" : "" }}
          >
            <form className="question_form" onSubmit={handleSubmit}>
              <label htmlFor="title"></label>
              <h4>Title</h4>
              <p>
                Be specific and imagine you’re asking a question to another
                person
              </p>
              <input
                type="text"
                name="quetionTitle"
                onChange={handleChange}
                value={values.quetionTitle}
                id="title"
                placeholder="e.g. Is there an R function for finding the index of an element in a vector?"
                className="title_field"
              />

              <label htmlFor="body"></label>
              <h4>Body</h4>
              <p>
                Include all the information someone would need to answer your
                question
              </p>
              <textarea
                type="text"
                name="quetionBody"
                onChange={handleChange}
                value={values.quetionBody}
                id="body"
                className="body_field"
              ></textarea>

              <label htmlFor="tags"></label>
              <h4>Tags</h4>
              <p>Add up to 5 tags to describe what your question is about</p>
              <input
                type="text"
                name="quetionTags"
                onChange={handleChange}
                value={values.quetionTags}
                id="tags"
                placeholder="e.g. (xml typescript wordpress)"
                className="tags_field"
              />

              <div className="review_question">
                <button
                  type="submit"
                  className="review_question_btn"
                  onClick={handleUserPlan}
                  disabled={count < 0}
                >
                  {count < 0 ? "Question Limit Reached" : "Review Question"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default AskQuestions;
