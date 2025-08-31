const express = require("express");
const { calculateTax } = require("../controllers/taxController");

const router = express.Router();

// POST /api/tax/calculate
router.post("/calculate", calculateTax);

module.exports = router;
