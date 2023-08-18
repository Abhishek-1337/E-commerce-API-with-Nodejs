const mongoose = require("mongoose");

const categorySchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Missing value name"],
    unique: true,
  },
});

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;
