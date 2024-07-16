import User from "../models/User.js";
import hashPassword from "../utils/hashPassword.js";
import comparePassword from "../utils/comparePassword.js";
import generateToken from "../utils/generateToken.js";
import generateCode from "../utils/generateCode.js";
import sendEmail from "../utils/sendEmail.js";

const signup = async (req, res, next) => {
    try {

        const {name, email, password, role} = req.body;
        const isEmailExist = await User.findOne({email});

        if(isEmailExist){
            res.code = 400;
            throw new Error("Email already exist.");
        }

        const hashedPassword = await hashPassword(password);
        const newUser = new User({name, email, password : hashedPassword , role});
        await newUser.save();

        res.status(200).json({code: 201, status: true, message: "User registered successfully ... !"});

    } catch (e) {
        next(e);
    }
};

const signin = async (req,res,next) => {

    try {

        const { email, password } = req.body;
        const user = await User.findOne({email});

        if(!user){
            res.code = 401;
            throw new Error("Invalid credentials ... !");
        }

        const match = await comparePassword(password,user.password);
        if (!match){
            res.code = 401;
            throw new Error("Invalid credentials .. !");
        }

        const token = generateToken(user);

        res.status(200).json({code : 200 , status : true ,message : "Successfully sign in.", data : {token}});

    }catch (e) {
        next(e);
    }
}

const verifyCode = async (req,res,next) => {
    try{

        const {email} = req.body;

        const user = await User.findOne({email});

        if (!user){
            res.code = 404;
            throw new Error("User not found.")
        }

        if (user.isVerified){
            res.code = 400;
            throw new Error("User already verified.")
        }

        const code = generateCode(6);

        user.verificationCode = code;
        await user.save();

        await sendEmail({
            emailTo: user.email,
            subject : "Email verification code",
            code,
            content: "Verify user account"
        })

        res.status(200).json({code : 200,status : true , message: "User verification code send successfully."})

    }catch (e) {
        next(e);
    }
}

const verifyUser = async (req,res,next) => {
    try{

        const {email,code} = req.body;

        const user = await User.findOne({email});

        if (!user){
            res.code = 404;
            throw new Error("User not found.")
        }

        if (user.verificationCode !== code){
            res.code = 400;
            throw new Error("Invalid code.")
        }

        user.isVerified =true;
        user.verificationCode = null;
        await user.save();

        res.status(200).json({code : 200,status : true , message: "User verified successfully."})

    }catch (e) {
        next(e);
    }
}

const forgotPasswordCode = async (req,res,next) => {
    try{
        const {email} = req.body;

        const user = await User.findOne({email});

        if (!user){
            res.code = 404;
            throw new Error("User not found.")
        }

        const code = generateCode(6);
        user.forgotPasswordCode = code;

        user.save();

        await sendEmail({
            emailTo : user.email,
            subject : "Forgot Password Code",
            code,
            content: "Change your password"
        });

        res.status(200).json({code : 200,status : true , message: "Forgot password code sent successfully."})
    }catch (e){
        next(e);
    }
}


const recoverPassword = async (req,res,next) => {
    try{
        const {email,code,password} = req.body;

        const user = await User.findOne({email});

        if (!user){
            res.code = 404;
            throw new Error("User not found.")
        }

        if (user.forgotPasswordCode !== code){
            res.code = 400;
            throw new Error("Invalid code.")
        }

        user.password = await hashPassword(password);
        user.forgotPasswordCode = null;

        await user.save();

        res.status(200).json({code : 200,status : true , message: "Password changed successfully."})
    }catch (e){
        next(e);
    }
}

const changePassword = async (req, res, next) => {
    try {
        const {oldPassword, newPassword} = req.body;
        const {_id} = req.user;

        const user = await User.findById(_id);

        if (!user){
            res.code = 404;
            throw new Error("User not found.")
        }

        const match = await comparePassword(oldPassword,user.password);

        if (!match){
            res.code = 400;
            throw new Error("Old password doesn't match.")
        }

        if (oldPassword === newPassword){
            res.code = 400;
            throw new Error("You are providing old password");
        }

        user.password = await hashPassword(newPassword);
        await user.save();

        res.status(200).json({code : 200,status : true , message: "Password changed successfully."})
    } catch (e) {
        next(e);
    }
}

export {signup,signin,verifyCode,verifyUser,forgotPasswordCode,recoverPassword,changePassword};