const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

// Register new user
router.post("/register", async (req, res) => {
  const { username, password, email } = req.body;
  const salt = await bcrypt.genSalt(10);
  try {
    const newPassword = await bcrypt.hash(password, salt);
    const userDoc = await User.create({
      username,
      email,
      password: newPassword,
    });
    res.status(201).json(userDoc);
  } catch (err) {
    res.status(500).json(err);
  }
});

// login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  // console.log(req.body);
  try {
    const userDoc = await User.findOne({ email });
    if (!userDoc) {
      res.status(404).json("User not found");
      // console.log(userDoc);
    }
    if (userDoc?.password) {
      const isPasswordCorrect = await bcrypt.compare(
        password,
        userDoc.password
      );
      if (isPasswordCorrect) {
        res.status(200).json(userDoc);
      } else {
        res.status(400).json("Invalid Username or Password!");
      }
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
