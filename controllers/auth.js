import User from "../models/User.js";

const signup = async (req, res, next) => {
    try {

        const {name, email, password, role} = req.body;

        const isEmailExist = await User.findOne({email});
        if(isEmailExist){
            res.code = 400;
            throw new Error("Email already exist.");
        }

        const newUser = new User({name, email, password, role});
        await newUser.save();

        res.status(200).json({code: 201, status: true, message: "User registered successfully ... !"});

    } catch (e) {
        next(e);
    }

};

export {signup};