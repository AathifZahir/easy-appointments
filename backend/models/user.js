const db = require("../config/db");

const User = {
  getUserByEmail: (email) => {
    return new Promise((resolve, reject) => {
      const query = "SELECT * FROM users WHERE email = ?";
      db.query(query, [email], (err, results) => {
        if (err) reject(err);
        resolve(results[0]);
      });
    });
  },

  getUserById: (userId) => {
    return new Promise((resolve, reject) => {
      const query = "SELECT id, name, email, role FROM users WHERE id = ?";
      db.query(query, [userId], (err, results) => {
        if (err) reject(err);
        resolve(results[0]);
      });
    });
  },
};

module.exports = User;
