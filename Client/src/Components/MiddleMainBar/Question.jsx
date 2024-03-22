import React from 'react'
import moment from 'moment'
import { Link } from 'react-router-dom'
function Question({ question }) {
    return (
        <>
            <div className="question_details_box">
                <div className="no_of_votes_on_question">
                    <p> {question.upVote.length - question.downVote.length} </p>
                    <p>Vote</p>
                </div>

                <div className="no_of_answers">
                    <p>{question.noOfAnswer}</p>
                    <p>Answers</p>
                </div>

                <div className="question_titles">
                    <Link to={``} className='question_title_name' >

                        {question.quetionTitle.length > (window.innerWidth <= 400 ? 70 : 90) ?

                            question.questionTitle.substring(0, window.innerWidth <= 400 ? 70 : 90) + "..." : question.questionTitle}

                    </Link>

                </div>


                <div className="question_tags">
                    {question.quetionTags.map((tags) => (
                        <p>key={tags}</p>
                    ))}
                </div>
                <div className="display_question_time">
                    <p> asked {moment(question.askedOn).fromNow()}  {question.userPosted} </p>
                </div>
            </div>
        </>
    )
}

export default Question
