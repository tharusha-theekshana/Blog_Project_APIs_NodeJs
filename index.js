import http from "https";
import app from "./app.js"

import config from './config/keys.js';

const {port} = config;

// create server
const server = http.createServer(app);

// listen server
server.listen(port, ()=> {
    console.log("Server is running on port " + port);
})