const mongoose = require("mongoose");

const tagSchema = new mongoose.Schema({
  name: String,
});

module.export = mongoose.model("Tag", tagSchema);
