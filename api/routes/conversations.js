const router = require("express").Router();
const conversationsController = require("../controllers/conversationsController");

// create new conversation
router.post("/", conversationsController.createConversation);

// get conversation of a user
router.get("/:userId", conversationsController.getAllConversation);

// get conversation between two users
router.get(
  "/find/:firstUserId/:secondUserId",
  conversationsController.getConversationTwoUsers
);

module.exports = router;
