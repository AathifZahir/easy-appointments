const db = require("../config/db");

const userController = {
  createUser: async (req, res) => {
    const { name, email, password, role } = req.body;
    const query =
      "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)";
    db.query(query, [name, email, password, role], (err, result) => {
      if (err) {
        return res
          .status(500)
          .json({ message: "Error creating user", error: err });
      }
      res.status(201).json({ message: "User created successfully", result });
    });
  },

  getUserById: async (req, res) => {
    const { userId } = req.params;
    const query = "SELECT * FROM users WHERE id = ?";
    db.query(query, [userId], (err, results) => {
      if (err) {
        return res
          .status(500)
          .json({ message: "Error fetching user", error: err });
      }
      res.json(results[0]);
    });
  },
};

module.exports = userController;
