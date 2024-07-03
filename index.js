import * as http from "http";
import app from "./app.js"

import {port} from './config/keys.js';

// create server
const server = http.createServer(app);

// listen server
server.listen(port, ()=> {
    console.log("Server is running on port " + port);
})