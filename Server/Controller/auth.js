import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import uaParser from "ua-parser-js"
import user from '../Model/UserSchema.js'

dotenv.config({ path: 'config.env' })

export const Register = async (req, res) => {

    const { name, email, password, cpassword } = req.body;
    try {

        if (!name || !email || !password || !cpassword) {
            return res.status(404).json({ message1: 'Please fill the required data' })
        }

        const Finduser = await user.findOne({ email });


        if (Finduser) {
            console.log('Response data sent:', { message1: 'User already exists' });
            return res.status(409).json({ message1: 'User already Exist' })
        }

        if (password !== cpassword) {
            return res.status(400).json({ message2: 'password didnt match with confirm password ' })
        }

        const hashedPassword = await bcrypt.hash(password, 12)
        const stackUser = await user.create({ name, email, password: hashedPassword, cpassword: hashedPassword })

        const token = jwt.sign({ email: stackUser.email, id: stackUser._id }, process.env.SECRET_KEY, { expiresIn: "2h" })
        res.cookie('token', token, { httpOnly: true });

        res.status(200).json({ result: 'register successful', stackUser, token });

        // res.status(200).json({ result: "successfully Logged in" });
    }
    catch (error) {
        res.status(500).json("Internal Error...");
    }

}

export const Login = async (req, res) => {
    try {
        const { email, password, name, G_email } = req.body;
        const { ip, headers } = req;
        const { 'user-agent': userAgent } = headers;

        // For GOOGLE LOGIN USER
        if (G_email && name) {
            const existingGoogleUser = await user.findOne({ email: G_email });
            console.log("Google exist data:", existingGoogleUser);
            if (existingGoogleUser) {
                const token = jwt.sign({ email: existingGoogleUser.email, id: existingGoogleUser._id }, process.env.SECRET_KEY, { expiresIn: "2h" });
                return res.status(200).json({ result: "successfully Logged in", stackUser: existingGoogleUser, token });
            } else {
                const newGoogleUser = new user({ name, email: G_email });
                const savedGoogleUser = await newGoogleUser.save();
                console.log("Google New data:", savedGoogleUser);
                const token = jwt.sign({ email: savedGoogleUser.email, id: savedGoogleUser._id }, process.env.SECRET_KEY, { expiresIn: "2h" });
                return res.status(200).json({ result: "successfully Logged in", stackUser: savedGoogleUser, token });
            }
        }



        const stackUser = await user.findOne({ email });

        if (!stackUser) {
            return res.status(404).json({ message: "Invalid email or password" });
        }

        const checkPassword = await bcrypt.compare(password, stackUser.password);

        if (!checkPassword) {
            return res.status(404).json({ message: "Invalid email or password" });
        }

        // Creating Token
        const token = jwt.sign({ email: stackUser.email, id: stackUser._id }, process.env.SECRET_KEY, { expiresIn: "2h" });
        res.cookie('token', token, { httpOnly: true });

        // Parsing User Agent
        const uaInfo = uaParser(userAgent);
        const parsedBrowser = uaInfo.browser.name;
        const parsedOS = uaInfo.os.name;
        const parsedDeviceType = uaInfo.device.type || 'Desktop';

        // Adding to User Login History
        if (stackUser && checkPassword) {
            stackUser.userLoginHistory.push({
                ipAddress: ip,
                browser: parsedBrowser,
                os: parsedOS,
                deviceType: parsedDeviceType
            });
            await stackUser.save(); // Save the updated user document
        }
        res.status(200).json({ result: "successfully Logged in", stackUser, token });
    } catch (error) {
        console.error(error);
        res.status(500).json("Something went wrong internally.");
    }
};

export const forgetPassword = async (req, res) => {
    try {
        const { email, newPassword, newConfirmPassword } = req.body;

        console.log(req.body);
        const checkUser = await user.findOne({ email });

        if (!checkUser) {
            return res.status(404).json({ message: "Failed To Update Password" });
        }

        if (newPassword !== newConfirmPassword) {
            return res.status(400).json({ message: 'Passwords do not match ' })
        }

        const changeHashPassword = await bcrypt.hash(newPassword, 12);

        checkUser.password = changeHashPassword;
        checkUser.cpassword = changeHashPassword;

        await checkUser.save();

        res.status(200).json("User Password Successfully Updated");

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something Went Wrong" })
    }
}