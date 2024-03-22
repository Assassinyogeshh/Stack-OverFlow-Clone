import React from 'react'
import Answers from './Answers'
import LeftSideBar from '../../Components/LeftSideBar/LeftSideBar'
import RightSideBar from '../../Components/RightSideBar/RightSideBar'



function AllQuestionDetails({ slideIn, handleSlideIn }) {

  return (
    <>
      <div className="main_home_bar">

        <div className="LEFT_SIDE_BAR" >
          <LeftSideBar slideIn={slideIn} handleSlideIn={handleSlideIn} />
        </div>

        <div className="MIDDLE_SIDE_BAR" >
          <Answers />
        </div>

        <div className="RIGHT_SIDE_BAR">
          <RightSideBar />
        </div>

      </div>
    </>
  )
}

export default AllQuestionDetails
