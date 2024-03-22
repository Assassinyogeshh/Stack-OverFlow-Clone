import mongoose from "mongoose";

const storeStackNotify= new mongoose.Schema({
    notification:[
        {
            newUserPost:{
                userPostedBy:String,
                 questionTitle:String,
            },
    
        }
    ],
});

const userNotification= mongoose.model("StackNotifications", storeStackNotify);

export default userNotification;