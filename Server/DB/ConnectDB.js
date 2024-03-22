import mongoose from 'mongoose';
import dotenv from 'dotenv'
dotenv.config();

dotenv.config({path:'config.env'});
const uri=process.env.DATABASE_URL


const connectDB= async ()=>{
try{
   const MongoConnection= await mongoose.connect(uri,  {useNewUrlParser: true,useUnifiedTopology: true})
    console.log('I am Connected to the database');
        
}
catch(error){
console.log(`unable to connect to the database:${error}`);
}

}

export default connectDB;