import React from 'react'
import moment from 'moment'
import { Link, useParams } from 'react-router-dom'
import './AllAnswers.css'
import { useLocation } from 'react-router-dom'
import copy from 'copy-to-clipboard'
import { useDispatch } from 'react-redux'
import { deleteAnswer } from '../../Action/UsersQuestion'
function AllAnswers({ question, user }) {

  const { id } = useParams();

  const location = useLocation
  // const url = "http://localhost:3001";
  const url = 'https://modern-rose-leotard.cyclic.app';

  const dispatch = useDispatch()

  const handleShare = () => {
    copy(url + location.pathname)
    alert("Copied url : " + url + location.pathname);
  }

  const handleDelete = (answerId, noOfAnswers) => {
    dispatch(deleteAnswer(id, answerId, noOfAnswers - 1))
  }
  return (
    <>
      <div className="number_of_annwers">
        {question?.answer ? (

          question.answer.map((ans, index) => (
            <div className="display_all_answers" key={ans._id}>
              <span className="given_answer_by_another_user">
                {ans.answerBody ? (<pre className='ans_width'>
                  <code className="different_user_ans">
                    {ans.answerBody}
                  </code>
                </pre>) : (<p>No Answer</p>)}
              </span>
              <div className='bottom_ans_row'>
                <span className='ans_share_delete_row_btn'>
                  <button className='share_answer_btn' onClick={handleShare}>Share</button>
                  {ans.userId === user?.stackUser._id ? (<button className='answer_delete_btn' onClick={() => handleDelete(ans._id, question.noOfAnswers)} >Delete</button>) : null}
                </span>


                <div className="given_answer_date_by_user">
                  <p>asked {moment(question.answeredOn).fromNow()}</p>
                  <span>

                    <Link className='user_ans_posted_link' to={`/user/updateProfile/${ans.userId}`}>
                      {ans.userAnswered?.charAt().toUpperCase()}
                    </Link>
                    <p className='blue_user_post'>{ans.userAnswered}</p>
                  </span>


                </div>
              </div>
            </div>

          ))

        ) : null}
      </div>
    </>
  )
}

export default AllAnswers

