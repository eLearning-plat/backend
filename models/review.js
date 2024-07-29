const mongoose = require("mongoose");

const reviewSchema = mongoose.Schema({
  userId: { type: String, required: true },
  courseId: { type: String, required: true },
  content: { type: String, required: true },
  verified: { type: Boolean, default: false },
});

module.exports = mongoose.model("Review", reviewSchema);
