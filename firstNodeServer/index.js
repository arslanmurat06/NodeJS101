const express = require("express");
const playerRouter = require("./routers/playerRouter");

var server = express();
server.use(express.json());

server.get("/", (req, res) => {
  res.status(200).send("Welcome to the  homepage");
});

server.use("/players", playerRouter);

server.listen("5000", () => {
  console.log(`rest service is being listened`);
});
