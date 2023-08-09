//import = require
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const User = require("./models/User");
const cors = require("cors");
require("dotenv").config();

//Root function
const app = express();
app.use(express.json());
app.use(cookieParser());
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

app.get("/profile", (req, res) => {
  const token = req.cookies?.token;
  if (token) {
    jwt.verify(token, jwtSecret, {}, (err, userData) => {
      if (err) throw err;
      res.json(userData);
    });
  } else {
    res.status(401).json("no token");
  }
});

//POST api to register User via login credential using npm package "JWT"
app.post("/register", async (req, res) => {
  const { username, password } = req.body;

  try {
    const checkUsername = await User.findOne({ username: username });
    console.log("checkusername::", checkUsername);
    if (checkUsername) throw "user already exists";

    const createdUser = await User.create({ username, password });
    console.log("user has been created");

    jwt.sign(
      { UserId: createdUser._id, username },
      jwtSecret,
      {},
      (err, token) => {
        if (err) throw err;
        res
          .cookie("token", token, { sameSite: "none", secure: true })
          .status(201)
          .json({
            id: createdUser._id
          });
      }
    );
  } catch (err) {
    console.log(err);
    if (err) throw err;
    res.status(404).send("error");
  }
});

const port = process.env.PORT || 4000;
app.listen(4000, () => {
  console.log(`Server is running on port ${port} ...`);
});
