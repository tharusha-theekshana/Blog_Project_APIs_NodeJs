import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";

dotenv.config();

//init app
const app = express();

// third party middleware
app.use(express.json({limit : "500mb"}));
app.use(bodyParser.urlencoded({ limit : "500mb" , extended : true}));


export default app;