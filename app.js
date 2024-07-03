import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import databaseConnection from "./connection/database_connection.js"
import {router} from "./routes/auth.js";

dotenv.config();

//init app
const app = express();

// connect database
databaseConnection();

// third party middleware
app.use(express.json({limit : "500mb"}));
app.use(bodyParser.urlencoded({ limit : "500mb" , extended : true}));


//route section
app.use("/api/v1/auth",router);

export default app;