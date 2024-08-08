const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = mongoose.Schema({
  given_name: { type: String, required: true },
  family_name: { type: String, required: true },
  nickname: { type: String, required: false },
  name: { type: String, required: true },
  picture: { type: String, required: false },
  email: { type: String, required: true, unique: true },
  email_verified: { type: Boolean, required: true },
  role: { type: String, required: true },
  isVerified: { type: Boolean, required: true, default: false },
  subscribedTo: { type: [String], required: true, default: [] },
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", userSchema);
