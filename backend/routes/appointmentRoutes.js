const express = require("express");
const router = express.Router();
const appointmentController = require("../controllers/appointmentController");
const { authenticateToken, authorizeAdmin } = require("../middleware/auth");

router.get(
  "/",
  authenticateToken,
  authorizeAdmin,
  appointmentController.getAllAppointments
);
router.post("/book", authenticateToken, appointmentController.bookAppointment);
router.get(
  "/user/:user_contact",
  authenticateToken,
  appointmentController.getUserAppointments
);
router.delete(
  "/cancel/:appointment_id",
  authenticateToken,
  appointmentController.cancelAppointment
);

module.exports = router;
