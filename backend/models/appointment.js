const db = require("../config/db");

// Appointment model
const Appointment = {
  getAllAppointments: () => {
    return new Promise((resolve, reject) => {
      const query = "SELECT * FROM appointments";
      db.query(query, (err, results) => {
        if (err) reject(err);
        resolve(results);
      });
    });
  },

  book: (slot_id, user_name, user_contact) => {
    return new Promise((resolve, reject) => {
      const query =
        "INSERT INTO appointments (slot_id, user_name, user_contact) VALUES (?, ?, ?)";
      db.query(query, [slot_id, user_name, user_contact], (err, result) => {
        if (err) reject(err);
        resolve(result);
      });
    });
  },

  getUserAppointments: (user_contact) => {
    return new Promise((resolve, reject) => {
      const query = "SELECT * FROM appointments WHERE user_contact = ?";
      db.query(query, [user_contact], (err, results) => {
        if (err) reject(err);
        resolve(results);
      });
    });
  },

  cancel: (appointment_id) => {
    return new Promise((resolve, reject) => {
      const query = "DELETE FROM appointments WHERE id = ?";
      db.query(query, [appointment_id], (err, result) => {
        if (err) reject(err);
        resolve(result);
      });
    });
  },
};

module.exports = Appointment;
