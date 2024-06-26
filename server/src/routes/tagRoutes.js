const express = require("express");

const Tag = require("../models/tag");

const authenticateJWT = require("../middleware/authenticateJWT");
const verifyJWT = require("../middleware/verifyJWT");

const router = express.Router();

// Get All Tags
router.get("/", async (req, res) => {
  try {
    const tags = await Tag.find();

    res.status(200).json(tags);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// Get Tag
router.get("/:tagId", async (req, res) => {
  try {
    const { tagId } = req.params;

    const tag = await Tag.findById(tagId).populate({
      path: "posts",
      select: "_id title author tags content comments",
      populate: [
        { path: "author", select: "_id username" },
        { path: "tags", select: "_id name" },
      ],
    });

    if (!tag) {
      return res.status(404).json({ message: "Tag not found" });
    }

    res.status(200).json(tag);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// Create Tag
router.post("/", authenticateJWT, async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Name is required" });
    }

    const userId = verifyJWT(req.headers.authorization.split(" ")[1]);
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (await Tag.findOne({ name })) {
      return res.status(400).json({ message: "Tag already exists" });
    }

    const newTag = new Tag({ name });
    await newTag.save();

    res.status(201).json(newTag);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
