const express = require("express");
const router = express.Router();
const { getMatches } = require("../controllers/matchController");

// Route that calls the controller function
router.get("/:userId", getMatches);

module.exports = router;
