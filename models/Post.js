import mongoose from "mongoose";

const postSchema = mongoose.Schema({
    title: {type: String, required: true},
    desc: String,
    file:{type: mongoose.Types.ObjectId,ref : "file"},
    category: {type: mongoose.Types.ObjectId, ref: "category" , required: true},
    updatedBy : {type : mongoose.Types.ObjectId , ref: "user"}
},{timestamps: true});

const Post = mongoose.model("post",postSchema);

export default Post;