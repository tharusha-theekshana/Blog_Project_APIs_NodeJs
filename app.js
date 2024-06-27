import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import connectMongoDb from "./connection/database_connection.js";

dotenv.config();

//init app
const app = express();

// connect database
connectMongoDb();

// third party middleware
app.use(express.json({limit : "500mb"}));
app.use(bodyParser.urlencoded({ limit : "500mb" , extended : true}));


export default app;