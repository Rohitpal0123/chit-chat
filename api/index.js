const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const User = require("./models/User");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(
  cors({
    credentials: true,
    origin: process.env.CLIENT_URL
  })
);
const port = process.env.PORT || 4000;

//jwt(json wen token) used for secure transaction of data between two parties
mongoose.connect(process.env.MONGO_URL);
const jwtSecret = process.env.JWT_SECRET;

app.get("/test", (req, res) => {
  res.json("Test is working");
});

//POST api to register User via login credential using npm package "JWT"
app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  const createdUser = await User.create({ username, password });

  jwt.sign({ UserId: createdUser._id }, jwtSecret, (err, token) => {
    if (err) throw err;
    res.cookie("token", token).status(201).json("ok");
  });
});

app.listen(4000, () => {
  console.log(`Server is running on port ${port} ...`);
});
