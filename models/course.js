const mongoose = require('mongoose');
const category = require('./category');

const courseSchema = mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  image: { type: String, required: true },
  userId: { type: String, required: true },
  state: { type: Boolean, default: false },
});

module.exports = mongoose.model('Course', courseSchema);