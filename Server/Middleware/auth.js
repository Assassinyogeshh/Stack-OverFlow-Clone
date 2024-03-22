import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'


dotenv.config({ path: 'config.env' })

const auth= (req, res, next)=>{

try {

    if (!req.headers.authorization) {
      
        return res.status(401).json({ message: 'Authorization header is missing' });
      }
    //  here we reciving token and here we use split and '1' here because the in token the elements are stored in array and the second element contain the actual token  
    const token=req.headers.authorization.split(" ")[1];
    
    // here we are verfyinf that token 
    const decodeToken= jwt.verify(token, process.env.SECRET_KEY, { algorithms: ['HS256'] });


    const currentTimestamp = Math.floor(Date.now() / 1000); // Current timestamp in seconds
    if (decodeToken.exp && decodeToken.exp < currentTimestamp) {
      return res.status(401).json({ message: 'Token has expired' });
    }

    //   to be safe we use ?= optional Chaning to safely accessing the id 
    req.userId= decodeToken?.id;

    next();

} catch (error) {
    console.log(error);
    return res.status(401).json({message:"Unotharized"})
}

}

export default auth;


