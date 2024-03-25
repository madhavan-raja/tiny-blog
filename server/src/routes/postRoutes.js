const express = require("express");

const User = require("../models/user");
const Post = require("../models/post");
const Comment = require("../models/comment");
const Tag = require("../models/tag");

const authenticateJWT = require("../middleware/authenticateJWT");
const verifyJWT = require("../middleware/verifyJWT");

const router = express.Router();

// Get all posts
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find();

    res.status(200).json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// Get one post
router.get("/:postId", async (req, res) => {
  try {
    const { postId } = req.params;

    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.status(200).json(post);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// Create post
router.post("/", authenticateJWT, async (req, res) => {
  try {
    const { title, content, tags } = req.body;

    if (!title || !content) {
      return res
        .status(400)
        .json({ message: "Title and content are required" });
    }

    const userId = verifyJWT(req.headers.authorization.split(" ")[1]);

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const user = await User.findById(userId);

    let tagIds = [];
    for (tagName of tags) {
      const tag = await Tag.findOne({ name: tagName });

      if (!tag) {
        return res.status(404).json({ message: "Tag not found" });
      }

      tagIds.push(tag._id);
    }

    const newPost = new Post({
      title,
      content,
      author: user._id,
      tags: tagIds,
    });

    user.posts.push(newPost._id);

    for (tagName of tags) {
      const tag = await Tag.findOne({ name: tagName });

      if (!tag) {
        return res.status(404).json({ message: "Tag not found" });
      }

      tag.posts.push(newPost._id);
      await tag.save();
    }

    await user.save();
    await newPost.save();

    res.status(201).json(newPost);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// Delete one post
router.delete("/:postId", authenticateJWT, async (req, res) => {
  try {
    const { postId } = req.params;

    const userId = verifyJWT(req.headers.authorization.split(" ")[1]);

    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    if (post.author.toString() !== userId) {
      return res.status(403).json({ message: "Forbidden" });
    }

    const user = await User.findById(userId);
    user.posts = user.posts.filter((p) => p.toString() !== postId);

    for (tag of post.tags) {
      tag = await Tag.findById(tag);
      tag.posts = tag.posts.filter((p) => p.toString() !== postId);
      await tag.save();
    }

    await user.save();
    await Comment.deleteMany({ post: postId });
    await Post.deleteOne({ _id: postId });

    res.status(204).end();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
