const express = require("express");

const app = express();

const dotenv = require("dotenv");
const mongoose = require("mongoose");
const { MongoServerClosedError } = require("mongodb");

const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const postRoute = require("./routes/posts");
dotenv.config();
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URL)
  .then(console.log("conected to mongo db"))
  .catch((er) => console.log(er));

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);

app.listen("5000", () => console.log("Server is running..."));
