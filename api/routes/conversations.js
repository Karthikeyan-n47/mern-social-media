const router = require("express").Router();
const Conversation = require("../models/Conversation");

// create new conversation
router.post("/", async (req, res) => {
  //    const members=[req.body.senderId,req.body.receiverId];
  try {
    const newConversation = await Conversation.create({
      members: [req.body.senderId, req.body.receiverId],
    });
    res.status(201).json(newConversation);
  } catch (err) {
    res.status(500).json(err);
  }
});

// get conversation of a user
router.get("/:userId", async (req, res) => {
  try {
    const conversations = await Conversation.find({
      members: { $in: [req.params.userId] },
    });
    res.status(200).json(conversations);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
