const router = require("express").Router();
const multer = require("multer");
const { s3Uploadv2 } = require("../s3Service");
const Post = require("../models/Post");
const User = require("../models/User");

const storage = multer.memoryStorage();

const upload = multer({ storage });
// create a post
router.post("/", upload.single("file"), async (req, res) => {
  const { userId, desc } = req.body;
  let img = "";
  if (req.file) {
    const awsUpload = await s3Uploadv2(req.file);
    console.log(awsUpload);
    img = awsUpload.Location;
  }
  try {
    const newPost = await Post.create({ userId, desc, img });
    res.status(201).json(newPost);
  } catch (err) {
    res.status(500).json(err);
  }
});
// update a post
router.put("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.userId === req.body.id) {
      await post.updateOne({ $set: req.body });
      res.status(200).json("The post has been updated successfully!");
    } else {
      res.status(403).json("You can update only your post!");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});
// delete a post
router.delete("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.userId === req.body.id) {
      await post.deleteOne();
      res.status(200).json("The post has been deleted successfully!");
    } else {
      res.status(403).json("You can delete only your post!");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});
// like and unlike a post
router.put("/:id/like", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post.likes.includes(req.body.userId)) {
      await post.updateOne({ $push: { likes: req.body.userId } });
      res.status(200).json("Liked the post successfully!");
    } else {
      await post.updateOne({ $pull: { likes: req.body.userId } });
      res.status(200).json("Unliked the post successfully!");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});
// get a post
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
});
// get timeline posts
router.get("/timeline/:userId", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    const userPosts = await Post.find({ userId: user._id });
    const friendPosts = await Promise.all(
      user.following.map((friendId) => {
        return Post.find({ userId: friendId });
      })
    );
    res.status(200).json(userPosts.concat(...friendPosts));
  } catch (err) {
    res.status(500).json(err);
  }
});

// get all posts using username

router.get("/profile/:username", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username });
    const userPosts = await Post.find({ userId: user._id });
    res.status(200).json(userPosts);
  } catch (err) {
    res.status(500).json(err);
  }
});
module.exports = router;
