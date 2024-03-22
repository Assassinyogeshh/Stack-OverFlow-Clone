import mongoose from "mongoose";


const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
    },
    password: {
        type: String
    },
    cpassword: {
        type: String
    },
    about: { type: String },
    tags: { type: [String] },
    joinedOn: { type: Date, default: Date.now },

    imageData: { type: String },

    userLoginHistory:[
        {
      ipAddress: String,
        browser: String,
         os: String,
        deviceType: String,
     timestamp: { type: Date, default: Date.now }
        }
    ],

});

const user = mongoose.model('stackUser', UserSchema);

export default user

