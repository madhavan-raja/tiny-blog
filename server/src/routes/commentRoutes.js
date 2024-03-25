const express = require("express");

const Post = require("../models/post");
const Comment = require("../models/comment");

const authenticateJWT = require("../middleware/authenticateJWT");
const verifyJWT = require("../middleware/verifyJWT");

const router = express.Router();

// Get All Comments
router.get("/", async (req, res) => {
  try {
    const comments = await Comment.find();

    res.status(200).json(comments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// Get Comment
router.get("/:commentId", async (req, res) => {
  try {
    const { commentId } = req.params;

    const comment = await Comment.findById(commentId);

    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    res.status(200).json(comment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// Create Comment
router.post("/:postId", authenticateJWT, async (req, res) => {
  try {
    const { content } = req.body;
    const { postId } = req.params;

    const userId = verifyJWT(req.headers.authorization.split(" ")[1]);

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    if (!content) {
      return res.status(400).json({ message: "Content is required" });
    }

    const newComment = new Comment({
      post: postId,
      author: userId,
      content,
    });

    post.comments.push(newComment._id);

    await newComment.save();
    await post.save();

    res.status(201).json(newComment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// Delete Comment
router.delete("/:commentId", authenticateJWT, async (req, res) => {
  try {
    const { commentId } = req.params;

    const userId = verifyJWT(req.headers.authorization.split(" ")[1]);

    const comment = await Comment.findById(commentId);

    if (comment.author.toString() !== userId) {
      return res.status(403).json({ message: "Forbidden" });
    }

    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    const post = await Post.findById(comment.post);

    post.comments = post.comments.filter(
      (comment) => comment.toString() !== commentId
    );

    await Comment.deleteOne({ _id: commentId });
    await post.save();

    res.status(204).end();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
