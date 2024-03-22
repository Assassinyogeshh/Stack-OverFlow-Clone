import React, { useEffect } from 'react';
import '../MiddleMainBar/MiddleMainBar.css'
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAllQuestions } from '../../Action/UsersQuestion';
import moment from 'moment';

function AllQuestions() {
  const dispatch = useDispatch();

  useEffect(() => {

    dispatch(fetchAllQuestions());
  }, [dispatch]);

  const questionsList = useSelector((state) => state.QuestionReducer);
  return (
    <div className="top_Questions">
      <div className="ask_Questions">
        <h1>All Questions</h1>
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
                <div className="question_details_box" key={index}>
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

export default AllQuestions;
