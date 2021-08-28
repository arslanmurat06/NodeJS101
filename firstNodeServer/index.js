//this is without express

// const http = require("http");
// const host = "127.0.0.1";
// const port = "3000";

// const server = http.createServer((req, res) => {
//   res.statusCode = 200;
//   res.setHeader("Content-Type", "text/plain");
//   res.end("Welcome to first server");
// });

// server.listen(port, host, () => {
//   console.log(`${host} is listening with  the port ${port}`);
// });

const express = require("express");
const data = require("./data");
var server = express();

server.get("/", (req, res) => {
  res.status(200).send("Welcome to the homepage");
});

server.get("/players", (req, res) => {
  res.status(200).json(data);
});

server.get("/players/:id", (req, res) => {
  const { id } = req.params;
  const player = data.find((player) => player.id === parseInt(id));

  if (player) {
    res.status(200).json(player);
  } else {
    res.status(404).send(`The player  with id ${id} could not be found`);
  }
});

server.listen("5000", () => {
  console.log(`rest service is being listened`);
});
