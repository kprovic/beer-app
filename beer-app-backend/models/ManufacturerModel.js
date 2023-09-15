const mongoose = require("mongoose");

const manufacturerSchema = mongoose.Schema({
  name: { type: String, unique: true },
  description: { type: String },
  year: { type: Number },
  country: { type: String },
  webPage: { type: String },
  imageLink: { type: String },
});

module.exports = mongoose.model("Manufacturers", manufacturerSchema);
