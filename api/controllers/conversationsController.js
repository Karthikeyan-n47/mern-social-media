const Conversation = require("../models/Conversation");
const CatchAsync = require("../utils/CatchAsync");
// const AppError= require('../utils/AppError');

exports.createConversation = CatchAsync(async (req, res, next) => {
  const newConversation = await Conversation.create({
    members: [req.body.senderId, req.body.receiverId],
  });
  res.status(201).json(newConversation);
});

exports.getAllConversation = CatchAsync(async (req, res, next) => {
  const conversations = await Conversation.find({
    members: { $in: [req.params.userId] },
  });
  res.status(200).json(conversations);
});

exports.getConversationTwoUsers = CatchAsync(async (req, res, next) => {
  const conversation = await Conversation.findOne({
    members: { $all: [req.params.firstUserId, req.params.secondUserId] },
  });
  res.status(200).json(conversation);
});
