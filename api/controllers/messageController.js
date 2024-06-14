const Message = require("../models/Message");
const CatchAsync = require("../utils/CatchAsync");
const AppError = require("../utils/AppError");

exports.createMessage = CatchAsync(async (req, res, next) => {
  const message = await Message.create(req.body);
  res.status(201).json(message);
});

exports.getAllMessages = CatchAsync(async (req, res, next) => {
  const messages = await Message.find({
    conversationId: req.params.conversationId,
  });
  res.status(200).json(messages);
});
