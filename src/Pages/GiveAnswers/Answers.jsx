import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import { deleteQuestion, fetchAllQuestions, postAnswer, voteQuestions } from '../../Action/UsersQuestion';
import { useFormik } from 'formik';
import moment from 'moment';
import AllAnswers from './AllAnswers';
import './Answers.css'
import copy from 'copy-to-clipboard';


function Answers() {

    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    // const url = "http://localhost:3001";
    const url = 'https://modern-rose-leotard.cyclic.app';
    const questionLists = useSelector((state) => state.QuestionReducer)

    const user = useSelector((state) => state.currentUserReducer)



    useEffect(() => {

        dispatch(fetchAllQuestions());
    }, [dispatch]);






    const matchingQuestion = questionLists?.data
        ? (Array.isArray(questionLists.data)
            ? questionLists.data.find((question) => question._id === id)
            : null)
        : (
            <div>
                <p>Loading...</p>
            </div>
        );


    const initialValues = {
        noOfAnswers: matchingQuestion ? matchingQuestion?.answer?.length + 1 : 0,
        answerBody: '',
        userAnswered: user?.stackUser?.name,
    }

     


    const { handleSubmit, handleChange, values } = useFormik({
        initialValues,
        onSubmit: async (values, Action) => {
            try {
                console.log('i have entered');
                 dispatch(postAnswer(id, values.noOfAnswers, values.answerBody, values.userAnswered))
                Action.resetForm()
            } catch (error) {
                console.log(error);
            }
        },
    })







    const handleDelete = () => {
        dispatch(deleteQuestion(id, navigate))

    }

    const handleUpVote = () => {
        if (user === null) {
            alert("Login or Signup to down vote a question");
            navigate('/user/login')
        } else {
            dispatch(voteQuestions(id, 'upVote'));
        }
    };

    const handleDownVote = () => {
        if (user === null) {
            alert("Login or Signup to down vote a question");
            navigate('/user/login')
        } else {
            dispatch(voteQuestions(id, 'downVote'));
        }
    };


    const handleShare = () => {
        copy(url + location.pathname);
        alert("Copied url : " + url + location.pathname);
    }

    const checkUser = () => {
        if (user === null) {
            alert("Login or Signup to down vote a question");
            navigate('/user/login')
        }
    }



    return (
        <>
            {Array.isArray(questionLists?.data) ? questionLists?.data?.filter((question) => question._id === id).map((question, index) => (
                <div className="give_questions_answer">

                    <h1>{question.quetionTitle}</h1>
                    <div className="user_question_details" key={index}>

                        <div className="question_title">

                            <div className="question_vote">
                                <div className="vote_question">
                                    <img src="/upVote.svg" alt="Like" onClick={handleUpVote} />
                                    <p>{question.upVote.length - question.downVote.length}</p>
                                    <img src="/downVote.svg" alt="dislike" onClick={handleDownVote} />
                                </div>


                                <div className="small_question_title">
                                    <p>{question.quetionBody}</p>
                                    <span>
                                        {question.quetionTags.map((tags, index) => (
                                            <p key={index}>#{tags}</p>
                                        ))}
                                    </span>


                                    <span className="share_question_btn">
                                        <button onClick={handleShare}>
                                            Share
                                        </button>
                                        {user?.stackUser._id === question.userId ? (<button onClick={handleDelete} className='delete_question_btn'>Delete</button>) : null}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="asked_question_date">
                            <p>asked {moment(question.askedOn).fromNow()}</p>
                            <span>
                                <Link className='user_posted_link' to={`/user/updateProfile/${question.userId}`}>
                                    {question.userPosted.charAt().toUpperCase()}
                                </Link>
                                <p className='blue_user_post'>{question.userPosted}</p>
                            </span>
                        </div>


                    </div>


                    <div className="asked_question_answers">

                        <section className='number_of_answers'>
                            {question.noOfAnswers !== 0 && (
                                <section>

                                    <AllAnswers question={question} user={user} />
                                </section>
                            )}
                        </section>

                        <form onSubmit={handleSubmit}>

                            <h3>Your Answer </h3>
                            <label htmlFor="users_answers"></label>

                            <textarea name="answerBody" value={values.answerBody} onChange={handleChange} id="users_answers" cols="30" rows="10" required ></textarea>

                            <button type='submit' onClick={checkUser} className="submit_answer"> Post Your Answer </button>

                        </form>

                    </div>

                    <div className="asked_your_own_question">
                        <p>Browse other Question tagged</p>
                        <span>
                            <Link className='bottom_tags' to={'/Tags'}>
                                {question.quetionTags.map((tags, index) => (
                                    <p key={index}>{tags}</p>
                                ))}
                            </Link>
                        </span>
                        <p>or</p>
                        <Link className='ask_your_own_question' to={'/Questions/Ask'}><p>ask your own question.</p></Link>
                    </div>

                </div>
            )) : (
                <div>
                    <p>Loading...</p>

                </div>)}
        </>
    )
}

export default Answers
