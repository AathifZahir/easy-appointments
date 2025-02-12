const express = require("express");
const router = express.Router();
const appointmentController = require("../controllers/appointmentController");
const authenticateToken = require("../middleware/auth");

router.get(
  "/appointments",
  authenticateToken,
  appointmentController.getAllAppointments
);
router.post(
  "/appointments",
  authenticateToken,
  appointmentController.bookAppointment
);
router.get(
  "/appointments/:user_contact",
  authenticateToken,
  appointmentController.getUserAppointments
);
router.delete(
  "/appointments/:appointment_id",
  authenticateToken,
  appointmentController.cancelAppointment
);

module.exports = router;
