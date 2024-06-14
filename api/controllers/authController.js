const User = require("../models/User");
const bcrypt = require("bcrypt");
const CatchAsync = require("../utils/CatchAsync");
const AppError = require("../utils/AppError");

const multer = require("multer");

const storage = multer.memoryStorage();

const upload = multer({ storage });

exports.uploadPhoto = upload.single("file");

exports.protect = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) return next(new AppError("You are not logged in!", 401));
  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, payload) => {
    if (err) {
      return next(
        new AppError("Your session has expired! Please log in again!", 403)
      );
    }
    req.id = payload.id;
    next();
  });
};

exports.regiter = CatchAsync(async (req, res, next) => {
  const { username, password, email } = req.body;
  const salt = await bcrypt.genSalt(10);
  const newPassword = await bcrypt.hash(password, salt);
  const userDoc = await User.create({
    username,
    email,
    password: newPassword,
  });
  res.status(201).json(userDoc);
});

exports.login = CatchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  const userDoc = await User.findOne({ email });
  if (!userDoc) {
    return next(new AppError("Invalid Username or password", 404));
  }
  if (userDoc?.password) {
    const isPasswordCorrect = await bcrypt.compare(password, userDoc.password);
    if (!isPasswordCorrect) {
      return next(new AppError("Invalid Username or Password!", 400));
    }
    const age = 1000 * 60 * 60 * 24 * 7;
    const { password, ...others } = userDoc._doc;
    const token = jwt.sign(
      {
        id: userDoc._id,
      },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: age,
      }
    );
    res
      .cookie("token", token, {
        httpOnly: true,
        maxAge: age,
      })
      .status(200)
      .json(others);
  }
});

exports.logout = CatchAsync(async (req, res, next) => {
  res
    .clearCookie("token")
    .status(200)
    .json("You have been logged out successfully!");
});
