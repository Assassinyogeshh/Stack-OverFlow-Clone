import mongoose from "mongoose";
import user from "../Model/UserSchema.js";

 
  export const getAllUser=async (req, res)=>{


    try {
        
        const allUser= await user.find()

             const allUserDetails= allUser.map((user)=>({
                _id:user._id,
                        name:user.name,
                        about:user.about,
                        tags:user.tags,
                        joinedOn:user.joinedOn,
                        imageData:user.imageData,
             }))

             

             res.status(200).json(allUserDetails)
            
    } catch (error) {
         res.status(500).json({message:error.message})
    }

}

export const updateProfile= async (req,res)=>{

try {

    const {id:_id}=req.params;
console.log("I am id",_id);
    const {name, tags, about, imageData}= req.body

    if(!mongoose.Types.ObjectId.isValid(_id)){
        console.log("till here stuck here");

        return  res.status(404).send("User not found")
    }

    console.log("till here 2");

 const updatedProfile= await user.findByIdAndUpdate(_id,{
        // in json if key or value are same you can directly this way
        $set:{name: name, about: about, tags: tags, imageData}},
        {new:true}
    )
    console.log("also  here")
    if (!updatedProfile) {
        // console.log("I am here",updateProfile);
        return res.status(404).send("User not found"); // Use status code 404 for not found
    }

    res.status(200).json(updatedProfile)

} catch (error) {
    
 res.status(500).json({message:error.message})


}
     

}


