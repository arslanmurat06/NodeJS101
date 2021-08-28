const express = require("express");
const playerRouter = require("./routers/playerRouter");
const errrorHandling = require("./middlewares/errorHandling");
const logger = require("./middlewares/logger");

var server = express();
server.use(express.json());

server.use(logger);

server.get("/", (req, res) => {
  res.status(200).send("Welcome to the  homepage");
});

server.use("/players", playerRouter);

server.use(errrorHandling);

server.listen("5000", () => {
  console.log(`rest service is being listened`);
});
