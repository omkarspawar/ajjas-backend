const express = require("express");
const { getStats } = require("../controllers/statsController");

const router = express.Router();


router.post("/statistics", getStats);

module.exports = router;
