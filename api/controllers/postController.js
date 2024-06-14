const { s3Uploadv2 } = require("../s3Service");
const Post = require("../models/Post");
const User = require("../models/User");
const CatchAsync = require("../utils/CatchAsync");
const AppError = require("../utils/AppError");

exports.createPost = CatchAsync(async (req, res, next) => {
  const { userId, desc } = req.body;
  let img = "";
  if (req.file) {
    const awsUpload = await s3Uploadv2(req.file);
    console.log(awsUpload);
    img = awsUpload.Location;
  }
  const newPost = await Post.create({ userId, desc, img });
  res.status(201).json(newPost);
});

exports.updatePost = CatchAsync(async (req, res, next) => {
  const post = await Post.findById(req.params.id);
  if (post.userId === req.body.id) {
    await post.updateOne({ $set: req.body });
    res.status(200).json("The post has been updated successfully!");
  } else {
    return next(new AppError("You can update only your post!", 403));
  }
});

exports.deletePost = CatchAsync(async (req, res, next) => {
  const post = await Post.findById(req.params.id);
  if (post.userId === req.body.id) {
    await post.deleteOne();
    res.status(200).json("The post has been deleted successfully!");
  } else {
    return next(new AppError("You can delete only your post!", 403));
  }
});

exports.likeAndUnlikePost = CatchAsync(async (req, res, next) => {
  const post = await Post.findById(req.params.id);
  if (!post) {
    return next(new AppError("Post not found", 404));
  }
  if (!post.likes.includes(req.body.userId)) {
    await post.updateOne({ $push: { likes: req.body.userId } });
    res.status(200).json("Liked the post successfully!");
  } else {
    await post.updateOne({ $pull: { likes: req.body.userId } });
    res.status(200).json("Unliked the post successfully!");
  }
});

exports.getOnePost = CatchAsync(async (req, res, next) => {
  const post = await Post.findById(req.params.id);
  res.status(200).json(post);
});

exports.getTimelinePosts = CatchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.userId);
  if (!user) {
    return next(new AppError("user not found", 404));
  }
  const userPosts = await Post.find({ userId: user._id });
  const friendPosts = await Promise.all(
    user.following.map((friendId) => {
      return Post.find({ userId: friendId });
    })
  );
  res.status(200).json(userPosts.concat(...friendPosts));
});

exports.getPostUsingUsername = CatchAsync(async (req, res, next) => {
  const user = await User.findOne({ username: req.params.username });
  if (!user) {
    return next(new AppError("user not found", 404));
  }
  const userPosts = await Post.find({ userId: user._id });
  res.status(200).json(userPosts);
});
