const express = require("express");
const router = express.Router();
const slotController = require("../controllers/slotController");

router.get("/slots", slotController.getAvailableSlots);
router.post("/slots", slotController.createSlot);

module.exports = router;
