const router = require("express").Router();
const authController = require("../controllers/authController");
const postController = require("../controllers/postController");

// create a post
router.post("/", authController.uploadPhoto, postController.createPost);
// update a post
router.put("/:id", postController.updatePost);
// delete a post
router.delete("/:id", postController.deletePost);
// like and unlike a post
router.put("/:id/like", postController.likeAndUnlikePost);
// get a post
router.get("/:id", postController.getOnePost);
// get timeline posts
router.get("/timeline/:userId", postController.getTimelinePosts);

// get all posts using username

router.get("/profile/:username", postController.getPostUsingUsername);
module.exports = router;
