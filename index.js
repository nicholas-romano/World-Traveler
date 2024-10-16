import jsonServer from "json-server";
//const jsonServer = require("json-server");
// importing json-server library
const server = jsonServer.create();
const router = jsonServer.router("data/cities.json");
const middlewares = jsonServer.defaults();
const port = process.env.PORT || 8000; //  chose port from here like 8080, 3001

server.use(middlewares);
server.use(router);

server.listen(port);
