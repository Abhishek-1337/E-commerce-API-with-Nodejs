const mongoose = require("mongoose");

const categorySchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Missing value name"],
    unique: true,
  },
  description: {
    type: String,
    required: [true, "Discription is missing"],
  },
  color: {
    type: String,
    enum: ["blue", "black", "grey"],
  },
});

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;
