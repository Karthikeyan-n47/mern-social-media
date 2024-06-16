const bcrypt = require("bcrypt");
const User = require("../models/User");
const CatchAsync = require("../utils/CatchAsync");
const AppError = require("../utils/AppError");

exports.getUser = CatchAsync(async (req, res, next) => {
  const userId = req.query.userId;
  const username = req.query.username;
  //   console.log(userId, username);
  if (req.body.id === req.params.id || req.body.isAdmin) {
    const user = userId
      ? await User.findById(userId)
      : await User.findOne({ username });
    const { password, updatedAt, createdAt, ...other } = user?._doc;
    res.status(200).json(other);
  } else {
    return next(new AppError("Please enter the correct details", 403));
  }
});

exports.getFriends = CatchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.userId);
  // console.log(user);
  if (!user) {
    return next(new AppError("User not found", 404));
  }
  const friends = await Promise.all(
    user.following.map((friendId) => {
      return User.findById(friendId);
    })
  );
  let friendList = [];
  friends?.map((friend) => {
    const { _id, username, profilePicture } = friend;
    friendList.push({ _id, username, profilePicture });
  });
  res.status(200).json(friendList);
});

exports.deleteUser = CatchAsync(async (req, res, next) => {
  if (req.body.id === req.params.id || req.body.isAdmin) {
    const user = await User.findByIdAndDelete(req.params.id);
    res.status(200).json("Account deleted successfully!");
  } else {
    return next(new AppError("You can delete only your account", 403));
  }
});

exports.updateUser = CatchAsync(async (req, res, next) => {
  if (req.body.id === req.params.id || req.body.isAdmin) {
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(req.body.password, salt);
    }
    const user = await User.findByIdAndUpdate(req.params.id, {
      $set: req.body,
    });
    res.status(200).json("Account updated successfully!");
  } else {
    return next(new AppError("You can delete only your account", 403));
  }
});

exports.followUser = CatchAsync(async (req, res, next) => {
  if (req.body.id !== req.params.id) {
    const user = await User.findById(req.params.id);
    if (!user) {
      return next(new AppError("User not found", 404));
    }
    const currentUser = await User.findById(req.body.id);
    if (!user.followers.includes(req.body.id)) {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        { $push: { followers: req.body.id } },
        { new: true }
      );
      const updatedCurrentUser = await User.findByIdAndUpdate(
        req.body.id,
        { $push: { following: req.params.id } },
        { new: true }
      );
      // console.log(updatedCurrentUser);
      res.status(200).json({
        user: updatedUser,
        currentUser: updatedCurrentUser,
      });
    } else {
      return next(new AppError("You are already following this User", 403));
    }
  } else {
    return next(new AppError("You cannot follow yourself!", 403));
  }
});

exports.unfollowUser = CatchAsync(async (req, res, next) => {
  if (req.body.id !== req.params.id) {
    const user = await User.findById(req.params.id);
    if (!user) {
      return next(new AppError("User not found", 404));
    }
    const currentUser = await User.findById(req.body.id);
    if (user.followers.includes(req.body.id)) {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        { $pull: { followers: req.body.id } },
        { new: true }
      );
      const updatedCurrentUser = await User.findByIdAndUpdate(
        req.body.id,
        { $pull: { following: req.params.id } },
        {
          new: true,
        }
      );
      // console.log(updatedCurrentUser);
      res.status(200).json({
        user: updatedUser,
        currentUser: updatedCurrentUser,
      });
    } else {
      return next(new AppError("You are not following this User", 403));
    }
  } else {
    return next(new AppError("You cannot unfollow yourself!", 403));
  }
});
