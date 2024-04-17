import { useEffect, useRef, useState } from 'react';
import './App.css';
import Navbar from './Components/Navbar/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Pages/Auth/Login';
import Register from './Pages/Auth/Register';
import HomeMainBar from './Components/HomeMainBar/HomeMainBar';
import AskQuestions from './Pages/AskQuestions/AskQuestions';
import Tags from './Pages/Tags/Tags';
import User from './Pages/Users/User';
import UserProfile from './Pages/UserProfile/UserProfile';
import AllQuestionDetails from './Pages/GiveAnswers/AllQuestionDetails';
import QuestioBar from './Components/LeftSideBar/QuestionBar';
import UserPlan from './Pages/Subscription/UserPlan';
import OrderComplete from './Pages/Subscription/OrderComplete';
import UserHistory from './Pages/History/UserHistory'
import UserNotifications from './Pages/Notifications/UserNotifications';
import UserLocation from './Pages/UserLcation/UserLocation';
import PublicSpacePage from './Pages/Public Place/PublicSpacePage ';
import ForgetPassword from './Pages/Auth/ForgetPassword';
// import ShowSharedImage from './Pages/Public Place/ShowSharedImage';
function App() {

  const [slideIn, setSlideIn] = useState(true)
  useEffect(() => {
    if (window.innerWidth <= 414) {
      setSlideIn(false);
    }
  }, []);

  const handleSlideIn = () => {
    if (window.innerWidth <= 414) {
      setSlideIn((state) => !state);
    }

  };

  const [isNight, setIsNight] = useState(false);

  useEffect(() => {
    const currentTime = new Date().getHours();
    setIsNight(currentTime < 6 || currentTime >= 18);
  }, []);



  return (
    <>
      <div className={isNight ? 'makeDarkBG' : ''} style={{ width: "100%" }}>

        <BrowserRouter>

          <Navbar  handleSlideIn={handleSlideIn} isNight={isNight}/>
          <Routes>
            <Route path='/' element={<HomeMainBar slideIn={slideIn} isNight={isNight} handleSlideIn={handleSlideIn} />} />
            <Route path='/user/login' element={<Login isNight={isNight} />} />
            <Route path='/user/register' element={<Register isNight={isNight} />} />
            <Route path='/forgetPassword' element={<ForgetPassword isNight={isNight} />} />
            <Route path='/userNotification' element={<UserNotifications isNight={isNight} />} />
            <Route path='/userLocation' element={<UserLocation slideIn={slideIn} handleSlideIn={handleSlideIn} />} />
            <Route path='/publicPage/:id' element={<PublicSpacePage slideIn={slideIn} handleSlideIn={handleSlideIn} isNight={isNight} />} />
            <Route path='/Questions/Ask' element={<AskQuestions isNight={isNight} />} />
            <Route path='/UserPlan/:id' element={<UserPlan isNight={isNight} slideIn={slideIn} handleSlideIn={handleSlideIn} />} />
            <Route path='/UserHistory/:id' element={<UserHistory isNight={isNight} slideIn={slideIn} handleSlideIn={handleSlideIn} />} />
            <Route path='/paymentsuccess/:id' element={<OrderComplete isNight={isNight} />} />
            <Route path='/Questions/fetchAllQuestions' element={<QuestioBar isNight={isNight} slideIn={slideIn} handleSlideIn={handleSlideIn} />} />
            <Route path='/Questions/:id' element={<AllQuestionDetails isNight={isNight} slideIn={slideIn} handleSlideIn={handleSlideIn} />} />
            <Route path='/Tags' element={<Tags isNight={isNight} slideIn={slideIn} handleSlideIn={handleSlideIn} />} />
            <Route path='/user/getAllUsers' element={<User isNight={isNight} slideIn={slideIn} handleSlideIn={handleSlideIn} />} />
            <Route path='/user/updateProfile/:id' element={<UserProfile isNight={isNight} slideIn={slideIn} handleSlideIn={handleSlideIn} />} />
            {/* <Route path="/shareImage/:id" element={<ShowSharedImage />} /> */}
          </Routes>

        </BrowserRouter>

      </div>
    </>
  );
}

export default App;