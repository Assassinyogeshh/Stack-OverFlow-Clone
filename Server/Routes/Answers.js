import  express  from "express";
import { postAnswer, deleteAnswer } from "../Controller/Answer.js";
import auth from "../Middleware/auth.js";


const router=express.Router();

router.patch('/post/:id', auth, postAnswer);

router.patch('/delete/:id', auth, deleteAnswer);

export default router;