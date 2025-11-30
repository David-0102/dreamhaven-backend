const express = require("express");
const { createPackage, getPackages } = require("../controllers/package.controller.js");

const router = express.Router();

router.post("/", createPackage);
router.get("/", getPackages);

module.exports = router;
