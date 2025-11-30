const express = require("express");
const { applyVisa } = require("../controllers/visa.controller.js");

const router = express.Router();

router.post("/", applyVisa);

module.exports = router;
