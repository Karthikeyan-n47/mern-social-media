const router = require("express").Router();
const messageController = require("../controllers/messageController");

// create messages
router.post("/", messageController.createMessage);

// get messages
router.get("/:conversationId", messageController.getAllMessages);

module.exports = router;
