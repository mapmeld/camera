const mongoose = require('mongoose');

const faceSchema = mongoose.Schema({
  url: String,
  time: Date
});

module.exports = mongoose.model('Face', faceSchema);
