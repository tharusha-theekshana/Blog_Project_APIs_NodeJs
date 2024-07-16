import * as http from "http";
import app from "./app.js"

const port = process.env.PORT;

// create server
const server = http.createServer(app);

// listen server
server.listen(port, ()=> {
    console.log("Server is running on port " + port);
})