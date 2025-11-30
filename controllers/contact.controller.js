const Contact = require("../models/contact.model.js");

exports.sendMessage = async (req, res) => {
  try {
    const msg = await Contact.create(req.body);
    res.status(201).json(msg);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
