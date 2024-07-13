import mongoose from "mongoose";

const userSchema = mongoose.Schema(
    {
        name : {type : String, required : true},
        email : {type : String, required : true , unique: true , trim : true},
        password : {type : String, required : true , minLength : 6},

        // 1 -> super admin
        // 2 -> normal admin
        // 3 -> normal user
        role : { type : Number , default : 3},
        verificationCode : String,
        isVerified: {type : Boolean, default: false}

    },{ timeStamps : true}
)

const User = mongoose.model("user",userSchema);

export default User;