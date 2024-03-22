import express from "express"
import { askedQuetions, getAllQuetions, deleteQuetion, voteQuestions, showStackNotifications } from "../Controller/Quetions.js";
import auth from "../Middleware/auth.js";
import { checkOut, checkingUserAskedQuestion, getUserPlan, getUserQuestionTime, paymentVerify, subscriptionDetails } from "../Controller/Payment.js";

const router=express.Router();

// here we use auth middleware to first confirmin if its really the user here 

router.post('/Ask', auth, askedQuetions);

router.get('/fetchAllQuestions', getAllQuetions);

router.delete('/delete/:id', auth, deleteQuetion);

router.patch('/vote/:id', auth, voteQuestions);

router.post ('/checkOut', auth, checkOut);

router.post ('/verifyPayment', paymentVerify);

router.post ('/subscriptionData', subscriptionDetails);

router.get ('/userPlan', auth,  getUserPlan);

router.post ('/updateQuestionTime', auth,  checkingUserAskedQuestion);

router.get ('/gettingTime', auth,  getUserQuestionTime);

router.get('/stackNotification', showStackNotifications);

export default router;
