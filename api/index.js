//import = require
const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const User = require("./models/User");
const cors = require("cors");
require("dotenv").config();

//Root function
const app = express();
app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: process.env.CLIENT_URL
  })
);

//jwt(json wen token) used for secure transaction of data between two parties
mongoose.connect(process.env.MONGO_URL);
const jwtSecret = process.env.JWT_SECRET;

const connection = mongoose.connection;

connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

//API- get
app.get("/test", (req, res) => {
  res.json(`Test is working and jwtSecert is ${jwtSecret}`);
});

//POST api to register User via login credential using npm package "JWT"
app.post("/register", async (req, res) => {
  const { username, password } = req.body;

  try {
    const createdUser = await User.create({ username, password });

    jwt.sign({ UserId: createdUser._id }, jwtSecret, {}, (err, token) => {
      if (err) throw err;
      res.cookie("token", token).status(201).json("ok");
    });
  } catch (err) {
    if (err) throw err;
    res.status(500).json("error");
  }
});

const port = process.env.PORT || 4000;
app.listen(4000, () => {
  console.log(`Server is running on port ${port} ...`);
});
