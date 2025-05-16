const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
  room: String,
  author: String,
  message: String,
  time: String,
}, { timestamps: true });

const MessageModel = mongoose.model('Message', MessageSchema);

module.exports = MessageModel;
