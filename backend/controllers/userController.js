const db = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userController = {
  register: async (req, res) => {
    const { name, email, password, role } = req.body;
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const query =
        "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)";

      db.query(query, [name, email, hashedPassword, role], (err, result) => {
        if (err) {
          return res
            .status(500)
            .json({ message: "Error registering user", error: err });
        }
        res.status(201).json({ message: "User registered successfully" });
      });
    } catch (err) {
      res.status(500).json({ message: "Server error", error: err });
    }
  },

  login: (req, res) => {
    const { email, password } = req.body;
    const query = "SELECT * FROM users WHERE email = ?";

    db.query(query, [email], async (err, results) => {
      if (err)
        return res.status(500).json({ message: "Database error", error: err });

      if (results.length === 0)
        return res.status(401).json({ message: "Invalid credentials" });

      const user = results[0];
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch)
        return res.status(401).json({ message: "Invalid credentials" });

      const token = jwt.sign(
        { id: user.id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );

      res.json({ message: "Login successful", token });
    });
  },

  getUserProfile: (req, res) => {
    const userId = req.user.id;
    const query = "SELECT id, name, email, role FROM users WHERE id = ?";

    db.query(query, [userId], (err, results) => {
      if (err)
        return res.status(500).json({ message: "Database error", error: err });

      res.json(results[0]);
    });
  },
};

module.exports = userController;
