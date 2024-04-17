import React from 'react'
import './QuestionBar.css'
import LeftSideBar from '../LeftSideBar/LeftSideBar'
import RightSideBar from '../RightSideBar/RightSideBar'
import AllQuestions from './AllQuestions'




function QuestioBar({ slideIn, handleSlideIn }) {


    return (
        <>
            <div className="main_home_bar">

                <div className="LEFT_SIDE_BAR">
                    <LeftSideBar slideIn={slideIn} handleSlideIn={handleSlideIn} />
                </div>

                <div className="MIDDLE_SIDE_BAR" >
                    <AllQuestions />
                </div>

                <div className="RIGHT_SIDE_BAR">
                    <RightSideBar />
                </div>

            </div>
        </>
    )
}

export default QuestioBar
