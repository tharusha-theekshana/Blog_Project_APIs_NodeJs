import User from "../models/User.js";
import hashPassword from "../utils/hashPassword.js";


const signup = async (req, res, next) => {
    try {

        const {name, email, password, role} = req.body;

        const isEmailExist = await User.findOne({email});
        if(isEmailExist){
            res.code = 400;
            throw new Error("Email already exist.");
        }

        const hashedPassword = await hashPassword(password);
        console.log("SSSS" + hashedPassword);

        const newUser = new User({name, email, password : hashedPassword , role});
        console.log("asdsadas" + newUser );
        await newUser.save();

        res.status(200).json({code: 201, status: true, message: "User registered successfully ... !"});

    } catch (e) {
        next(e);
    }

};

export {signup};