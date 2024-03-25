const express = require("express");
const jwt = require("jsonwebtoken");

const User = require("../models/user");
const Post = require("../models/post");
const authenticateJWT = require("../middleware/authenticateJWT");

const JWT_SECRET = process.env.JWT_SECRET;

const router = express.Router();

router.post("/", authenticateJWT, async (req, res) => {
  try {
    const { title, content } = req.body;

    if (!title || !content) {
      return res
        .status(400)
        .json({ message: "Title and content are required" });
    }

    const token = req.headers.authorization?.split(" ")[1];
    const decodedToken = jwt.verify(token, JWT_SECRET);
    const userId = decodedToken.userId;

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
