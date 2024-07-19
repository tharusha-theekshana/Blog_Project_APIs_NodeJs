import mongoose from "mongoose";

const categorySchema = mongoose.Schema(
    {
        title: {type: String, required: true},
        desc: String,
        updatedBy : {type:mongoose.Types.ObjectId,ref : "user" , required: true}

    }, {timeStamps: true}
)

const Category = mongoose.model("category", categorySchema);

export default Category;