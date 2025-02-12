const Appointment = require("../models/appointment");
const Slot = require("../models/slot");

const appointmentController = {
  getAllAppointments: async (req, res) => {
    try {
      const userId = req.user.id; // Assuming JWT authentication adds the user to the request
      const appointments = await Appointment.getAllAppointments(userId);
      if (appointments.length === 0) {
        return res.status(404).json({ message: "No appointments found" });
      }
      res.status(200).json(appointments);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  },

  bookAppointment: async (req, res) => {
    const { slot_id, user_name, user_contact } = req.body;
    try {
      const availableSlot = await Slot.updateBookingStatus(slot_id, true);
      if (!availableSlot.affectedRows) {
        return res.status(400).json({ message: "Time slot is already booked" });
      }

      const result = await Appointment.book(slot_id, user_name, user_contact);
      res
        .status(201)
        .json({ message: "Appointment booked successfully", result });
    } catch (err) {
      res
        .status(500)
        .json({ message: "Error booking appointment", error: err });
    }
  },

  getUserAppointments: async (req, res) => {
    const { user_contact } = req.params;
    try {
      const appointments = await Appointment.getUserAppointments(user_contact);
      res.json(appointments);
    } catch (err) {
      res
        .status(500)
        .json({ message: "Error fetching appointments", error: err });
    }
  },

  cancelAppointment: async (req, res) => {
    const { appointment_id } = req.params;
    try {
      const result = await Appointment.cancel(appointment_id);
      if (!result.affectedRows) {
        return res.status(400).json({ message: "Appointment not found" });
      }

      res.json({ message: "Appointment canceled successfully" });
    } catch (err) {
      res
        .status(500)
        .json({ message: "Error canceling appointment", error: err });
    }
  },
};

module.exports = appointmentController;
