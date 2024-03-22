import React from 'react'
import './HomeMainBar.css'
import LeftSideBar from '../LeftSideBar/LeftSideBar'
import RightSideBar from '../RightSideBar/RightSideBar'
import MiddleMainBar from '../MiddleMainBar/MiddleMainBar'



function HomeMainBar({ slideIn, handleSlideIn, isNight }) {

  return (
    <>
      <div className="main_home_bar">

        <div className="LEFT_SIDE_BAR">
          <LeftSideBar slideIn={slideIn} handleSlideIn={handleSlideIn} isNight={isNight} />
        </div>

        <div className="MIDDLE_SIDE_BAR">
          <MiddleMainBar  isNight={isNight} />
        </div>

        <div className="RIGHT_SIDE_BAR">
          <RightSideBar  isNight={isNight} />
        </div>

      </div>
    </>
  )
}

export default HomeMainBar
