const express = require("express");
const router = express.Router();
const notificationController = require("../controllers/notificationController");

router.get("/notifications/:userId", notificationController.getNotifications);
router.post("/notifications", notificationController.createNotification);

module.exports = router;
