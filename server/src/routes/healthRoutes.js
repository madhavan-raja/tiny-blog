const express = require("express");

const router = express.Router();

// Check health
router.get("/", async (req, res) => {
  try {
    res.status(200).json({ message: "OK" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
