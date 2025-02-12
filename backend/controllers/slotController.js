const Slot = require("../models/slot");

const slotController = {
  getAvailableSlots: async (req, res) => {
    try {
      const slots = await Slot.getAllAvailable();
      res.json(slots);
    } catch (err) {
      res
        .status(500)
        .json({ message: "Error fetching time slots", error: err });
    }
  },

  createSlot: async (req, res) => {
    const { slot_time } = req.body;
    try {
      const result = await Slot.create(slot_time);
      res
        .status(201)
        .json({ message: "Time slot created successfully", result });
    } catch (err) {
      res.status(500).json({ message: "Error creating time slot", error: err });
    }
  },
};

module.exports = slotController;
