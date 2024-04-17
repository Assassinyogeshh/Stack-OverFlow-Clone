import React, { useEffect, useState } from 'react';
import './MiddleMainBar.css';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAllQuestions } from '../../Action/UsersQuestion';
import moment from 'moment';
import TranslatePages from '../GoogleTranslate/TranslatePages';
// import Reload from '../Reload';
function MiddleMainBar({isNight}) {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.currentUserReducer);
  const questionsList = useSelector((state) => state.QuestionReducer);

  useEffect(() => {
    const manipulateTranslateElement = () => {
      const topQuestionsElement = document.querySelector('.top_Questions');
      if (topQuestionsElement) {
        console.log(topQuestionsElement);
        const translateElement = document.querySelector('#google_translate_element');
        console.log(translateElement);
        if (translateElement) {
          translateElement.style.display = 'block';
        }
      }
    };
  
    manipulateTranslateElement();
  }, []);
  
  useEffect(() => {
    dispatch(fetchAllQuestions());
  }, [dispatch, questionsList]);

const refresh=()=>{
  window.location.reload()
}

  return (
    <div className="top_Questions"  style={{ backgroundColor: isNight ? '#060A13' : '' , color: isNight ? 'white' : '' }}>
      <div className="ask_Questions">
        <h1>Top Questions</h1>
       <span className='translateBlock' >
      <button className='refreshPage'  style={{ color: isNight ? 'white': 'black'}} onClick={refresh}> Click Me To Select Language</button>
      <TranslatePages />
       </span>
        <Link to="/Questions/Ask">
          <button className="askQ_Btn">Ask Questions</button>
        </Link>
      </div>

      <div className="show_all_questions">
        {questionsList.data === null ? (
          <h1>Loading...</h1>
        ) : (
          <>
            <div className="number_of_questions">
              <p>{questionsList.data.length} questions</p>

            </div>

            {Array.isArray(questionsList.data) ? (
              questionsList.data.map((questions, index) => (
                <div className="question_details_box"
                style={{ backgroundColor: isNight ? '#060A13' : '#fdf7e2' , color: isNight ? 'white' : '' }} key={index}>
                  <div className="no_of_votes_on_question">
                    <p>{questions.upVote.length - questions.downVote.length}</p>
                    <p>Vote</p>
                  </div>

                  <div className="no_of_answers">
                    {questions.noOfAnswers ? <p>{questions.noOfAnswers}</p> : <p>0</p>}
                    <p>Answers</p>
                  </div>

                  <div className="question_titles">
                    <Link className='remove_link_style' to={`/Questions/${questions._id}`}>
                      {questions.quetionTitle.length > (window.innerWidth <= 400 ? 70 : 90)
                        ? questions.quetionTitle.substring(0, window.innerWidth <= 400 ? 70 : 90) + "..."
                        : questions.quetionTitle}
                    </Link>


                    <div className="question_tags">
                      <div className="all_tags">
                        {questions.quetionTags.map((tags, index) => (
                          <Link className='remove_link_style' to={'/Tags'} key={index}>
                            <p key={tags}>#{tags}</p>
                          </Link>
                        ))}
                      </div>


                      <div className="display_question_time">
                        <p>asked {moment(questions.askedOn).fromNow()} {questions.userPosted}</p>
                      </div>
                    </div>
                  </div>

                </div>
              ))
            ) : (
              <p>No questions found.</p>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default MiddleMainBar;
