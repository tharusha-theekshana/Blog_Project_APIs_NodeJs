import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import databaseConnection from "./connection/database_connection.js"
import {router} from "./routes/auth.js";
import morgan from "morgan";
import errorHandler from "./middlewares/index.js";
import notFound from "./controllers/not_found.js";

dotenv.config();

//init app
const app = express();

// connect database
databaseConnection();

// third party middleware
app.use(express.json({limit : "500mb"}));
app.use(bodyParser.urlencoded({ limit : "500mb" , extended : true}));
app.use(morgan("dev")); // use to console log api request routes

//route section
app.use("/api/v1/auth",router);

//not found route
app.use("*",notFound);

//error handler
app.use(errorHandler);

export default app;