const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: String,
  password: { type: String, select: false },
  posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
});

module.exports = mongoose.model("User", userSchema);
