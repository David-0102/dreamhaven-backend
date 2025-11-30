const express = require("express");
const { sendMessage } = require("../controllers/contact.controller.js");

const router = express.Router();

router.post("/", sendMessage);

module.exports = router;
