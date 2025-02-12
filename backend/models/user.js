const db = require("../config/db");

const User = {
  create: (name, email, password, role) => {
    return new Promise((resolve, reject) => {
      const query =
        "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)";
      db.query(query, [name, email, password, role], (err, result) => {
        if (err) reject(err);
        resolve(result);
      });
    });
  },

  getById: (userId) => {
    return new Promise((resolve, reject) => {
      const query = "SELECT * FROM users WHERE id = ?";
      db.query(query, [userId], (err, result) => {
        if (err) reject(err);
        resolve(result);
      });
    });
  },
};

module.exports = User;
