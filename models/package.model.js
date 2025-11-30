const mongoose = require("mongoose");

const packageSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  images: [String],
  availableSlots: { type: Number, default: 0 },
  category: { type: String },
}, { timestamps: true });

module.exports = mongoose.model("Package", packageSchema);
