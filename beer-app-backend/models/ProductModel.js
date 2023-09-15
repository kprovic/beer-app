const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, unique: true },
  price: { type: Number },
  manufacturer: { type: String },
  alcoholPercentage: { type: Number },
  type: { type: String },
  imageLink: { type: String },
});

module.exports = mongoose.model("Products", productSchema);
