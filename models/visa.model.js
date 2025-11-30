const mongoose = require("mongoose");




const visaSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  passportNumber: { type: String, required: true },
  nationality: { type: String, required: true },
  packageId: { type: mongoose.Schema.Types.ObjectId, ref: "Package" },
  status: { type: String, enum: ["pending", "approved", "rejected"], default: "pending" },
  supportingDocs: [String],
}, { timestamps: true });

module.exports = mongoose.model("VisaApplication", visaSchema);
