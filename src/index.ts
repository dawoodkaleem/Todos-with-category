import { Server } from "node:http";

import http from "http";
// import app from expre
import app from "./app";

const port: string | number = process.env.PORT || 3000;

const server: Server = http.createServer(app);

server.listen(port);

console.log("Server is running at port", port);
