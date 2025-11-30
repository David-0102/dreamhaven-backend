const VisaApplication = require("../models/visa.model.js");

exports.applyVisa = async (req, res) => {
  try {
    const visa = await VisaApplication.create(req.body);
    res.status(201).json(visa);
  } catch (error) {
    console.error("Visa application failed:", error);
    res.status(500).json({ message: error.message, detail: "Failed to apply for visa" });
  }
};
