import express from "express";
import cors from 'cors';
import UserRouter from './Routes/Users.js'
import dotenv from 'dotenv'
import questionsRoutes from "./Routes/UsersQuetions.js";
import answers from './Routes/Answers.js'
import connectDb from './DB/ConnectDB.js'
import Razorpay from 'razorpay'
// import Migration from './Routes/Migration.js'
dotenv.config()

dotenv.config({path:'config.env'});
connectDb()

const app = express();

// const corsOptions = {
//     origin: "http://localhost:3001",
//     optionsSuccessStatus: 200
// }


// app.use(cors(corsOptions));
app.use(cors());

app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));

app.use(express.json());
app.use("/user", UserRouter)
app.use("/Questions", questionsRoutes);
app.use("/answers", answers)
app.use("/getKey", (req, res)=>{try {
    res.status(200).json({key:process.env.RAZORPAY_API_KEY})
} catch (error) {
    console.log(error);
    res.send("Failed to send key")
}})

export const instance = new Razorpay({
    key_id: process.env.RAZORPAY_API_KEY,
    key_secret:process.env.RAZORPAY_APT_SECRET,
  });



app.use('/', (req,res)=>{
    console.log('hi I am connected to server');
    res.send('finally i am connected to the browser')
   
})



const PORT= process.env.PORT||3000;


app.listen(PORT, '0.0.0.0', (error)=>{
    if(error){
        console.log(`Getting Error:${error}`);
    }
    console.log("i am live");
})




