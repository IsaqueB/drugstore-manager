import * as dotenv from "dotenv";
dotenv.config(); 

import express = require("express");
import routes from "./routes"

const server = express();

server.use(routes)

server.listen(3000)