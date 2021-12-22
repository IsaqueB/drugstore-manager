import * as dotenv from "dotenv";
dotenv.config(); 

import express = require("express");
import routes from "./routes"

const server = express();

server.use(express.json())
server.use(routes);

console.log("Listening to 3000")

server.listen(3000)