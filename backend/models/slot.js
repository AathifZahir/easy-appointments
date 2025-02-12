const db = require("../config/db");

const Slot = {
  getAllAvailable: () => {
    return new Promise((resolve, reject) => {
      const query = "SELECT * FROM time_slots WHERE is_booked = FALSE";
      db.query(query, (err, results) => {
        if (err) reject(err);
        resolve(results);
      });
    });
  },

  create: (slot_time) => {
    return new Promise((resolve, reject) => {
      const query = "INSERT INTO time_slots (slot_time) VALUES (?)";
      db.query(query, [slot_time], (err, result) => {
        if (err) reject(err);
        resolve(result);
      });
    });
  },

  updateBookingStatus: (slot_id, status) => {
    return new Promise((resolve, reject) => {
      const query = "UPDATE time_slots SET is_booked = ? WHERE id = ?";
      db.query(query, [status, slot_id], (err, result) => {
        if (err) reject(err);
        resolve(result);
      });
    });
  },
};

module.exports = Slot;
