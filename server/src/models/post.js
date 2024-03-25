const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  title: String,
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  content: String,
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
  tags: [{ type: mongoose.Schema.Types.ObjectId, ref: "Tag" }],
});

module.export = mongoose.model("Post", postSchema);
