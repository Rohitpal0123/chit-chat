const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const User = require("./models/User");

mongoose.connect(process.env.MONGO_URL);

const app = express();

app.get("/test", (req, res) => {
  res.json("Test is working");
});

app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  await User.create({ username, password });
});

const port = process.env.PORT || 4000;
app.listen(4000, () => {
  console.log(`Server is running on port ${port} ...`);
});
