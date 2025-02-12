const express = require("express");
const router = express.Router();
const appointmentController = require("../controllers/appointmentController");

router.get("/appointments", appointmentController.getAllAppointments);
router.post("/appointments", appointmentController.bookAppointment);
router.get(
  "/appointments/:user_contact",
  appointmentController.getUserAppointments
);
router.delete(
  "/appointments/:appointment_id",
  appointmentController.cancelAppointment
);

module.exports = router;
