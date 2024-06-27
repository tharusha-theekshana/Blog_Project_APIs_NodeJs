import mongoose from "mongoose";

const databaseConnection = async () => {
    try{
        await mongoose.connect(process.env.CONNECTION_URL);
        console.log("Database connection successful ... !")
    }catch (e) {
        console.log(e.message);
        process.exit(1);
    }
}

export default databaseConnection;