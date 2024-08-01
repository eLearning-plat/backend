const mongoose = require('mongoose');
const category = require('./category');

const courseSchema = mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  imageUrl: { type: String, required: false },
  userId: { type: String, required: false },
  state: { type: Boolean, default: false },
});

module.exports = mongoose.model('Course', courseSchema);