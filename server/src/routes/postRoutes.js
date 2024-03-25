const express = require("express");

const User = require("../models/user");
const Post = require("../models/post");

const authenticateJWT = require("../middleware/authenticateJWT");
const verifyJWT = require("../middleware/verifyJWT");

const router = express.Router();

router.post("/", authenticateJWT, async (req, res) => {
  try {
    const { title, content } = req.body;

    if (!title || !content) {
      return res
        .status(400)
        .json({ message: "Title and content are required" });
    }

    const userId = verifyJWT(req.headers.authorization.split(" ")[1]);

    const newPost = new Post({ title, content, author: userId });
    await newPost.save();

    const user = await User.findById(userId);
    user.posts.push(newPost);
    await user.save();

    res.status(201).json(newPost);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
