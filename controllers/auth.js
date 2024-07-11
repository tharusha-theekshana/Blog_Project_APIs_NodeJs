import User from "../models/User.js";
import hashPassword from "../utils/hashPassword.js";
import comparePassword from "../utils/comparePassword.js";


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

        res.status(200).json({message : "Successfully sign in."})

    }catch (e) {
        next(e);
    }

}

export {signup,signin};