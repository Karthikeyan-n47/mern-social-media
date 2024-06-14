const router = require("express").Router();
const userController = require("../controllers/userController");

// get a user
router.get("/", userController.getUser);

// get friends
router.get("/friends/:userId", userController.getFriends);

// delete a user
router.delete("/:id", userController.deleteUser);
// update a user
router.put("/:id", userController.updateUser);
// follow a user
router.put("/:id/follow", userController.followUser);
// unfollow a user
router.put("/:id/unfollow", userController.unfollowUser);

module.exports = router;
