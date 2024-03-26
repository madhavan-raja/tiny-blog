const express = require("express");

const User = require("../models/user");

const router = express.Router();

// Get All Users
router.get("/", async (req, res) => {
  try {
    const users = await User.find();

    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// Get User
router.get("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId).populate({
      path: "posts",
      select: "_id title",
    });
    if (!user) {
      return res.status(400).json({ message: "Invalid user" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
